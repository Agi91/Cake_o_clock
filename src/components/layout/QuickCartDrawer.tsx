import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/pricing';
import { BUSINESS_CONFIG } from '../../config/business';

export const QuickCartDrawer: React.FC = () => {
  const { 
    items, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    removeFromCart, 
    updateQuantity, 
    orderSummary 
  } = useCart();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cocoa-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-elevated flex flex-col justify-between z-10 animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-cocoa-100 flex items-center justify-between bg-cream-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-caramel" />
            <h2 className="font-serif text-lg font-bold text-cocoa">
              Your Celebration Cart
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cream-200 text-cocoa-600">
              {items.length} {items.length === 1 ? 'cake' : 'cakes'}
            </span>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 rounded-xl text-cocoa-400 hover:text-cocoa hover:bg-cream-200 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center text-cocoa">
                <ShoppingBag className="w-8 h-8 text-caramel" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa">
                Your cart is empty
              </h3>
              <p className="text-xs text-cocoa-400 max-w-xs">
                Explore our Cake Feed or build a custom cake to start celebrating!
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/explore');
                }}
                className="px-5 py-2.5 rounded-xl bg-cocoa text-cream-100 font-semibold text-xs shadow-soft hover:bg-cocoa-500 transition-all"
              >
                Explore Cakes Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-cream-50 border border-cocoa-100/70 flex gap-3 relative group"
              >
                {/* Cake Thumbnail */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                  <img
                    src={item.cake.images[0]}
                    alt={item.cake.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Cake Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-bold text-cocoa truncate">
                        {item.cake.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-cocoa-300 hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] text-cocoa-500 space-y-0.5 mt-0.5">
                      <div>
                        <span className="font-medium text-cocoa">{item.selectedWeight.weight}</span>
                        {' • '}{item.selectedFlavour}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={item.isEggless ? 'text-success-600 font-medium' : 'text-cocoa-400'}>
                          {item.isEggless ? '🌱 Eggless' : '🥚 Contains Egg'}
                        </span>
                      </div>
                      {item.cakeMessage && (
                        <div className="italic text-cocoa-600 bg-white/70 px-1.5 py-0.5 rounded text-[10px] inline-block truncate max-w-full">
                          "{item.cakeMessage}"
                        </div>
                      )}
                      {item.selectedAddOns.length > 0 && (
                        <div className="text-[10px] text-caramel-600 font-medium">
                          +{item.selectedAddOns.map(a => `${a.addOn.name} (x${a.quantity})`).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Line Total */}
                  <div className="pt-2 flex items-center justify-between mt-2 border-t border-cocoa-100/50">
                    <div className="flex items-center border border-cocoa-200 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-cocoa-600 hover:bg-cream-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold text-cocoa">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-cocoa-600 hover:bg-cream-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-cocoa">
                      {formatPrice(item.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Totals & CTAs */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-cocoa-100 bg-cream-50 space-y-3">
            <div className="space-y-1.5 text-xs text-cocoa-500">
              <div className="flex justify-between">
                <span>Estimated Subtotal</span>
                <span className="font-semibold text-cocoa text-sm">
                  {formatPrice(orderSummary.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-cocoa-400">
                <span>Delivery fees calculated at checkout</span>
                <span>{orderSummary.subtotal >= BUSINESS_CONFIG.orderingPolicies.freeDeliveryThreshold ? 'Eligible for Free Delivery' : 'Std Delivery'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="w-full py-2.5 rounded-xl border border-cocoa text-cocoa hover:bg-cream-200 font-semibold text-xs text-center transition-colors"
              >
                View Full Cart
              </button>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-2.5 rounded-xl bg-cocoa hover:bg-cocoa-500 text-cream-100 font-semibold text-xs text-center flex items-center justify-center gap-1.5 shadow-soft transition-all active:scale-95"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 text-caramel" />
              </button>
            </div>

            <p className="text-[10px] text-center text-cocoa-400">
              Orders placed via WhatsApp with direct bakery confirmation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
