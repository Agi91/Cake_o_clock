import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Clock, ShoppingBag } from 'lucide-react';
import { Cake } from '../../types/cake';
import { Badge } from '../common/Badge';
import { formatPrice } from '../../lib/pricing';
import { useWishlist } from '../../context/WishlistContext';

interface CakeCardProps {
  cake: Cake;
  onQuickView?: (cake: Cake) => void;
  className?: string;
}

export const CakeCard: React.FC<CakeCardProps> = ({ cake, onQuickView, className = '' }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(cake.id);
  const [imageError, setImageError] = useState(false);

  // Fallback image in case external URL fails
  const primaryImage = imageError || !cake.images[0]
    ? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    : cake.images[0];

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-cocoa-100/70 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col flex-shrink-0 ${className}`}
    >
      {/* 4:5 Aspect Ratio Image Container */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-cream-200">
        <Link to={`/cake/${cake.slug}`} className="block w-full h-full">
          <img
            src={primaryImage}
            alt={cake.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {cake.isEgglessByDefault && (
              <Badge type="eggless" text="100% Eggless" className="pointer-events-auto shadow-sm" />
            )}
            {cake.isBestseller && (
              <Badge type="bestseller" text="Bestseller" className="pointer-events-auto shadow-sm" />
            )}
            {cake.isTrending && (
              <Badge type="trending" text="Trending" className="pointer-events-auto shadow-sm" />
            )}
            {cake.discountPercentage && (
              <Badge type="discount" text={`${cake.discountPercentage}% OFF`} className="pointer-events-auto shadow-sm" />
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(cake.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              wishlisted
                ? 'bg-rose text-cocoa'
                : 'bg-white/80 hover:bg-white text-cocoa-500 hover:text-cocoa'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Button on Desktop Hover */}
        {onQuickView && (
          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(cake);
              }}
              className="flex-1 py-2 px-3 bg-cocoa/90 hover:bg-cocoa text-cream-100 text-xs font-semibold rounded-xl backdrop-blur-md flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-caramel" />
              <span>Quick Options</span>
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Lead Time */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-cocoa-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-caramel-600">
              {cake.primaryCategory}
            </span>
            <span className="flex items-center gap-1 text-cocoa-400">
              <Clock className="w-3 h-3 text-caramel" />
              {cake.leadTimeHours}h lead
            </span>
          </div>

          {/* Title */}
          <Link to={`/cake/${cake.slug}`}>
            <h3 className="font-serif text-base font-semibold text-cocoa group-hover:text-caramel-600 transition-colors line-clamp-1 mb-1">
              {cake.name}
            </h3>
          </Link>

          {/* Short Tagline */}
          <p className="text-xs text-cocoa-400 line-clamp-2 leading-relaxed mb-3">
            {cake.tagline}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-cocoa-50 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-cocoa-400">
              Starts from
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-cocoa">
                {formatPrice(cake.basePrice)}
              </span>
              <span className="text-xs text-cocoa-400">
                / {cake.availableWeights[0]?.weight || '0.5 kg'}
              </span>
            </div>
          </div>

          <Link
            to={`/cake/${cake.slug}`}
            className="p-2 sm:px-3 sm:py-2 bg-cream-200 hover:bg-caramel hover:text-white text-cocoa rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95"
            aria-label={`View ${cake.name}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
