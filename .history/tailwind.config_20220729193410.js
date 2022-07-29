/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'primary': {
        100: '#5BBA6F',
        300: '#3FA34D',
        500: '#2A9134',
        700: '#137547',
        900: '#054A29',
      }
    },
  },
  plugins: [],
}
