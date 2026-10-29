import { Heart, Sparkles, Coffee, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { BUSINESS_CONFIG } from '../../config/business';

export const BakeryStory: React.FC = () => {
  return (
    <section className="py-16 bg-cream-100 border-b border-cocoa-100/50">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Philosophy & Process */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-cocoa text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-caramel" />
              <span>Small-Batch Confectionery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa leading-tight">
              Baking with Heart, Precision, & Pure European Butter
            </h2>

            <p className="text-sm sm:text-base text-cocoa-500 leading-relaxed font-light">
              At <strong>{BUSINESS_CONFIG.brandName}</strong>, we believe cakes are more than just dessert—they are 
              the centerpiece of your family’s most treasured memories. Every single sponge is whipped fresh on 
              the morning of your celebration, avoiding chemical shelf-life extenders and pre-frozen mixes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-cocoa-100/60 shadow-soft">
                <Coffee className="w-5 h-5 text-caramel mb-2" />
                <h4 className="font-serif text-sm font-bold text-cocoa mb-1">
                  70% Callebaut Cocoa
                </h4>
                <p className="text-xs text-cocoa-400">
                  Imported Belgian couverture for intense, velvety richness.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-cocoa-100/60 shadow-soft">
                <ShieldCheck className="w-5 h-5 text-success-600 mb-2" />
                <h4 className="font-serif text-sm font-bold text-cocoa mb-1">
                  Pure Eggless Purity
                </h4>
                <p className="text-xs text-cocoa-400">
                  Separated preparation zones for strictly vegetarian confections.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-cocoa-100/60 shadow-soft">
                <Heart className="w-5 h-5 text-rose mb-2" />
                <h4 className="font-serif text-sm font-bold text-cocoa mb-1">
                  Artisanal Piped Detail
                </h4>
                <p className="text-xs text-cocoa-400">
                  Hand-piped Lambeth ruffles, fresh blossoms, and custom inscriptions.
                </p>
              </div>
            </div>

            {/* Direct Instagram Connection */}
            <div className="pt-2">
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cocoa hover:text-caramel-600 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-rose" />
                <span>Follow our daily kitchen stories on Instagram {BUSINESS_CONFIG.instagramHandle} &rarr;</span>
              </a>
            </div>

          </div>

          {/* Right: Bakery Studio Image & Owner Note */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white border border-cocoa-100/80 shadow-card space-y-4">
              <div className="aspect-4/5 rounded-2xl overflow-hidden bg-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=800&q=80"
                  alt="Pastry chef decorating an artisanal cake"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="border-t border-cocoa-100 pt-4">
                <blockquote className="text-xs italic text-cocoa-500 leading-relaxed">
                  "A celebration isn't just an event; it's a feeling of warmth. We coordinate every order directly with 
                  you on WhatsApp to guarantee your cake tastes as breathtaking as it looks."
                </blockquote>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-cocoa">Pastry Team</div>
                    <div className="text-[10px] text-cocoa-400">Cake O Clock Studio</div>
                  </div>
                  <span className="text-xs text-caramel font-serif font-bold">Est. 2021</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
