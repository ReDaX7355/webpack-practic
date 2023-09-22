/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{tsx, jsx, js, ts}', './dist/index.html'],
  theme: {
    colors: {
      //https://colorscheme.ru/#3c31Tw0w0w0w0
      primary: '#00A383',
      secondary: '#5ED1BA',
      agree: '#006A55',
      warninng: '#FFA100',
      danger: '#F30021',
    },
    extend: {},
  },
  plugins: [],
};
