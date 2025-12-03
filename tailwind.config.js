/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./menu.html",
    "./apropos.html",
    "./contact.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}