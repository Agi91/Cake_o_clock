import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { CAKES } from '../data/cakes';
import { CATEGORIES } from '../data/categories';
import { Cake, CakeCategorySlug } from '../types/cake';
import { CakeCard } from '../components/product/CakeCard';
import { QuickViewModal } from '../components/product/QuickViewModal';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quickViewCake, setQuickViewCake] = useState<Cake | null>(null);
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'asc' | 'desc'>('featured');

  const category = CATEGORIES.find((c) => c.id === slug) || {
    id: 'bestsellers' as CakeCategorySlug,
    name: 'Celebration Cakes',
    title: 'Signature Confections',
    description: 'Explore our curated celebration cakes baked fresh with premium European ingredients.',
    badge: 'Artisanal',
    iconName: 'Award',
  };

  // Find cakes matching this category
  const categoryCakes = useMemo(() => {
    return CAKES.filter((cake) => {
      const inCategory =
        cake.primaryCategory === category.id ||
        cake.categories.includes(category.id);
      
      if (!inCategory) return false;
      if (egglessOnly && !cake.isEgglessByDefault && !cake.canBeEggless) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'asc') return a.basePrice - b.basePrice;
      if (sortBy === 'desc') return b.basePrice - a.basePrice;
      return 0;
    });
  }, [category.id, egglessOnly, sortBy]);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Back */}
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cocoa-500 hover:text-cocoa transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Cakes</span>
          </Link>
        </div>

        {/* Category Header Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cream-100 to-cream-200 border border-cocoa-100 mb-8 shadow-soft">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-caramel text-cocoa text-xs font-bold uppercase tracking-wider">
              {category.badge}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
              {category.title}
            </h1>
            <p className="text-xs sm:text-sm text-cocoa-500 leading-relaxed font-light">
              {category.description}
            </p>
          </div>

          {/* Quick Filters in Banner */}
          <div className="mt-6 pt-6 border-t border-cocoa-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-cocoa">
                <input
                  type="checkbox"
                  checked={egglessOnly}
                  onChange={(e) => setEgglessOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-success-600 focus:ring-success-500"
                />
                <span>🌱 100% Eggless Only</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-cocoa-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-cocoa-200 bg-white text-xs font-medium text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
              >
                <option value="featured">Featured</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cakes Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-cocoa-400 font-medium">
              Showing {categoryCakes.length} confections in {category.name}
            </span>
          </div>

          {categoryCakes.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-cocoa-100">
              <p className="text-xs text-cocoa-400">No cakes found with current filters.</p>
              <button
                onClick={() => setEgglessOnly(false)}
                className="mt-2 text-xs font-semibold text-caramel-600 underline"
              >
                Show all cakes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {categoryCakes.map((cake) => (
                <CakeCard
                  key={cake.id}
                  cake={cake}
                  onQuickView={setQuickViewCake}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        cake={quickViewCake}
        onClose={() => setQuickViewCake(null)}
      />
    </div>
  );
};
