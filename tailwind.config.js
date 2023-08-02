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
  plugins: [],
}