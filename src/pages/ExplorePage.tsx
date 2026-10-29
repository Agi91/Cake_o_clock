import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { CAKES } from '../data/cakes';
import { CATEGORIES } from '../data/categories';
import { Cake, CakeFlavour } from '../types/cake';
import { CakeCard } from '../components/product/CakeCard';
import { ProductFilters, FilterState } from '../components/product/ProductFilters';
import { QuickViewModal } from '../components/product/QuickViewModal';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialSearch,
    selectedCategory: initialCategory,
    selectedFlavour: '',
    egglessOnly: false,
    priceSort: 'featured',
    maxPrice: 2000,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewCake, setQuickViewCake] = useState<Cake | null>(null);

  // Sync search params with filter state if URL changes
  useEffect(() => {
    const q = searchParams.get('search') || '';
    const cat = searchParams.get('category') || '';
    setFilters((prev) => ({
      ...prev,
      searchQuery: q,
      selectedCategory: cat,
    }));
  }, [searchParams]);

  // Extract all distinct flavours
  const allFlavours = useMemo(() => {
    const set = new Set<CakeFlavour>();
    CAKES.forEach((cake) => {
      cake.flavours.forEach((f) => set.add(f));
    });
    return Array.from(set);
  }, []);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: '',
      selectedFlavour: '',
      egglessOnly: false,
      priceSort: 'featured',
      maxPrice: 2000,
    });
    setSearchParams({});
  };

  // Filter and sort the cakes
  const filteredCakes = useMemo(() => {
    return CAKES.filter((cake) => {
      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = cake.name.toLowerCase().includes(query);
        const matchesTagline = cake.tagline.toLowerCase().includes(query);
        const matchesFlavour = cake.flavours.some((f) => f.toLowerCase().includes(query));
        const matchesCategory = cake.categories.some((c) => c.toLowerCase().includes(query));
        if (!matchesName && !matchesTagline && !matchesFlavour && !matchesCategory) {
          return false;
        }
      }

      // Category filter
      if (filters.selectedCategory) {
        if (!cake.categories.includes(filters.selectedCategory as any)) {
          return false;
        }
      }

      // Eggless filter
      if (filters.egglessOnly && !cake.isEgglessByDefault && !cake.canBeEggless) {
        return false;
      }

      // Flavour filter
      if (filters.selectedFlavour && !cake.flavours.includes(filters.selectedFlavour as CakeFlavour)) {
        return false;
      }

      // Max price filter
      if (cake.basePrice > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.priceSort === 'price-asc') return a.basePrice - b.basePrice;
      if (filters.priceSort === 'price-desc') return b.basePrice - a.basePrice;
      return 0; // featured default order
    });
  }, [filters]);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Header Title & Search Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-caramel-600 text-xs uppercase tracking-wider font-bold">
                The Complete Catalogue
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
                Explore All Cakes
              </h1>
              <p className="text-xs sm:text-sm text-cocoa-400 mt-1">
                Browse our complete selection of fresh celebration cakes, bento boxes, and signature gateaux.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-cocoa-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cake name or flavour..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-cocoa-200 rounded-2xl text-xs text-cocoa placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-caramel shadow-soft"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => handleFilterChange({ searchQuery: '' })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cocoa-300 hover:text-cocoa"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Quick Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => handleFilterChange({ selectedCategory: '' })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filters.selectedCategory === ''
                  ? 'bg-cocoa text-cream-100 shadow-soft'
                  : 'bg-white border border-cocoa-100 text-cocoa hover:bg-cream-100'
              }`}
            >
              All Categories ({CAKES.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange({ selectedCategory: cat.id })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filters.selectedCategory === cat.id
                    ? 'bg-cocoa text-cream-100 shadow-soft'
                    : 'bg-white border border-cocoa-100 text-cocoa hover:bg-cream-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="w-full py-2.5 px-4 bg-white border border-cocoa-200 rounded-xl text-xs font-semibold text-cocoa flex items-center justify-center gap-2 shadow-soft"
          >
            <Filter className="w-4 h-4 text-caramel" />
            <span>Filter & Sort ({filteredCakes.length} results)</span>
          </button>
        </div>

        {/* Main Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResults={filteredCakes.length}
                allFlavours={allFlavours}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredCakes.length === 0 ? (
              /* No-Results State with Custom Cake Enquiry CTA */
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-cocoa-100 text-center space-y-4 shadow-soft">
                <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-cocoa">
                  <Sparkles className="w-8 h-8 text-caramel" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cocoa">
                  No cakes matched your filter
                </h3>
                <p className="text-xs sm:text-sm text-cocoa-400 max-w-md mx-auto">
                  Looking for something bespoke or a different flavour combination? 
                  Our pastry chefs can bake virtually any custom recipe or design.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl border border-cocoa text-cocoa font-semibold text-xs hover:bg-cream-100 transition-colors"
                  >
                    Clear All Filters
                  </button>

                  <Link
                    to="/custom-studio"
                    className="px-5 py-2.5 rounded-xl bg-cocoa text-cream-100 font-semibold text-xs shadow-soft hover:bg-cocoa-500 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-caramel" />
                    <span>Inquire Custom Cake</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredCakes.map((cake) => (
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

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-cocoa-900/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-elevated p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cocoa-100 mb-4">
                <h3 className="font-serif text-lg font-bold text-cocoa">Filters & Sort</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-cocoa-400 hover:text-cocoa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResults={filteredCakes.length}
                allFlavours={allFlavours}
              />
            </div>

            <div className="pt-4 border-t border-cocoa-100">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-cocoa text-cream-100 rounded-xl text-xs font-semibold"
              >
                Show {filteredCakes.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        cake={quickViewCake}
        onClose={() => setQuickViewCake(null)}
      />
    </div>
  );
};
