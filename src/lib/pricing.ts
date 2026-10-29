import { Cake, CakeAddOn, CakeWeightOption } from '../types/cake';
import { CartItem, SelectedAddOn } from '../types/cart';
import { DeliveryMethod, OrderSummary } from '../types/order';
import { BUSINESS_CONFIG } from '../config/business';

/**
 * Calculates the unit price for a cake based on weight option and eggless preference.
 * Always recalculated from trusted Cake data.
 */
export function calculateCakeUnitPrice(
  cake: Cake,
  weightOption: CakeWeightOption,
  isEggless: boolean
): number {
  const baseMultiplied = Math.round(cake.basePrice * weightOption.priceMultiplier);
  const egglessFee = (!cake.isEgglessByDefault && isEggless && cake.egglessSurcharge) 
    ? cake.egglessSurcharge 
    : 0;
  return baseMultiplied + egglessFee;
}

/**
 * Calculates total price for chosen add-ons in 1 unit of cake
 */
export function calculateAddOnsUnitPrice(selectedAddOns: SelectedAddOn[]): number {
  return selectedAddOns.reduce((sum, item) => {
    return sum + (item.addOn.price * item.quantity);
  }, 0);
}

/**
 * Recalculates and validates an entire CartItem from trusted product records
 */
export function recalculateCartItem(
  item: CartItem,
  trustedCake: Cake
): CartItem {
  // Find matching weight option from trusted cake
  const trustedWeight = trustedCake.availableWeights.find(
    (w) => w.weight === item.selectedWeight.weight
  ) || trustedCake.availableWeights[0];

  const unitPrice = calculateCakeUnitPrice(trustedCake, trustedWeight, item.isEggless);
  const addOnsTotal = calculateAddOnsUnitPrice(item.selectedAddOns);
  const singleCombined = unitPrice + addOnsTotal;

  return {
    ...item,
    cake: trustedCake,
    selectedWeight: trustedWeight,
    calculatedUnitPrice: unitPrice,
    calculatedAddOnsTotal: addOnsTotal,
    totalPrice: singleCombined * Math.max(1, item.quantity),
  };
}

/**
 * Calculates overall order totals (subtotal, delivery fee, grand total)
 */
export function calculateOrderSummary(
  items: CartItem[],
  deliveryMethod: DeliveryMethod = 'delivery'
): OrderSummary {
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  
  let deliveryFee = 0;
  if (deliveryMethod === 'delivery' && items.length > 0) {
    if (subtotal < BUSINESS_CONFIG.orderingPolicies.freeDeliveryThreshold) {
      deliveryFee = BUSINESS_CONFIG.orderingPolicies.deliveryFeeEstimate;
    }
  }

  const estimatedTotal = subtotal + deliveryFee;
  // Generate random readable reference ID
  const orderReference = `COC-${Date.now().toString().slice(-6)}`;

  return {
    items,
    subtotal,
    deliveryFee,
    estimatedTotal,
    orderReference,
  };
}

/**
 * Formats a number to currency with symbol
 */
export function formatPrice(amount: number): string {
  return `${BUSINESS_CONFIG.currency.symbol}${amount.toLocaleString('en-IN')}`;
}
