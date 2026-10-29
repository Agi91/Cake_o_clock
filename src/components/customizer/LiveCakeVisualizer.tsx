import React from 'react';

interface LiveCakeVisualizerProps {
  tiers: number; // 1, 2, or 3
  themeColor: string; // hex or color class
  cakeMessage: string;
  flavour: string;
  isEggless: boolean;
}

export const LiveCakeVisualizer: React.FC<LiveCakeVisualizerProps> = ({
  tiers,
  themeColor,
  cakeMessage,
  flavour,
  isEggless,
}) => {
  // Map color names to pleasant cake frosting tones
  const colorMap: Record<string, { base: string; accent: string; drip: string; text: string }> = {
    'Cocoa Brown': { base: '#3B2418', accent: '#5C3825', drip: '#20130D', text: '#FFF8F0' },
    'Vintage Cream': { base: '#FFF8F0', accent: '#FDEEDC', drip: '#C9973F', text: '#3B2418' },
    'Rose Blush': { base: '#F5D3D9', accent: '#E8A5B0', drip: '#C94E61', text: '#3B2418' },
    'Caramel Gold': { base: '#F4DEB7', accent: '#DEAE55', drip: '#A4742B', text: '#3B2418' },
    'Pastel Lavender': { base: '#E9D5FF', accent: '#D8B4FE', drip: '#A855F7', text: '#3B2418' },
    'Pistachio Mint': { base: '#D1FAE5', accent: '#A7F3D0', drip: '#10B981', text: '#3B2418' },
  };

  const currentTheme = colorMap[themeColor] || colorMap['Vintage Cream'];

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-cream-100 to-cream-200 border border-cocoa-100 p-6 flex flex-col items-center justify-center min-h-[360px] overflow-hidden shadow-inner">
      
      {/* Visualizer Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full bg-white/90 border border-cocoa-100 text-[11px] font-semibold text-cocoa shadow-sm">
          Live 2D Studio Preview
        </span>
        {isEggless && (
          <span className="px-2 py-0.5 rounded-full bg-success-50 border border-success-200 text-[10px] font-bold text-success-600">
            🌱 100% Eggless
          </span>
        )}
      </div>

      <div className="absolute top-4 right-4 text-right">
        <span className="text-[11px] font-medium text-cocoa-500">
          Flavour: <strong className="text-cocoa">{flavour}</strong>
        </span>
      </div>

      {/* Cake Stand & Tiers */}
      <div className="relative flex flex-col items-center justify-end w-full max-w-xs mt-6 pt-6">
        
        {/* Decorative Top Topper / Candle */}
        <div className="flex flex-col items-center mb-1 animate-pulse-subtle">
          <div className="w-2 h-4 bg-caramel rounded-full"></div>
          <div className="w-1 h-3 bg-amber-400 -mt-1 shadow-sm"></div>
          <span className="text-xs font-serif text-caramel-600 font-bold -mt-0.5">
            ✨
          </span>
        </div>

        {/* Tier 3 (Top tier if 3 tiers) */}
        {tiers >= 3 && (
          <div
            className="w-24 h-12 rounded-t-xl relative border-2 border-white/60 shadow-md flex items-center justify-center transition-all duration-300 -mb-1 z-30"
            style={{ backgroundColor: currentTheme.base }}
          >
            <div
              className="absolute top-0 inset-x-0 h-2 rounded-t-xl opacity-60"
              style={{ backgroundColor: currentTheme.drip }}
            />
          </div>
        )}

        {/* Tier 2 (Middle tier if 2 or 3 tiers) */}
        {tiers >= 2 && (
          <div
            className="w-40 h-16 rounded-t-xl relative border-2 border-white/60 shadow-md flex items-center justify-center transition-all duration-300 -mb-1 z-20"
            style={{ backgroundColor: currentTheme.accent }}
          >
            <div
              className="absolute top-0 inset-x-0 h-2.5 rounded-t-xl opacity-70"
              style={{ backgroundColor: currentTheme.drip }}
            />
          </div>
        )}

        {/* Base Tier (Always present) */}
        <div
          className="w-56 h-24 rounded-t-2xl relative border-2 border-white/80 shadow-card flex flex-col items-center justify-center p-2 text-center transition-all duration-300 z-10"
          style={{ backgroundColor: currentTheme.base }}
        >
          {/* Dripping Frosting Effect */}
          <div
            className="absolute top-0 inset-x-0 h-3 rounded-t-2xl opacity-80"
            style={{ backgroundColor: currentTheme.drip }}
          />

          {/* Live Inscription / Cake Message */}
          <div className="mt-2 px-3 py-1 rounded bg-black/10 backdrop-blur-[1px] max-w-[90%]">
            <p
              className="font-serif italic font-semibold text-xs sm:text-sm tracking-wide break-words line-clamp-2"
              style={{ color: currentTheme.text }}
            >
              {cakeMessage.trim() ? `"${cakeMessage.trim()}"` : 'Your Inscription Here'}
            </p>
          </div>
        </div>

        {/* Cake Board / Pedestal */}
        <div className="w-64 h-3 rounded-full bg-caramel-300 border border-caramel-400 shadow-md -mt-0.5 z-0" />
        <div className="w-32 h-2 rounded-b-md bg-cocoa-200 mx-auto" />

      </div>

      {/* Visual Spec Summary */}
      <div className="mt-6 text-center text-xs text-cocoa-400">
        Showing: {tiers} Tier ({themeColor}) with customized piping
      </div>

    </div>
  );
};
