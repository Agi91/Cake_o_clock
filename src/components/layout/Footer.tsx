import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, MessageCircle, MapPin, AlertCircle } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { BUSINESS_CONFIG } from '../../config/business';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cocoa-900 text-cream-100/90 pt-16 pb-12 border-t border-cocoa-800">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Top Disclaimer Alert Banner */}
        <div className="mb-12 p-4 rounded-2xl bg-cocoa-800/80 border border-cocoa-700/60 flex items-start gap-3 text-xs text-cream-200">
          <AlertCircle className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-caramel">Bakery Order Confirmation Notice:</span>{' '}
            {BUSINESS_CONFIG.orderingPolicies.confirmationNotice}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cocoa-800">
          
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-cocoa-800 text-cream flex items-center justify-center border border-cocoa-700">
                <Clock className="w-5 h-5 text-caramel" />
              </div>
              <span className="font-serif text-2xl font-bold text-cream tracking-tight">
                {BUSINESS_CONFIG.brandName}
              </span>
            </div>
            
            <p className="text-sm text-cream-200/80 leading-relaxed max-w-sm">
              Artisanal small-batch bakery crafting boutique celebration cakes, European truffles, 
              aesthetic Korean bento boxes, and personalized custom creations with pure ingredients.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-cream-200/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-caramel" />
                <span>{BUSINESS_CONFIG.location.addressDemo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-caramel" />
                <span>{BUSINESS_CONFIG.location.operatingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cocoa-800 hover:bg-cocoa-700 text-cream text-xs font-medium border border-cocoa-700 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-rose" />
                <span>{BUSINESS_CONFIG.instagramHandle}</span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi Cake O Clock! I would like to make an enquiry.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-success-600/90 hover:bg-success-600 text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Col 3: Browse */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream mb-4">
              Explore The Feed
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-200/70">
              <li>
                <Link to="/category/trending" className="hover:text-caramel transition-colors">
                  Trending & Bento
                </Link>
              </li>
              <li>
                <Link to="/category/bestsellers" className="hover:text-caramel transition-colors">
                  Bestseller Cakes
                </Link>
              </li>
              <li>
                <Link to="/category/chocolate" className="hover:text-caramel transition-colors">
                  Chocolate Lovers
                </Link>
              </li>
              <li>
                <Link to="/category/eggless" className="hover:text-caramel transition-colors">
                  100% Eggless Cakes
                </Link>
              </li>
              <li>
                <Link to="/category/anniversary" className="hover:text-caramel transition-colors">
                  Anniversary Specials
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-caramel transition-colors font-medium text-cream">
                  All 24+ Cakes &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Custom Studio & Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream mb-4">
              Custom Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-200/70">
              <li>
                <Link to="/custom-studio" className="hover:text-caramel transition-colors">
                  Interactive Cake Studio
                </Link>
              </li>
              <li>
                <Link to="/category/custom" className="hover:text-caramel transition-colors">
                  Theme & Tiered Cakes
                </Link>
              </li>
              <li>
                <Link to="/category/cupcakes" className="hover:text-caramel transition-colors">
                  Artisan Cupcake Boxes
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-caramel transition-colors">
                  Our Baking Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream mb-4">
              Help & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-200/70">
              <li>
                <Link to="/faq" className="hover:text-caramel transition-colors">
                  Ordering & Delivery FAQ
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-caramel transition-colors">
                  Cancellation & Freshness
                </Link>
              </li>
              <li>
                <Link to="/policies#allergen" className="hover:text-caramel transition-colors">
                  Allergen Information
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-caramel transition-colors">
                  Saved Cakes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-300/50">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-cream-300/70">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose fill-rose" />
            <span>for genuine celebrations</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
