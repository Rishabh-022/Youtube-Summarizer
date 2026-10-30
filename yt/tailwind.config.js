/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050814',
          card: 'rgba(12, 18, 38, 0.75)',
          cyan: '#00f0ff',
          violet: '#a855f7',
          emerald: '#10b981',
          blue: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}