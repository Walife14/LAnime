/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'background': '#f6f6f2'
      },
      backgroundImage: {
        'header-texture': "url('src/assets/images/header-texture.svg')"
      }
    },
  },
  plugins: [],
}

