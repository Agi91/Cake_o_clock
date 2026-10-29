import { Sparkles, Heart, Coffee, ShieldCheck, MapPin, Clock, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../components/common/Icons';
import { BUSINESS_CONFIG } from '../config/business';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-caramel-600 text-xs font-bold uppercase tracking-wider">
            Our Baking Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa mt-2 mb-4">
            Crafting Celebrations, One Layer at a Time
          </h1>
          <p className="text-sm sm:text-base text-cocoa-500 leading-relaxed font-light">
            Founded in 2021, <strong>{BUSINESS_CONFIG.brandName}</strong> is dedicated to the art of small-batch 
            European confectionery, Korean bento trends, and bespoke celebration cakes.
          </p>
        </div>

        {/* Narrative & Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
              Slow-Baking, Real Cream, & Zero Artificial Preservatives
            </h2>
            <p className="text-xs sm:text-sm text-cocoa-500 leading-relaxed font-light">
              Unlike commercial industrial bakeries that keep hundreds of cakes deep-frozen in industrial freezers, 
              every single order at Cake O Clock begins with freshly whipped batters on the morning of your event.
            </p>
            <p className="text-xs sm:text-sm text-cocoa-500 leading-relaxed font-light">
              We exclusively use 70% dark Belgian cocoa couverture, authentic speculoos butter, 
              sweet Alphonso mangoes in season, and fresh non-hydrogenated dairy creams to ensure every slice 
              melts luxuriously on the palate.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-cocoa-200 text-cocoa text-xs font-semibold hover:bg-cream-100 shadow-soft transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-rose" />
                <span>Follow {BUSINESS_CONFIG.instagramHandle}</span>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-success-600 text-white text-xs font-semibold hover:bg-success-700 shadow-soft transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Head Baker</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
                  alt="Belgian chocolate glaze dripping"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-card mt-6">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80"
                  alt="Artisanal buttercream piping"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Quality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cream-200 text-cocoa flex items-center justify-center">
              <Coffee className="w-6 h-6 text-caramel" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa">
              Premium Ingredients
            </h3>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              Imported Callebaut chocolate, Madagascar vanilla beans, and slow-churned farm dairy.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cream-200 text-cocoa flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-success-600" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa">
              Pure Eggless Hygiene
            </h3>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              Designated eggless baking zone with strict sterilization to honor vegetarian preferences.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cream-200 text-cocoa flex items-center justify-center">
              <Heart className="w-6 h-6 text-rose" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa">
              Direct Human Care
            </h3>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              No automated chatbots. You speak directly with our studio pastry team on WhatsApp.
            </p>
          </div>
        </div>

        {/* Studio Location & Notice */}
        <div className="p-8 rounded-3xl bg-cream-100 border border-cocoa-100/70 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-cocoa text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-caramel" />
            <span>Studio Location & Contact Information</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-cocoa">
            Cake O Clock Kitchen Studio
          </h3>
          <p className="text-xs text-cocoa-500">
            {BUSINESS_CONFIG.location.addressDemo}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-cocoa-500 pt-2">
            <div>
              <strong>Hours:</strong> {BUSINESS_CONFIG.location.operatingHours}
            </div>
            <div>
              <strong>Delivery Radius:</strong> Up to {BUSINESS_CONFIG.location.deliveryRadiusKm} km
            </div>
            <div>
              <strong>Contact:</strong> {BUSINESS_CONFIG.phoneDisplay}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
