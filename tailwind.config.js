const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'custom-purple': '#6a0d83',
      'custom-darkpink': '#ce4993',
      'custom-darkcoral': '#ee5d6c',
      'custom-orange':'#fb9062',
      'custom-yellow': '#eeaf61',
    },
    extend: {
      width:{
        'custom500': '500px'
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require('flowbite/plugin')],
};
