/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-texture': "url('src/assets/images/header-texture.svg')"
      }
    },
  },
  plugins: [],
}

