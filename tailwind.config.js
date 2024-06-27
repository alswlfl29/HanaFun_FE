/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: ['bg-[#FFFFFF]', 'bg-[#373A4D]'],
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
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
