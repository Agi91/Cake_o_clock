import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Cake, CakeCategorySlug } from '../../types/cake';
import { CakeCard } from '../product/CakeCard';

interface ProductRailProps {
  title: string;
  subtitle?: string;
  cakes: Cake[];
  categorySlug?: CakeCategorySlug;
  onQuickView?: (cake: Cake) => void;
}

export const ProductRail: React.FC<ProductRailProps> = ({
  title,
  subtitle,
  cakes,
  categorySlug,
  onQuickView,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [cakes]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  if (cakes.length === 0) return null;

  return (
    <section className="py-8 border-b border-cocoa-100/30">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Rail Header with Controls */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-cocoa tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-cocoa-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {categorySlug && (
              <Link
                to={`/category/${categorySlug}`}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-cocoa-500 hover:text-caramel-600 transition-colors mr-2"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Accessible Desktop Scroll Controls */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2 rounded-xl border border-cocoa-200 transition-all ${
                  canScrollLeft
                    ? 'bg-white hover:bg-cream-200 text-cocoa shadow-sm cursor-pointer'
                    : 'bg-cream-100 text-cocoa-200 cursor-not-allowed opacity-40'
                }`}
                aria-label={`Scroll ${title} left`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-2 rounded-xl border border-cocoa-200 transition-all ${
                  canScrollRight
                    ? 'bg-white hover:bg-cream-200 text-cocoa shadow-sm cursor-pointer'
                    : 'bg-cream-100 text-cocoa-200 cursor-not-allowed opacity-40'
                }`}
                aria-label={`Scroll ${title} right`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Netflix-style horizontal scrolling rail */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 px-1 -mx-1"
        >
          {cakes.map((cake) => (
            <div key={cake.id} className="w-[260px] sm:w-[280px] flex-shrink-0">
              <CakeCard
                cake={cake}
                onQuickView={onQuickView}
                className="h-full"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
