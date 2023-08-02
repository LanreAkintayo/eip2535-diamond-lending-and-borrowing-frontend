/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "ft": "900px",
      'ss': '384px',
      "ssm": '486px',
      ...defaultTheme.screens,
    },
  },
  fontFamily: {
    sans: ["Lilita One", "cursive"],
    sans2: ["Open Sans", "sans-serif"],
      // // logo: ['Rampart One', "cursive"]
    logo: ['Germania One', 'cursive']
    },
  plugins: [],
}