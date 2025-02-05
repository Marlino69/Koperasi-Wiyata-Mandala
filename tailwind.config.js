/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradients: {
        'custom': '4AA1B4 57C1A0',
      }
    },
  },
  plugins: [],
}