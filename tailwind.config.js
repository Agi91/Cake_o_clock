/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          DEFAULT: '#3B2418',
          50: '#F7F3F0',
          100: '#EBDED6',
          200: '#D7BCAD',
          300: '#B88F78',
          400: '#8C5A41',
          500: '#5C3825',
          600: '#3B2418',
          700: '#2C1B12',
          800: '#20130D',
          900: '#140C08',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          50: '#FFFFFF',
          100: '#FFF8F0',
          200: '#FDEEDC',
          300: '#FADDBF',
          400: '#F6C69B',
          500: '#E8A572',
        },
        rose: {
          DEFAULT: '#E8A5B0',
          50: '#FDF6F7',
          100: '#FAEAED',
          200: '#F5D3D9',
          300: '#E8A5B0',
          400: '#DC7D8C',
          500: '#C94E61',
        },
        caramel: {
          DEFAULT: '#C9973F',
          50: '#FDF9F2',
          100: '#FAF1DF',
          200: '#F4DEB7',
          300: '#EBC785',
          400: '#DEAE55',
          500: '#C9973F',
          600: '#A4742B',
        },
        success: {
          DEFAULT: '#2E7D32',
          50: '#E8F5E9',
          100: '#C8E6C9',
          600: '#2E7D32',
        },
        error: {
          DEFAULT: '#B3261E',
          50: '#FDF2F2',
          100: '#FDE8E8',
          600: '#B3261E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      aspectRatio: {
        '4/5': '4 / 5',
      },
      maxWidth: {
        'content': '1200px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(59, 36, 24, 0.08)',
        'card': '0 8px 30px rgba(59, 36, 24, 0.06)',
        'elevated': '0 20px 40px -10px rgba(59, 36, 24, 0.12)',
      }
    },
  },
  plugins: [],
}
