import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Truck, 
  Store, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ShieldCheck 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormState } from '../types/order';
import { formatPrice } from '../lib/pricing';
import { generateCartWhatsAppUrl } from '../lib/whatsapp';
import { validateCheckoutForm } from '../lib/validation';
import { BUSINESS_CONFIG } from '../config/business';

export const CheckoutPage: React.FC = () => {
  const { items, orderSummary, deliveryMethod, setDeliveryMethod } = useCart();
  const navigate = useNavigate();

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-cocoa mb-2">Your cart is empty</h2>
        <p className="text-xs text-cocoa-400 mb-6">Add a cake to your cart before proceeding to checkout.</p>
        <Link to="/explore" className="px-5 py-2.5 bg-cocoa text-cream-100 rounded-xl text-xs font-semibold">
          Explore Cakes
        </Link>
      </div>
    );
  }

  // Calculate minimum date: today if ordered before 6 PM, or tomorrow
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<CheckoutFormState>({
    customerName: '',
    phoneNumber: '',
    deliveryMethod: deliveryMethod,
    deliveryAddress: '',
    landmark: '',
    pincode: '',
    preferredDate: today,
    preferredTimeSlot: '12:00 PM – 3:00 PM',
    customerNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '10:00 AM – 1:00 PM (Morning Slot)',
    '1:00 PM – 4:00 PM (Afternoon Slot)',
    '4:00 PM – 7:00 PM (Evening Slot)',
    '7:00 PM – 9:30 PM (Night Celebration)',
    'Flexible / As soon as baked',
  ];

  const handleInputChange = (field: keyof CheckoutFormState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Generate WhatsApp URL with full details
    const whatsappUrl = generateCartWhatsAppUrl(orderSummary, form);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Save order data for success page review
    sessionStorage.setItem('last_order_ref', orderSummary.orderReference);
    sessionStorage.setItem('last_order_whatsapp_url', whatsappUrl);

    // Navigate to order confirmation notice page
    navigate('/order-success');
  };

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cocoa-500 hover:text-cocoa transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
        </div>

        <div className="mb-8">
          <span className="text-caramel-600 text-xs font-bold uppercase tracking-wider">
            Direct Bakery Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
            Complete Your Celebration Order
          </h1>
          <p className="text-xs sm:text-sm text-cocoa-400 mt-1">
            Provide your details below to generate a pre-formatted WhatsApp order inquiry for our kitchen.
          </p>
        </div>

        {/* Notice Disclaimer Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">WhatsApp Order Process Notice:</span>{' '}
            Opening WhatsApp does not automatically charge or confirm your order. 
            The Cake O Clock bakery team will verify delivery slot availability, delivery address, 
            and send you an official order confirmation with payment options.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Customer & Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Contact Information */}
              <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-4">
                <h3 className="font-serif text-lg font-bold text-cocoa">
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1.5">
                      Your Full Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Sharma"
                      value={form.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel ${
                        errors.customerName ? 'border-error ring-1 ring-error' : 'border-cocoa-200'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="text-[11px] text-error mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1.5">
                      WhatsApp Mobile Number:
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel ${
                        errors.phoneNumber ? 'border-error ring-1 ring-error' : 'border-cocoa-200'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-[11px] text-error mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Fulfillment Method & Schedule */}
              <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-4">
                <h3 className="font-serif text-lg font-bold text-cocoa">
                  2. Delivery or Pickup
                </h3>

                {/* Delivery vs Pickup Radio */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange('deliveryMethod', 'delivery');
                      setDeliveryMethod('delivery');
                    }}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      form.deliveryMethod === 'delivery'
                        ? 'bg-cream-200 border-cocoa text-cocoa ring-2 ring-cocoa/20 font-bold'
                        : 'border-cocoa-100 text-cocoa-400 hover:bg-cream-100'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-caramel" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange('deliveryMethod', 'pickup');
                      setDeliveryMethod('pickup');
                    }}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      form.deliveryMethod === 'pickup'
                        ? 'bg-cream-200 border-cocoa text-cocoa ring-2 ring-cocoa/20 font-bold'
                        : 'border-cocoa-100 text-cocoa-400 hover:bg-cream-100'
                    }`}
                  >
                    <Store className="w-4 h-4 text-caramel" />
                    <span>Bakery Pickup</span>
                  </button>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-caramel" />
                      <span>Preferred Date:</span>
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel ${
                        errors.preferredDate ? 'border-error ring-1 ring-error' : 'border-cocoa-200'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="text-[11px] text-error mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-caramel" />
                      <span>Preferred Delivery Window:</span>
                    </label>
                    <select
                      value={form.preferredTimeSlot}
                      onChange={(e) => handleInputChange('preferredTimeSlot', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address fields (only if delivery) */}
                {form.deliveryMethod === 'delivery' && (
                  <div className="space-y-3 pt-3 border-t border-cocoa-100">
                    <div>
                      <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-caramel" />
                        <span>Delivery Address (House/Flat, Street, Area):</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Flat 402, Royale Apartments, 12th Main Road..."
                        value={form.deliveryAddress}
                        onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel resize-none ${
                          errors.deliveryAddress ? 'border-error ring-1 ring-error' : 'border-cocoa-200'
                        }`}
                      />
                      {errors.deliveryAddress && (
                        <p className="text-[11px] text-error mt-1">{errors.deliveryAddress}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                          Nearby Landmark (Optional):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Opposite City Park"
                          value={form.landmark}
                          onChange={(e) => handleInputChange('landmark', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                          Postal Pincode:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 560001"
                          value={form.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Special Instructions */}
              <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft">
                <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1.5">
                  Special Notes for Chef or Delivery Rider (Optional):
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please ring doorbell twice, keep extra dry ice, call before arrival..."
                  value={form.customerNotes}
                  onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel resize-none"
                />
              </div>

            </div>

            {/* Right Column: Order Review & WhatsApp Action */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-5">
                <h3 className="font-serif text-lg font-bold text-cocoa pb-3 border-b border-cocoa-100">
                  Review Your Order ({items.length} Cakes)
                </h3>

                {/* Items Mini List */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-xs gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-cocoa truncate">
                          {it.cake.name} (x{it.quantity})
                        </div>
                        <div className="text-[11px] text-cocoa-400">
                          {it.selectedWeight.weight} • {it.selectedFlavour}
                        </div>
                        {it.cakeMessage && (
                          <div className="text-[10px] text-cocoa-500 italic truncate">
                            "{it.cakeMessage}"
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-cocoa flex-shrink-0">
                        {formatPrice(it.totalPrice)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="pt-3 border-t border-cocoa-100 space-y-2 text-xs text-cocoa-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-cocoa">{formatPrice(orderSummary.subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-cocoa">
                      {form.deliveryMethod === 'pickup'
                        ? 'FREE (Self Pickup)'
                        : orderSummary.deliveryFee === 0
                        ? 'FREE'
                        : formatPrice(orderSummary.deliveryFee)}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-cocoa-100 text-sm">
                    <span className="font-bold text-cocoa">Estimated Total</span>
                    <span className="text-xl font-extrabold text-cocoa">
                      {formatPrice(
                        form.deliveryMethod === 'pickup'
                          ? orderSummary.subtotal
                          : orderSummary.estimatedTotal
                      )}
                    </span>
                  </div>
                </div>

                {/* Order Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-success-600 hover:bg-success-700 text-white font-bold text-sm shadow-card flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Order to WhatsApp</span>
                </button>

                <div className="text-[11px] text-center text-cocoa-400 space-y-1">
                  <p>Our team will acknowledge and confirm your order promptly on WhatsApp.</p>
                  <p className="text-[10px] text-cocoa-300">
                    WhatsApp Placeholder: {BUSINESS_CONFIG.phoneDisplay}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
