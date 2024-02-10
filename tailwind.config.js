/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        'auto-fill': 'repeat(auto-fill, 1fr)',
      },
    },
  },
  plugins: [],
};
