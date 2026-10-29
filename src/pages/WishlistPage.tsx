import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { CAKES } from '../data/cakes';
import { CakeCard } from '../components/product/CakeCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Cake } from '../types/cake';

export const WishlistPage: React.FC = () => {
  const { wishlistIds } = useWishlist();
  const [quickViewCake, setQuickViewCake] = useState<Cake | null>(null);

  const savedCakes = CAKES.filter((c) => wishlistIds.includes(c.id));

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cocoa-500 hover:text-cocoa transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </Link>
        </div>

        <div className="mb-8">
          <span className="text-caramel-600 text-xs font-bold uppercase tracking-wider">
            Saved Creations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
            Your Cake Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-cocoa-400 mt-1">
            {savedCakes.length} {savedCakes.length === 1 ? 'cake' : 'cakes'} saved for upcoming birthdays & special moments.
          </p>
        </div>

        {savedCakes.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto p-8 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-4">
            <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-cocoa">
              <Heart className="w-8 h-8 text-rose" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cocoa">
              No Saved Cakes Yet
            </h3>
            <p className="text-xs text-cocoa-400">
              Tap the heart icon on any cake card to save your favorite flavours and designs for quick access.
            </p>
            <Link
              to="/explore"
              className="inline-flex px-6 py-3 rounded-2xl bg-cocoa text-cream-100 text-xs font-semibold hover:bg-cocoa-500 transition-colors shadow-soft"
            >
              Discover The Feed
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedCakes.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onQuickView={setQuickViewCake}
              />
            ))}
          </div>
        )}

      </div>

      <QuickViewModal
        cake={quickViewCake}
        onClose={() => setQuickViewCake(null)}
      />
    </div>
  );
};
