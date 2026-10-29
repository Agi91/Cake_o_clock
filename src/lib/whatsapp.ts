import { BUSINESS_CONFIG } from '../config/business';
import { CartItem, CustomCakeEnquiry } from '../types/cart';
import { CheckoutFormState, OrderSummary } from '../types/order';
import { formatPrice } from './pricing';

/**
 * Encodes and creates a direct WhatsApp click-to-chat URL with a clean,
 * professional markdown message for cart checkout.
 */
export function generateCartWhatsAppUrl(
  orderSummary: OrderSummary,
  customerInfo: CheckoutFormState
): string {
  const lines: string[] = [];

  lines.push(`🎂 *NEW CAKE ORDER INQUIRY — ${BUSINESS_CONFIG.brandName}*`);
  lines.push(`Reference: *#${orderSummary.orderReference}*`);
  lines.push(`Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`);
  lines.push(`----------------------------------------`);
  lines.push(`*CUSTOMER DETAILS:*`);
  lines.push(`👤 Name: ${customerInfo.customerName}`);
  lines.push(`📞 Phone: ${customerInfo.phoneNumber}`);
  lines.push(`📍 Fulfillment: *${customerInfo.deliveryMethod.toUpperCase()}*`);
  lines.push(`🗓️ Preferred Date: ${customerInfo.preferredDate}`);
  lines.push(`⏰ Preferred Time: ${customerInfo.preferredTimeSlot || 'Flexible / As soon as ready'}`);

  if (customerInfo.deliveryMethod === 'delivery') {
    lines.push(`🏠 Address: ${customerInfo.deliveryAddress}`);
    if (customerInfo.landmark) lines.push(`🚩 Landmark: ${customerInfo.landmark}`);
    if (customerInfo.pincode) lines.push(`📮 PIN: ${customerInfo.pincode}`);
  }

  lines.push(`----------------------------------------`);
  lines.push(`*ORDER ITEMS (${orderSummary.items.length}):*`);

  orderSummary.items.forEach((item: CartItem, idx: number) => {
    lines.push(`\n*${idx + 1}. ${item.cake.name}* (x${item.quantity})`);
    lines.push(`   • Weight: ${item.selectedWeight.weight} (${item.selectedWeight.servings})`);
    lines.push(`   • Flavour: ${item.selectedFlavour}`);
    lines.push(`   • Dietary: ${item.isEggless ? '🌱 Eggless' : '🥚 Contains Egg'}`);
    
    if (item.cakeMessage && item.cakeMessage.trim()) {
      lines.push(`   • Message on Cake: "${item.cakeMessage.trim()}"`);
    }

    if (item.selectedAddOns.length > 0) {
      const addOnsStr = item.selectedAddOns
        .map((a) => `${a.addOn.name} (x${a.quantity})`)
        .join(', ');
      lines.push(`   • Add-ons: ${addOnsStr}`);
    }

    if (item.specialInstructions) {
      lines.push(`   • Note: ${item.specialInstructions}`);
    }

    lines.push(`   • Line Total: ${formatPrice(item.totalPrice)}`);
  });

  lines.push(`----------------------------------------`);
  lines.push(`*PAYMENT ESTIMATE:*`);
  lines.push(`Subtotal: ${formatPrice(orderSummary.subtotal)}`);
  lines.push(`Delivery Fee: ${orderSummary.deliveryFee === 0 ? 'FREE' : formatPrice(orderSummary.deliveryFee)}`);
  lines.push(`*Estimated Total: ${formatPrice(orderSummary.estimatedTotal)}*`);
  lines.push(`----------------------------------------`);

  if (customerInfo.customerNotes) {
    lines.push(`📝 *Special Instructions:*`);
    lines.push(`${customerInfo.customerNotes}`);
    lines.push(`----------------------------------------`);
  }

  lines.push(`⚠️ *Notice:* I understand this sends an enquiry and the order is finalized once Cake O Clock confirms availability & slot.`);

  const fullText = lines.join('\n');
  const encodedText = encodeURIComponent(fullText);
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedText}`;
}

/**
 * Creates WhatsApp URL for Bespoke / Custom Cake Studio Enquiry
 */
export function generateCustomCakeWhatsAppUrl(
  enquiry: CustomCakeEnquiry,
  customerName: string,
  customerPhone: string
): string {
  const lines: string[] = [];

  lines.push(`🎨 *CUSTOM CAKE ENQUIRY — ${BUSINESS_CONFIG.brandName}*`);
  lines.push(`----------------------------------------`);
  lines.push(`*CONTACT:*`);
  lines.push(`👤 Name: ${customerName}`);
  lines.push(`📞 Phone: ${customerPhone}`);
  lines.push(`----------------------------------------`);
  lines.push(`*CUSTOM CAKE SPECIFICATIONS:*`);
  lines.push(`🎉 Occasion: *${enquiry.occasion}*`);
  lines.push(`🍰 Estimated Servings / Size: *${enquiry.servings}*`);
  lines.push(`🎂 Tiers: *${enquiry.tiers} Tier(s)*`);
  lines.push(`🍫 Preferred Flavour: *${enquiry.flavour}*`);
  lines.push(`🌱 Dietary: *${enquiry.isEggless ? '100% Eggless' : 'Contains Egg / Baker Choice'}*`);
  lines.push(`🎨 Palette / Theme: *${enquiry.themeColor}*`);
  lines.push(`🗓️ Required Date: *${enquiry.preferredDate}*`);
  lines.push(`💰 Target Budget: *${enquiry.budgetRange}*`);

  if (enquiry.cakeMessage && enquiry.cakeMessage.trim()) {
    lines.push(`✍️ Inscription: "${enquiry.cakeMessage.trim()}"`);
  }

  if (enquiry.referenceImageUrl) {
    lines.push(`🖼️ Reference Image: ${enquiry.referenceImageUrl}`);
  }

  if (enquiry.additionalNotes && enquiry.additionalNotes.trim()) {
    lines.push(`📝 Notes & Vision: ${enquiry.additionalNotes.trim()}`);
  }

  lines.push(`----------------------------------------`);
  lines.push(`Could you please share your availability, design suggestions, and quotation for this custom design? Thank you!`);

  const fullText = lines.join('\n');
  const encodedText = encodeURIComponent(fullText);
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedText}`;
}
