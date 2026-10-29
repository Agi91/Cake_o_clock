import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../lib/storage';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (cakeId: string) => void;
  isWishlisted: (cakeId: string) => boolean;
  wishlistCount: number;
}

const WISHLIST_STORAGE_KEY = 'cake_o_clock_wishlist_v1';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    return loadFromStorage<string[]>(WISHLIST_STORAGE_KEY, []);
  });

  useEffect(() => {
    saveToStorage(WISHLIST_STORAGE_KEY, wishlistIds);
  }, [wishlistIds]);

  const toggleWishlist = (cakeId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(cakeId)) {
        return prev.filter((id) => id !== cakeId);
      } else {
        return [...prev, cakeId];
      }
    });
  };

  const isWishlisted = (cakeId: string) => {
    return wishlistIds.includes(cakeId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
