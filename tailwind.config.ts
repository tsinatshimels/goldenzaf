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
        // Tuned to match the Golden Zaf logo (deep forest green + warm amber gold).
        gold: {
          50:  '#fffaeb',
          100: '#fdf0c8',
          200: '#fbe198',
          300: '#F2D27D',
          400: '#E0B653',
          500: '#C9A14A',
          600: '#A88333',
          700: '#8B6E1B',
          800: '#6B5414',
          900: '#4F3D0E',
        },
        forest: {
          50:  '#eef5f0',
          100: '#d6ead9',
          200: '#abd2b3',
          300: '#7eb78b',
          400: '#519b66',
          500: '#347d4d',
          600: '#1E3A2F',
          700: '#143228',
          800: '#102B22',
          900: '#0D2820',
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
        'gold-gradient': 'linear-gradient(135deg, #C9A14A 0%, #F2D27D 50%, #C9A14A 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0D2820 0%, #143228 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(201,161,74,0.18) 50%, transparent 100%)',
      },
      boxShadow: {
        'gold': '0 4px 30px rgba(201, 161, 74, 0.32)',
        'gold-lg': '0 8px 50px rgba(201, 161, 74, 0.45)',
        'dark': '0 4px 30px rgba(0, 0, 0, 0.55)',
      },
    },
  },
  plugins: [],
}
export default config
