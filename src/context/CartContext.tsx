import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cake, CakeFlavour, CakeWeightOption } from '../types/cake';
import { CartItem, SelectedAddOn } from '../types/cart';
import { DeliveryMethod, OrderSummary } from '../types/order';
import { CAKES } from '../data/cakes';
import { calculateOrderSummary, recalculateCartItem } from '../lib/pricing';
import { loadFromStorage, saveToStorage } from '../lib/storage';

interface AddToCartPayload {
  cake: Cake;
  selectedWeight: CakeWeightOption;
  selectedFlavour: CakeFlavour;
  isEggless: boolean;
  cakeMessage?: string;
  selectedAddOns?: SelectedAddOn[];
  specialInstructions?: string;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (payload: AddToCartPayload) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  totalItemsCount: number;
  orderSummary: OrderSummary;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
}

const CART_STORAGE_KEY = 'cake_o_clock_cart_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Initialize cart from localStorage, validating against trusted CAKES catalogue
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = loadFromStorage<CartItem[]>(CART_STORAGE_KEY, []);
    if (!Array.isArray(saved) || saved.length === 0) return [];

    // Recalculate every item using trusted fresh cake data
    const validatedItems: CartItem[] = [];
    saved.forEach((savedItem) => {
      const liveCake = CAKES.find((c) => c.id === savedItem.cake?.id);
      if (liveCake) {
        validatedItems.push(recalculateCartItem(savedItem, liveCake));
      }
    });
    return validatedItems;
  });

  // Persist items whenever changed
  useEffect(() => {
    saveToStorage(CART_STORAGE_KEY, items);
  }, [items]);

  const addToCart = (payload: AddToCartPayload) => {
    const {
      cake,
      selectedWeight,
      selectedFlavour,
      isEggless,
      cakeMessage = '',
      selectedAddOns = [],
      specialInstructions = '',
      quantity = 1,
    } = payload;

    // Create unique deterministic ID based on cake ID and customizable options
    const addOnIds = selectedAddOns
      .map((a) => `${a.addOn.id}x${a.quantity}`)
      .sort()
      .join('-');
    const generatedId = `${cake.id}__${selectedWeight.weight}__${selectedFlavour}__${isEggless ? 'eggless' : 'regular'}__${cakeMessage.trim()}__${addOnIds}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === generatedId);
      if (existingIndex > -1) {
        // Item exists with exact same options, increment quantity
        const updated = [...prevItems];
        const currentItem = updated[existingIndex];
        const newQty = currentItem.quantity + quantity;
        updated[existingIndex] = recalculateCartItem(
          { ...currentItem, quantity: newQty },
          cake
        );
        return updated;
      } else {
        // Create new cart item and calculate with pricing utility
        const freshItem: CartItem = {
          id: generatedId,
          cake,
          selectedWeight,
          selectedFlavour,
          isEggless,
          cakeMessage: cakeMessage.trim(),
          selectedAddOns,
          specialInstructions: specialInstructions.trim(),
          quantity,
          calculatedUnitPrice: 0,
          calculatedAddOnsTotal: 0,
          totalPrice: 0,
        };
        const calculated = recalculateCartItem(freshItem, cake);
        return [...prevItems, calculated];
      }
    });

    // Open quick cart drawer to confirm addition
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return recalculateCartItem({ ...item, quantity: newQty }, item.cake);
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const orderSummary = calculateOrderSummary(items, deliveryMethod);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        totalItemsCount,
        orderSummary,
        deliveryMethod,
        setDeliveryMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
