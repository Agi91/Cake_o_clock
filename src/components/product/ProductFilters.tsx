import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { CakeFlavour } from '../../types/cake';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedFlavour: string;
  egglessOnly: boolean;
  priceSort: 'featured' | 'price-asc' | 'price-desc';
  maxPrice: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
  allFlavours: CakeFlavour[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
  allFlavours,
}) => {
  const isFiltered =
    filters.searchQuery !== '' ||
    filters.selectedFlavour !== '' ||
    filters.egglessOnly ||
    filters.priceSort !== 'featured' ||
    filters.maxPrice < 2000;

  return (
    <div className="bg-white p-5 rounded-2xl border border-cocoa-100 shadow-soft space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cocoa-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-caramel" />
          <span className="font-serif text-base font-bold text-cocoa">Filters</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-cocoa-600 font-semibold">
            {totalResults} results
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-caramel-600 hover:text-cocoa font-semibold transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Eggless Only Toggle */}
      <div className="p-3 rounded-xl bg-success-50 border border-success-100">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold text-success-600 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 border-2 border-success-600 rounded-sm flex items-center justify-center p-[1px]">
              <span className="w-1.5 h-1.5 bg-success-600 rounded-full"></span>
            </span>
            100% Eggless Only
          </span>
          <input
            type="checkbox"
            checked={filters.egglessOnly}
            onChange={(e) => onChange({ egglessOnly: e.target.checked })}
            className="w-4 h-4 rounded text-success-600 focus:ring-success-500"
          />
        </label>
      </div>

      {/* Sort By Price */}
      <div>
        <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-2">
          Sort by:
        </label>
        <select
          value={filters.priceSort}
          onChange={(e) => onChange({ priceSort: e.target.value as FilterState['priceSort'] })}
          className="w-full px-3 py-2 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
        >
          <option value="featured">Featured & Curated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Flavour Filter */}
      <div>
        <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-2">
          Flavour:
        </label>
        <select
          value={filters.selectedFlavour}
          onChange={(e) => onChange({ selectedFlavour: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
        >
          <option value="">All Flavours</option>
          {allFlavours.map((fl) => (
            <option key={fl} value={fl}>
              {fl}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider">
            Max Price:
          </label>
          <span className="text-xs font-bold text-cocoa">
            ₹{filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min={300}
          max={2000}
          step={50}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-cocoa cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-cocoa-400 mt-1">
          <span>₹300</span>
          <span>₹2,000+</span>
        </div>
      </div>
    </div>
  );
};
