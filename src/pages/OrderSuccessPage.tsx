import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Clock, ArrowRight, AlertCircle, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_CONFIG } from '../config/business';
import { useCart } from '../context/CartContext';

export const OrderSuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  const [orderRef, setOrderRef] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  useEffect(() => {
    // Fire celebratory confetti on page mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9973F', '#E8A5B0', '#3B2418', '#FFF8F0'],
      });
    } catch (e) {
      // Confetti fail-safe
    }

    const savedRef = sessionStorage.getItem('last_order_ref') || `COC-${Date.now().toString().slice(-6)}`;
    const savedUrl = sessionStorage.getItem('last_order_whatsapp_url') || `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`;
    setOrderRef(savedRef);
    setWhatsappUrl(savedUrl);

    // Clear cart once order enquiry has been initiated
    clearCart();
  }, []);

  return (
    <div className="py-16 min-h-[75vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full bg-success-50 border-2 border-success-200 text-success-600 flex items-center justify-center mx-auto mb-6 shadow-card">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200 text-cocoa text-xs font-bold uppercase tracking-wider mb-2">
          Inquiry Initiated • Reference #{orderRef}
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mb-3">
          Your Order Has Been Sent to WhatsApp!
        </h1>

        <p className="text-sm text-cocoa-500 leading-relaxed font-light mb-8 max-w-md mx-auto">
          We have composed your cake options and sent them directly to the Cake O Clock bakery team.
        </p>

        {/* What Happens Next Card */}
        <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft text-left space-y-4 mb-8">
          <h3 className="font-serif text-base font-bold text-cocoa flex items-center gap-2">
            <Clock className="w-4 h-4 text-caramel" />
            <span>What happens next?</span>
          </h3>

          <div className="space-y-3 text-xs text-cocoa-500">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cream-200 text-cocoa font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong>Check your WhatsApp:</strong> If the chat didn't open automatically, use the button below to send your pre-formatted order summary.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cream-200 text-cocoa font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong>Bakery Slot Confirmation:</strong> Our pastry team will review your preferred date, delivery slot, and address to confirm availability.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cream-200 text-cocoa font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong>Freshly Baked:</strong> Once confirmed, your cake is baked fresh to order and dispatched safely in temperature-controlled packaging.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-[11px] text-amber-900 mt-2">
            <AlertCircle className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
            <span>
              <strong>Reminder:</strong> This inquiry reserves your spot in the queue. Order confirmation and payment details are settled directly with the bakery over WhatsApp.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-success-600 hover:bg-success-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-card transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Re-open WhatsApp Chat</span>
            </a>
          )}

          <Link
            to="/explore"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cocoa hover:bg-cocoa-500 text-cream-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-caramel" />
            <span>Browse More Cakes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
