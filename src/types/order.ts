import { CartItem } from './cart';

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CheckoutFormState {
  customerName: string;
  phoneNumber: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  landmark: string;
  pincode: string;
  preferredDate: string;
  preferredTimeSlot: string;
  customerNotes: string;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  estimatedTotal: number;
  orderReference: string;
}
