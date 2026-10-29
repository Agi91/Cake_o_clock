import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { HeroBanner } from '../components/feed/HeroBanner';
import { OccasionShortcuts } from '../components/feed/OccasionShortcuts';
import { ProductRail } from '../components/feed/ProductRail';
import { CakeOfTheDay } from '../components/feed/CakeOfTheDay';
import { BakeryStory } from '../components/feed/BakeryStory';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { CAKES } from '../data/cakes';
import { FAQS } from '../data/faqs';
import { Cake } from '../types/cake';
import { BUSINESS_CONFIG } from '../config/business';

export const HomePage: React.FC = () => {
  const [quickViewCake, setQuickViewCake] = useState<Cake | null>(null);

  // Filter curated cakes for each horizontal rail
  const trendingCakes = CAKES.filter((c) => c.isTrending || c.categories.includes('trending'));
  const bestsellerCakes = CAKES.filter((c) => c.isBestseller || c.categories.includes('bestsellers'));
  const birthdayCakes = CAKES.filter((c) => c.categories.includes('birthday'));
  const chocolateCakes = CAKES.filter((c) => c.categories.includes('chocolate'));
  const egglessCakes = CAKES.filter((c) => c.isEgglessByDefault || c.categories.includes('eggless'));
  const anniversaryCakes = CAKES.filter((c) => c.categories.includes('anniversary'));
  const customCakes = CAKES.filter((c) => c.categories.includes('custom') || c.categories.includes('bento'));

  // Cake of the Day item
  const cakeOfTheDay = CAKES.find((c) => c.isCakeOfTheDay) || CAKES[0];

  return (
    <div className="min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Occasion Shortcuts Bar */}
      <OccasionShortcuts />

      {/* 3. Horizontal Product Rails (The Cake Feed) */}
      <div className="space-y-4 py-6">
        <ProductRail
          title="🔥 Trending Now in The Feed"
          subtitle="Viral Bento lunchbox cakes, speculoos crunch, and interactive trends"
          cakes={trendingCakes}
          categorySlug="trending"
          onQuickView={setQuickViewCake}
        />

        <ProductRail
          title="⭐ All-Time Bestsellers"
          subtitle="Our most celebrated signatures baked fresh daily"
          cakes={bestsellerCakes}
          categorySlug="bestsellers"
          onQuickView={setQuickViewCake}
        />

        {/* 4. Cake of the Day Feature */}
        <CakeOfTheDay cake={cakeOfTheDay} />

        <ProductRail
          title="🎉 Birthday Celebrations"
          subtitle="Confetti sprinkles, chocolate drips, and complimentary inscriptions"
          cakes={birthdayCakes}
          categorySlug="birthday"
          onQuickView={setQuickViewCake}
        />

        <ProductRail
          title="🍫 Pure Chocolate Decadence"
          subtitle="70% Callebaut dark ganache, fudge overloads, and roasted hazelnuts"
          cakes={chocolateCakes}
          categorySlug="chocolate"
          onQuickView={setQuickViewCake}
        />

        {/* Custom Cake Studio Interstitial Banner */}
        <section className="py-8 bg-cream-100">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-cocoa-800 to-cocoa-900 rounded-3xl p-8 sm:p-12 text-cream-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-caramel text-xs uppercase tracking-wider font-bold">
                  Interactive Studio
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  Have a Unique Cake Idea or Theme?
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/80 max-w-lg font-light">
                  Use our live 2D Customizer to pick tiers, frosting palettes, and custom inscriptions. 
                  Share your design specs directly with our chefs on WhatsApp.
                </p>
              </div>
              <Link
                to="/custom-studio"
                className="px-6 py-3.5 rounded-2xl bg-caramel hover:bg-caramel-400 text-cocoa font-bold text-xs sm:text-sm flex items-center gap-2 shadow-soft transition-all flex-shrink-0 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Customizer Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <ProductRail
          title="🌱 100% Eggless Delights"
          subtitle="Luscious vegetarian sponge and velvety frostings from dedicated stations"
          cakes={egglessCakes}
          categorySlug="eggless"
          onQuickView={setQuickViewCake}
        />

        <ProductRail
          title="💖 Anniversary & Romantic Specials"
          subtitle="Victorian piped hearts, ruby red velvets, and elegant blossom motifs"
          cakes={anniversaryCakes}
          categorySlug="anniversary"
          onQuickView={setQuickViewCake}
        />

        <ProductRail
          title="🎨 Bespoke & Theme Creations"
          subtitle="Artisan tiered structures and custom celebratory milestones"
          cakes={customCakes}
          categorySlug="custom"
          onQuickView={setQuickViewCake}
        />
      </div>

      {/* 5. Bakery Craft & Story */}
      <BakeryStory />

      {/* 6. FAQ Preview Section */}
      <section className="py-16 bg-white border-b border-cocoa-100/50">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-caramel-600 text-xs font-bold uppercase tracking-wider">
              Transparency & Care
            </span>
            <h2 className="font-serif text-3xl font-bold text-cocoa mt-1 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-cocoa-400">
              Everything you need to know about ordering, lead times, and WhatsApp coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {FAQS.slice(0, 4).map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-cream-50 border border-cocoa-100/70 space-y-2">
                <h4 className="font-serif text-base font-bold text-cocoa flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-caramel flex-shrink-0 mt-1" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-cocoa-500 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cocoa hover:text-caramel-600 transition-colors"
            >
              <span>View all questions, delivery terms & freshness policies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        cake={quickViewCake}
        onClose={() => setQuickViewCake(null)}
      />
    </div>
  );
};
