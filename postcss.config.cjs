// ✅ New style for Tailwind CSS 3.4+
// File: postcss.config.cjs

const tailwindcss = require('@tailwindcss/postcss');

module.exports = {
  plugins: [
    tailwindcss(),
    require('autoprefixer'),
  ],
};
