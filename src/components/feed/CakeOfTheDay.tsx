import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight, ShoppingBag } from 'lucide-react';
import { Cake } from '../../types/cake';
import { Badge } from '../common/Badge';
import { formatPrice } from '../../lib/pricing';

interface CakeOfTheDayProps {
  cake: Cake;
}

export const CakeOfTheDay: React.FC<CakeOfTheDayProps> = ({ cake }) => {
  const originalPrice = Math.round(cake.basePrice / (1 - (cake.discountPercentage || 15) / 100));

  return (
    <section className="py-12 bg-cocoa text-cream-100 relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Banner Pill */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel text-cocoa text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Cake of the Day (Demo Feature)
          </span>
          <span className="text-xs text-cream-200/70">
            Freshly baked at 8:00 AM • Limited slots available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cocoa-800/60 p-6 sm:p-10 rounded-3xl border border-cocoa-700 backdrop-blur-sm">
          
          {/* Left: Product Imagery */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-elevated border-2 border-cocoa-600">
              <img
                src={cake.images[0]}
                alt={cake.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <Badge type="discount" text={`${cake.discountPercentage || 15}% OFF TODAY`} />
                {cake.isEgglessByDefault && <Badge type="eggless" text="100% Eggless" />}
              </div>
            </div>
          </div>

          {/* Right: Details & Call to Action */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-caramel text-xs font-semibold uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4" />
                <span>Bake of the Day • Ready in {cake.leadTimeHours} Hours</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-2 leading-tight">
                {cake.name}
              </h3>
              <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed font-light">
                {cake.description}
              </p>
            </div>

            {/* Flavor highlights & Dietary */}
            <div className="p-4 rounded-xl bg-cocoa-900/60 border border-cocoa-700/80 space-y-2">
              <div className="text-xs text-cream-200/90">
                <strong className="text-caramel">Chef's Flavor Notes:</strong> {cake.flavours.join(', ')}
              </div>
              {cake.ingredientsSummary && (
                <div className="text-xs text-cream-200/70">
                  <strong className="text-cream">Crafted With:</strong> {cake.ingredientsSummary}
                </div>
              )}
            </div>

            {/* Pricing & CTA */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-cream-300/70">
                  Special Daily Offer
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-caramel">
                    {formatPrice(cake.basePrice)}
                  </span>
                  <span className="text-sm line-through text-cream-300/60">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="text-xs text-cream-200/70">
                    ({cake.availableWeights[0]?.weight})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/cake/${cake.slug}`}
                  className="px-6 py-3.5 rounded-2xl bg-caramel hover:bg-caramel-400 text-cocoa font-bold text-sm shadow-card flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Customize & Order</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
