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
    fontFamily: {
    sans: ["Open Sans", "sans-serif"],
    logo: ['Germania One', 'cursive']
    },
      extend: {
      gradientColorStops: {
        'custom-gradient': 'rgba(2,0,36,1) 0%, rgba(9,9,121,1) 20%, rgba(62,53,67,1) 92%',
      },
    },
  },
  
  plugins: [],
}