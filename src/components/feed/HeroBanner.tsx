import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream py-12 lg:py-20 border-b border-cocoa-100/50">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caramel-100 border border-caramel-200 text-cocoa text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-caramel-600" />
              <span>Artisanal Patisserie & Bespoke Cake Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cocoa leading-[1.12] tracking-tight">
              {BUSINESS_CONFIG.tagline}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-cocoa-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Immerse yourself in <strong>The Cake Feed</strong>. Browse Belgian cocoa ganache masterpieces, 
              aesthetic Korean bento lunchboxes, and bespoke celebration cakes baked fresh to order and 
              coordinated directly via WhatsApp.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/explore"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-cocoa text-cream-100 font-semibold text-sm shadow-card hover:bg-cocoa-500 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Explore The Feed</span>
                <ArrowRight className="w-4 h-4 text-caramel group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/custom-studio"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border border-cocoa-200 text-cocoa font-semibold text-sm shadow-soft hover:bg-cream-100 hover:border-cocoa transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-caramel" />
                <span>Design Your Custom Cake</span>
              </Link>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-cocoa-100/60 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-caramel flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-cocoa">Same-Day Bake</div>
                  <div className="text-[10px] text-cocoa-400">Fresh daily slots</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-caramel flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-cocoa">90%+ Eggless</div>
                  <div className="text-[10px] text-cocoa-400">Pure vegetarian recipes</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-caramel flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-cocoa">WhatsApp Direct</div>
                  <div className="text-[10px] text-cocoa-400">Direct kitchen contact</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-rose/20 to-caramel/20 rounded-3xl blur-2xl -z-10 transform -rotate-3" />

              {/* Main Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white bg-cream-200 aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                  alt="Artisanal Belgian Dark Chocolate Truffle Cake by Cake O Clock"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-header border border-white/60 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-caramel-600">
                        Signature Creation
                      </div>
                      <div className="font-serif text-sm font-bold text-cocoa">
                        Belgian Dark Chocolate Truffle
                      </div>
                    </div>
                    <Link
                      to="/cake/belgian-dark-chocolate-truffle"
                      className="px-3 py-1.5 rounded-xl bg-cocoa text-cream-100 text-xs font-semibold hover:bg-cocoa-500 transition-colors shadow-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
