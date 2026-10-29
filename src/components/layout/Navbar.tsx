import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Clock, 
  MessageCircle, 
  ArrowRight
} from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BUSINESS_CONFIG } from '../../config/business';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'The Feed', path: '/' },
    { label: 'Explore Cakes', path: '/explore' },
    { label: 'Custom Studio', path: '/custom-studio' },
    { label: 'Our Story', path: '/about' },
    { label: 'FAQs & Policies', path: '/faq' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-cocoa text-cream-100 text-xs py-2 px-4 border-b border-cocoa-700/50">
        <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-caramel animate-pulse"></span>
            <span className="font-medium">
              Freshly Baked Today • WhatsApp Ordering Direct to Kitchen
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-cream-200/80">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-caramel" />
              {BUSINESS_CONFIG.location.operatingHours}
            </span>
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-caramel flex items-center gap-1 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              {BUSINESS_CONFIG.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 glass-header border-b border-cocoa-100/60 shadow-soft">
        <div className="max-w-content mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-cocoa-100/50 text-cocoa transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-cocoa text-cream-100 flex items-center justify-center shadow-card group-hover:scale-105 transition-transform duration-200">
                <Clock className="w-5 h-5 text-caramel" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-cocoa group-hover:text-caramel-600 transition-colors">
                  Cake O Clock
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-cocoa-400 -mt-1">
                  Artisanal Feed
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cocoa bg-cream-200 font-semibold'
                      : 'text-cocoa-500 hover:text-cocoa hover:bg-cream-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions (Search, Wishlist, WhatsApp, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl hover:bg-cocoa-100/50 text-cocoa-600 hover:text-cocoa transition-colors"
              aria-label="Search cakes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2.5 rounded-xl hover:bg-cocoa-100/50 text-cocoa-600 hover:text-cocoa transition-colors relative"
              aria-label="View saved cakes"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose text-cocoa text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Contact Direct Button (Desktop) */}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi Cake O Clock! I would like to inquire about ordering a fresh cake.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-success-50 text-success-600 hover:bg-success-100 border border-success-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cocoa text-cream-100 hover:bg-cocoa-500 shadow-soft transition-all duration-200 active:scale-95"
              aria-label="Open shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-caramel" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-caramel text-cocoa text-[10px] font-extrabold rounded-full flex items-center justify-center animate-bounce">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium hidden md:inline">Cart</span>
            </button>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="border-t border-cocoa-100 bg-cream-50/95 py-3 px-4 shadow-inner animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-cocoa-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by cake flavour, occasion, or name (e.g. Truffle, Bento, Red Velvet)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-cocoa-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caramel text-cocoa placeholder:text-cocoa-300"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-cocoa text-cream-100 rounded-xl text-sm font-medium hover:bg-cocoa-500 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-cocoa-400 hover:text-cocoa"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-cocoa-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-cream-50 h-full shadow-elevated p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-cocoa-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-cocoa text-cream-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-caramel" />
                  </div>
                  <span className="font-serif text-xl font-bold text-cocoa">
                    Cake O Clock
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-cocoa-400 hover:text-cocoa hover:bg-cream-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-cocoa text-cream-100'
                          : 'text-cocoa hover:bg-cream-200'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </NavLink>
                ))}
              </div>

              {/* Custom Cake Callout in Drawer */}
              <div className="p-4 rounded-2xl bg-cocoa-50 border border-cocoa-100 mt-2">
                <div className="flex items-center gap-2 text-cocoa font-semibold text-sm mb-1">
                  <Sparkles className="w-4 h-4 text-caramel" />
                  <span>Looking for a bespoke cake?</span>
                </div>
                <p className="text-xs text-cocoa-500 mb-3">
                  Design your own tier, colors, and flavour in our interactive studio.
                </p>
                <Link
                  to="/custom-studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full py-2 bg-caramel text-cocoa font-medium text-xs rounded-xl shadow-sm hover:bg-caramel-400 transition-colors"
                >
                  Open Customizer
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-cocoa-100 text-xs text-cocoa-500 space-y-3">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi Cake O Clock, I would like to place an order!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-success-600 text-white rounded-xl font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="text-center text-[11px] text-cocoa-400">
                Instagram: {BUSINESS_CONFIG.instagramHandle}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
