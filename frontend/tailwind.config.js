/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amazon': {
          50: '#fff8ed',
          100: '#ffeed5',
          200: '#ffd9aa',
          300: '#ffbe74',
          400: '#ff973c',
          500: '#ff7916',
          600: '#f05a0c',
          700: '#c7410c',
          800: '#9e3312',
          900: '#7f2d12',
        },
      },
    },
  },
  plugins: [],
}
