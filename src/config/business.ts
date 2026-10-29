/**
 * Centralized Business Configuration for Cake O Clock
 * 
 * Note: Real contact details, WhatsApp number, address, and delivery zones
 * must be verified and updated with the bakery owner.
 */

export interface BusinessConfig {
  brandName: string;
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
  // WhatsApp business number in international format (e.g. 919876543210 without '+' or spaces)
  whatsappNumber: string;
  isWhatsAppPlaceholder: boolean;
  phoneDisplay: string;
  email: string;
  currency: {
    symbol: string;
    code: string;
  };
  location: {
    displayCity: string;
    addressDemo: string;
    isAddressPlaceholder: boolean;
    deliveryRadiusKm: number;
    operatingHours: string;
  };
  orderingPolicies: {
    standardCakeLeadTime: string; // e.g. "Same-day (3-4 hours lead time)"
    customCakeLeadTime: string;   // e.g. "24 - 48 hours in advance"
    confirmationNotice: string;
    deliveryFeeEstimate: number;
    freeDeliveryThreshold: number;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  brandName: "Cake O Clock",
  tagline: "Every Celebration Deserves a Beautiful Cake",
  instagramHandle: "@cakeoclock.21",
  instagramUrl: "https://www.instagram.com/cakeoclock.21",
  // Demo placeholder phone for WhatsApp orders:
  whatsappNumber: "919876543210", // CLIENT PLACEHOLDER: Replace with verified client WhatsApp number
  isWhatsAppPlaceholder: true,
  phoneDisplay: "+91 98765 43210 (Demo Contact)",
  email: "orders@cakeoclock.demo",
  currency: {
    symbol: "₹",
    code: "INR",
  },
  location: {
    displayCity: "Local Bakery Studio",
    addressDemo: "Shop 12, Artisanal Confections Lane (Client Address Placeholder)",
    isAddressPlaceholder: true,
    deliveryRadiusKm: 15,
    operatingHours: "10:00 AM – 10:00 PM (Everyday)",
  },
  orderingPolicies: {
    standardCakeLeadTime: "Same-Day Delivery (Order 3–4 hrs in advance)",
    customCakeLeadTime: "24–48 Hours Lead Time for Custom Orders",
    confirmationNotice: "Please note: Opening WhatsApp sends an order inquiry. The bakery team will confirm slot availability, final delivery fees, and order confirmation directly with you.",
    deliveryFeeEstimate: 80,
    freeDeliveryThreshold: 1499,
  },
};
