import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Store 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/pricing';
import { BUSINESS_CONFIG } from '../config/business';

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    orderSummary,
    deliveryMethod,
    setDeliveryMethod 
  } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto text-center px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-cocoa mb-4">
          <ShoppingBag className="w-10 h-10 text-caramel" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-cocoa mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-xs sm:text-sm text-cocoa-400 mb-6 max-w-xs">
          Explore The Cake Feed for trending Belgian truffles, bento lunchboxes, and bespoke creations.
        </p>
        <Link
          to="/explore"
          className="px-6 py-3.5 bg-cocoa hover:bg-cocoa-500 text-cream-100 rounded-2xl text-xs sm:text-sm font-semibold shadow-card transition-all active:scale-95"
        >
          Explore All Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-caramel-600 text-xs font-bold uppercase tracking-wider">
              Review Selections
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
              Your Shopping Cart
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-cocoa-400 hover:text-error underline transition-colors"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-cocoa-100/80 shadow-soft flex flex-col sm:flex-row gap-5"
              >
                {/* Cake Image */}
                <div className="w-full sm:w-32 aspect-4/5 sm:aspect-square rounded-2xl overflow-hidden bg-cream-200 flex-shrink-0">
                  <img
                    src={item.cake.images[0]}
                    alt={item.cake.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link to={`/cake/${item.cake.slug}`}>
                          <h3 className="font-serif text-lg font-bold text-cocoa hover:text-caramel-600 transition-colors">
                            {item.cake.name}
                          </h3>
                        </Link>
                        <div className="text-xs text-cocoa-400 mt-0.5">
                          {item.selectedWeight.weight} ({item.selectedWeight.servings}) • {item.selectedFlavour}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-cocoa-300 hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Inscription & Add-ons */}
                    <div className="mt-3 space-y-1.5 text-xs text-cocoa-500">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-cocoa">Dietary:</span>
                        <span className={item.isEggless ? 'text-success-600 font-semibold' : 'text-cocoa-400'}>
                          {item.isEggless ? '🌱 100% Eggless' : '🥚 Contains Egg'}
                        </span>
                      </div>

                      {item.cakeMessage && (
                        <div className="p-2 rounded-xl bg-cream-100 border border-cocoa-100 text-cocoa-600 text-xs">
                          <span className="font-semibold text-cocoa">Message on Board:</span> "{item.cakeMessage}"
                        </div>
                      )}

                      {item.selectedAddOns.length > 0 && (
                        <div className="pt-1">
                          <span className="font-semibold text-cocoa">Add-ons:</span>{' '}
                          {item.selectedAddOns.map((a) => `${a.addOn.name} (x${a.quantity})`).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="pt-4 border-t border-cocoa-100 mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-cocoa-200 rounded-xl bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-cocoa hover:bg-cream-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-cocoa">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-cocoa hover:bg-cream-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase text-cocoa-400">Total</div>
                      <div className="text-base font-bold text-cocoa">
                        {formatPrice(item.totalPrice)}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}

            {/* Continue Shopping Link */}
            <div className="pt-2">
              <Link
                to="/explore"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cocoa-500 hover:text-cocoa transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Browsing Cakes</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-5">
              <h3 className="font-serif text-xl font-bold text-cocoa pb-3 border-b border-cocoa-100">
                Order Summary
              </h3>

              {/* Delivery or Studio Pickup Radio */}
              <div>
                <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-2">
                  Fulfillment Method:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'bg-cream-200 border-cocoa text-cocoa ring-2 ring-cocoa/20'
                        : 'border-cocoa-100 text-cocoa-400 hover:bg-cream-100'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-caramel" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'bg-cream-200 border-cocoa text-cocoa ring-2 ring-cocoa/20'
                        : 'border-cocoa-100 text-cocoa-400 hover:bg-cream-100'
                    }`}
                  >
                    <Store className="w-4 h-4 text-caramel" />
                    <span>Studio Pickup</span>
                  </button>
                </div>
              </div>

              {/* Line Summary */}
              <div className="space-y-2 text-xs text-cocoa-500 pt-2 border-t border-cocoa-100">
                <div className="flex justify-between">
                  <span>Cakes Subtotal ({orderSummary.items.length} items)</span>
                  <span className="font-semibold text-cocoa">
                    {formatPrice(orderSummary.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-cocoa">
                    {deliveryMethod === 'pickup'
                      ? 'FREE (Self Pickup)'
                      : orderSummary.deliveryFee === 0
                      ? 'FREE'
                      : formatPrice(orderSummary.deliveryFee)}
                  </span>
                </div>

                {orderSummary.subtotal < BUSINESS_CONFIG.orderingPolicies.freeDeliveryThreshold && deliveryMethod === 'delivery' && (
                  <div className="text-[11px] text-caramel-600 bg-caramel-50 p-2 rounded-lg">
                    Add {formatPrice(BUSINESS_CONFIG.orderingPolicies.freeDeliveryThreshold - orderSummary.subtotal)} more for free delivery!
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-cocoa-100 flex items-baseline justify-between">
                <span className="text-sm font-bold text-cocoa">Estimated Total</span>
                <span className="text-2xl font-extrabold text-cocoa">
                  {formatPrice(deliveryMethod === 'pickup' ? orderSummary.subtotal : orderSummary.estimatedTotal)}
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-2xl bg-cocoa hover:bg-cocoa-500 text-cream-100 font-bold text-sm shadow-card flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4 text-caramel" />
              </button>

              <div className="flex items-center gap-2 text-[11px] text-cocoa-400">
                <ShieldCheck className="w-4 h-4 text-success flex-shrink-0" />
                <span>Orders confirmed directly by bakery chefs via WhatsApp.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
