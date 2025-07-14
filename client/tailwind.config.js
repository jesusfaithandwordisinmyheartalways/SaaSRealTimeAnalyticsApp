/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",       // ✅ Needed for production layouts
    "./src/**/*.{js,jsx,ts,tsx}" // ✅ Covers all app components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}