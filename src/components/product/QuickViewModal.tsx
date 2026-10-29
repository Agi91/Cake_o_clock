import React, { useState } from 'react';
import { X, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Cake, CakeFlavour, CakeWeightOption } from '../../types/cake';
import { calculateCakeUnitPrice, formatPrice } from '../../lib/pricing';
import { useCart } from '../../context/CartContext';
import { Badge } from '../common/Badge';

interface QuickViewModalProps {
  cake: Cake | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ cake, onClose }) => {
  if (!cake) return null;

  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<CakeWeightOption>(cake.availableWeights[0]);
  const [selectedFlavour, setSelectedFlavour] = useState<CakeFlavour>(cake.defaultFlavour);
  const [isEggless, setIsEggless] = useState<boolean>(cake.isEgglessByDefault);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [added, setAdded] = useState(false);

  const currentUnitPrice = calculateCakeUnitPrice(cake, selectedWeight, isEggless);

  const handleAddToCart = () => {
    addToCart({
      cake,
      selectedWeight,
      selectedFlavour,
      isEggless,
      cakeMessage,
      selectedAddOns: [],
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cocoa-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-elevated border border-cocoa-100 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-cocoa shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-5/12 bg-cream-200 relative aspect-4/5 md:aspect-auto">
          <img
            src={cake.images[0]}
            alt={cake.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            {cake.isEgglessByDefault && <Badge type="eggless" text="Eggless" />}
            {cake.isBestseller && <Badge type="bestseller" text="Bestseller" />}
          </div>
        </div>

        {/* Right: Quick Options */}
        <div className="md:w-7/12 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-caramel-600 mb-1">
              {cake.primaryCategory}
            </div>
            <h2 className="font-serif text-xl font-bold text-cocoa mb-1">
              {cake.name}
            </h2>
            <p className="text-xs text-cocoa-400 line-clamp-2 mb-4">
              {cake.tagline}
            </p>

            {/* Size / Weight Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-2">
                1. Select Size / Servings:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cake.availableWeights.map((w) => {
                  const isSelected = selectedWeight.weight === w.weight;
                  return (
                    <button
                      key={w.weight}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-cocoa bg-cream-100 ring-2 ring-cocoa/20 font-semibold'
                          : 'border-cocoa-100 hover:border-cocoa-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-cocoa">{w.weight}</div>
                      <div className="text-[11px] text-cocoa-400">{w.servings}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Flavour Selector */}
            {cake.flavours.length > 1 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-2">
                  2. Select Flavour:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {cake.flavours.map((fl) => (
                    <button
                      key={fl}
                      type="button"
                      onClick={() => setSelectedFlavour(fl)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedFlavour === fl
                          ? 'bg-cocoa text-cream-100'
                          : 'bg-cream-200 text-cocoa hover:bg-cream-300'
                      }`}
                    >
                      {fl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Eggless Option (if configurable) */}
            {cake.canBeEggless && !cake.isEgglessByDefault && (
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-cocoa">
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    className="w-4 h-4 rounded text-success-600 focus:ring-success-500"
                  />
                  <span>Make 100% Eggless (+{formatPrice(cake.egglessSurcharge)})</span>
                </label>
              </div>
            )}

            {/* Message on Cake */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1">
                Message on Cake (Complimentary, max 25 chars):
              </label>
              <input
                type="text"
                maxLength={25}
                placeholder="e.g. Happy Birthday Chloe!"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-cream-50 border border-cocoa-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caramel text-cocoa"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-cocoa-100 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase text-cocoa-400">Total Price</div>
              <div className="text-xl font-bold text-cocoa">
                {formatPrice(currentUnitPrice)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/cake/${cake.slug}`}
                onClick={onClose}
                className="text-xs text-cocoa-500 hover:text-cocoa underline px-2 py-1 flex items-center gap-0.5"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={added}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 shadow-soft transition-all active:scale-95 ${
                  added
                    ? 'bg-success text-white'
                    : 'bg-cocoa hover:bg-cocoa-500 text-cream-100'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-caramel" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
