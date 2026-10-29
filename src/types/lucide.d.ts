declare module 'lucide-react' {
  import type * as React from 'react';
  
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  
  export type LucideIcon = React.FC<LucideProps>;

  export const ShoppingBag: LucideIcon;
  export const Heart: LucideIcon;
  export const Search: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Clock: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Instagram: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Eye: LucideIcon;
  export const Trash2: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Filter: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Upload: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Truck: LucideIcon;
  export const Store: LucideIcon;
  export const Calendar: LucideIcon;
  export const MapPin: LucideIcon;
  export const Coffee: LucideIcon;
  export const Flame: LucideIcon;
  export const Award: LucideIcon;
  export const PartyPopper: LucideIcon;
  export const Leaf: LucideIcon;
  export const Palette: LucideIcon;
  export const Gift: LucideIcon;
  export const Share2: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const Info: LucideIcon;
  export const RefreshCw: LucideIcon;
}
