import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#C9A84C',
          600: '#B8960A',
          700: '#92740A',
          800: '#78600D',
          900: '#5C4A10',
        },
        forest: {
          50:  '#f0f7f4',
          100: '#dcede5',
          200: '#b9daca',
          300: '#8fc2aa',
          400: '#5fa287',
          500: '#3d836a',
          600: '#1E3A2F',
          700: '#1a3028',
          800: '#162620',
          900: '#0f1c17',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-jost)', 'sans-serif'],
        amharic: ['var(--font-noto-serif-ethiopic)', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #F5D483 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0f1c17 0%, #1E3A2F 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 50%, transparent 100%)',
      },
      boxShadow: {
        'gold': '0 4px 30px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 8px 50px rgba(201, 168, 76, 0.4)',
        'dark': '0 4px 30px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
