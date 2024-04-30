/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'first': '442px',
        // => @media (min-width: 640px) { ... }
      },
      colors:{
        'blue':"#A9D6E5",
        'darkblue':"#19747E",
        'purple':"E2E2E2"
      }
    },
  },
  plugins: [],
}