/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 24px 2px rgba(20, 25, 38, 0.05)',
        'customShadow': '0px 4px 24px 0px rgba(20, 25, 38, 0.05)' // Custom shadow
      },
      width: {
        'customWidth': 'calc(100% - 280px)',
      },
    },
  },
  plugins: [],
}
