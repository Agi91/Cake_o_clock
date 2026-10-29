import React from 'react';
import { Link } from 'react-router-dom';
import { CakeCategorySlug } from '../../types/cake';

interface OccasionShortcutItem {
  slug: CakeCategorySlug;
  label: string;
  emoji: string;
  tagline: string;
}

const SHORTCUTS: OccasionShortcutItem[] = [
  { slug: 'birthday', label: 'Birthday Cakes', emoji: '🎉', tagline: 'Make wishes sweet' },
  { slug: 'anniversary', label: 'Anniversary', emoji: '💖', tagline: 'Romantic layers' },
  { slug: 'bento', label: 'Bento Mini (250g)', emoji: '🎁', tagline: 'Korean lunchbox trend' },
  { slug: 'chocolate', label: 'Chocolate Lovers', emoji: '🍫', tagline: 'Pure Belgian cocoa' },
  { slug: 'eggless', label: '100% Eggless', emoji: '🌱', tagline: 'Pure vegetarian' },
  { slug: 'bestsellers', label: 'Bestsellers', emoji: '⭐', tagline: 'Fan favourites' },
  { slug: 'custom', label: 'Custom & Theme', emoji: '🎨', tagline: 'Bespoke designs' },
  { slug: 'cupcakes', label: 'Cupcake Boxes', emoji: '🧁', tagline: 'Bite-sized treats' },
];

export const OccasionShortcuts: React.FC = () => {
  return (
    <section className="py-8 bg-cream border-b border-cocoa-100/40">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-cocoa">
            Find Cakes by Occasion
          </h2>
          <Link
            to="/explore"
            className="text-xs font-semibold text-caramel-600 hover:text-cocoa transition-colors"
          >
            All Categories &rarr;
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-2.5 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {SHORTCUTS.map((item) => (
            <Link
              key={item.slug}
              to={`/category/${item.slug}`}
              className="group flex-shrink-0 w-32 sm:w-auto p-3 rounded-2xl bg-white border border-cocoa-100/70 hover:border-caramel hover:shadow-card transition-all text-center flex flex-col items-center justify-center active:scale-95"
            >
              <span className="text-2xl mb-1.5 transform group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>
              <span className="text-xs font-bold text-cocoa group-hover:text-caramel-600 transition-colors line-clamp-1">
                {item.label}
              </span>
              <span className="text-[10px] text-cocoa-400 line-clamp-1">
                {item.tagline}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
