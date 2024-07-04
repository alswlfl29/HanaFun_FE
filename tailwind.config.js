/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: ['bg-[#FFFFFF]', 'bg-[#373A4D]', 'bg-[#252B45]', 'bg-[#D9D9D9]'],
  theme: {
    extend: {
      fontFamily: {
        hanaRegular: ['HanaRegular', 'sans-serif'],
        hanaMedium: ['HanaMedium', 'sans-serif'],
        hanaBold: ['HanaBold', 'sans-serif'],
        hanaLight: ['HanaLight', 'sans-serif'],
      },
      colors: {
        hanaGreen: '#008485',
        hanaRed: '#E90061',
        hanaSilver: '#B5B5B5',
        hanaGold: '#AD9A5F',
        hanaBlack: '#000000',
        hanaNavGreen: '#27BB9E',
        hanaNavGray: '#8295AB',
      },
      keyframes: {
        'slide-down': {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 60%, 0)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0, -200%, 0)',
          },
        },
      },
      animation: {
        slidedown: 'slide-down 1s forwards',
        slideup: 'slide-up 1.3s forwards',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
