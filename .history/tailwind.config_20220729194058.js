/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#47dfbc',
          500: '#428afe',
          900: '#2c5af1',
        }
      },
    },
  },
  plugins: [],
}
