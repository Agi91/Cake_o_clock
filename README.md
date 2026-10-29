# 🎂 Cake O Clock — The Cake Feed
> **Premium Interactive Cake Commerce & Artisanal Bakery Feed**  
> *Every Celebration Deserves a Beautiful Cake.*

[![React](https://img.shields.io/badge/React-19.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Overview

**Cake O Clock** ([@cakeoclock.21](https://www.instagram.com/cakeoclock.21)) is a modern, media-first cake ordering website featuring **The Cake Feed**: Netflix-style horizontal browsing rails, an interactive 2D Custom Cake Studio, and frictionless WhatsApp-based ordering direct to the bakery kitchen.

### ✨ Key Features

- **The Cake Feed**: Editorial homepage with 7 Netflix-style horizontal browsing rails (Trending, Bestsellers, Birthday, Chocolate Lovers, 100% Eggless, Anniversary, and Bespoke Theme Cakes) with smooth touch gestures and desktop arrow controls.
- **Cake of the Day**: Daily special confections highlighting chef recipes, lead times, and promotional badges.
- **Interactive 2D Custom Cake Studio**: Live visualizer dynamically rendering tiers (1 to 3), frosting theme color palettes, and custom inscriptions piped in real-time.
- **Dynamic Product Pages**: Real-time price recalculation based on weight (0.5 kg to 2.0 kg), flavor selection, eggless preferences, and celebratory add-ons (toppers, spiral candles, handwritten greeting cards).
- **Persistent Client-Side Cart**: Stored in `localStorage` with automated pricing recalculation to prevent client-side tampering.
- **WhatsApp Direct Ordering**: Generates pre-formatted, markdown-styled WhatsApp messages detailing the full order breakdown, inscriptions, delivery method, and customer details.
- **Cocoa & Cream Design System**: Warm, appetizing, editorial aesthetic with Playfair Display and Inter typography.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, React Router 7
- **Styling**: Tailwind CSS 3.4 (Custom Cocoa & Cream color tokens)
- **Icons**: Lucide React + custom SVG brand assets
- **Effects**: Canvas Confetti for celebratory order initiation
- **Build Tool**: Vite 6

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22)
- **npm** v9+

### 2. Installation
```bash
git clone https://github.com/Agi91/Cake_o_clock.git
cd Cake_o_clock
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

---

## ⚙️ Business Configuration

All bakery contact details, WhatsApp numbers, delivery areas, and operating hours are centralized in a single configuration file for easy client handover:

📍 **[`src/config/business.ts`](src/config/business.ts)**

```typescript
export const BUSINESS_CONFIG = {
  brandName: "Cake O Clock",
  instagramHandle: "@cakeoclock.21",
  whatsappNumber: "919876543210", // Replace with client WhatsApp number
  phoneDisplay: "+91 98765 43210",
  location: {
    addressDemo: "Shop 12, Artisanal Confections Lane...",
    deliveryRadiusKm: 15,
    operatingHours: "10:00 AM – 10:00 PM (Everyday)",
  },
  orderingPolicies: {
    freeDeliveryThreshold: 1499,
    deliveryFeeEstimate: 80,
  },
};
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
