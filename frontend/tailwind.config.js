/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#151718',
          900: '#1C1F20',
          850: '#202325',
          800: '#242729', // Core charcoal background
          750: '#2A2E30',
          700: '#32373A',
          600: '#42484C',
          500: '#5A6267',
          400: '#7B858B',
          300: '#A4ACB2',
          200: '#CBD1D5',
          100: '#E6E9EB',
          50: '#F4F5F6',
        },
        orange: {
          primary: '#F45B0B',
          hover: '#DC4A04',
          active: '#BF3F03',
          subtle: '#FFF1E9',
          border: 'rgba(244, 91, 11, 0.35)',
        },
        powder: {
          50: '#F3F8F8',
          100: '#E2F1F0',
          200: '#C7E4E3',
          300: '#A8C9C8', // Core powder blue
          400: '#7EAEAC',
          500: '#589492',
          600: '#427674',
          700: '#345D5B',
          800: '#2A4B49',
          900: '#233E3D',
        },
        warm: {
          bg: '#F7F5F0',
          card: '#FFFFFF',
          elevated: '#FCFAF6',
          border: '#E5E1D8',
          subtle: '#EDE9E0',
          text: '#242729',
          muted: '#666F75',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Newsreader', 'Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'clean': '0 2px 10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
        'dark-clean': '0 4px 20px rgba(0, 0, 0, 0.35)',
        'dark-elevated': '0 16px 40px -8px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'orange-glow': '0 8px 24px -4px rgba(244, 91, 11, 0.35)',
      },
      animation: {
        'owl-blink': 'owlBlink 5s infinite ease-in-out',
        'subtle-pulse': 'subtlePulse 3s infinite ease-in-out',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
