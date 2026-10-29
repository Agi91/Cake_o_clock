import React from 'react';

interface BadgeProps {
  type: 'eggless' | 'bestseller' | 'trending' | 'discount' | 'custom' | 'leadtime';
  text?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, text, className = '' }) => {
  if (type === 'eggless') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-50 text-success-600 border border-success-100 ${className}`}
        title="100% Pure Vegetarian / Eggless"
      >
        <span className="w-2.5 h-2.5 border-2 border-success-600 rounded-sm flex items-center justify-center p-[1px]">
          <span className="w-1.5 h-1.5 bg-success-600 rounded-full"></span>
        </span>
        {text || '100% Eggless'}
      </span>
    );
  }

  if (type === 'bestseller') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-caramel-100 text-caramel-600 border border-caramel-200 ${className}`}
      >
        ★ {text || 'Bestseller'}
      </span>
    );
  }

  if (type === 'trending') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-cocoa border border-rose-200 ${className}`}
      >
        🔥 {text || 'Trending'}
      </span>
    );
  }

  if (type === 'discount') {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-cocoa text-cream-100 ${className}`}
      >
        {text}
      </span>
    );
  }

  if (type === 'leadtime') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-cocoa-50 text-cocoa-600 ${className}`}
      >
        ⏱️ {text}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cream-200 text-cocoa ${className}`}>
      {text}
    </span>
  );
};
