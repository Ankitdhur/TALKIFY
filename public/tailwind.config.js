/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
theme: {
  extend: {
    colors: {
      primary: '#229ED9',
      primaryDark: '#0088CC',
      background: '#F0F4F8',
      grayDark: '#374151',
      grayLight: '#5A6473',
    }
  }
},
  plugins: [],
}

