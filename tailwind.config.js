/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customCreme': '#FFE8D1',  // You can define your own color name and hex code
        'customBlue': '#568EA3',
        'customFairouzi': '#68C3D4',
      },
    },
  },
  plugins: [],
}