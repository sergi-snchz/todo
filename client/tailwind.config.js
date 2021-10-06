const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.coolGray,
      blue: colors.sky,
      yellow: colors.amber,
      red: colors.red
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
