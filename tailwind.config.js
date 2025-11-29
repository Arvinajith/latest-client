/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#5E4AE3',
          light: '#8977F4',
          dark: '#3520A7',
        },
        accent: '#FF6B6B',
        charcoal: '#14121F',
        mist: '#F7F8FF',
      },
      boxShadow: {
        glow: '0 25px 45px rgba(94, 74, 227, 0.25)',
      },
      backdropBlur: {
        glass: '14px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

