/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      "1/5": "1fr 5fr",

    }
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')]
}
