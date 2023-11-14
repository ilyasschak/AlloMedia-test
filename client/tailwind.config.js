/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor :{
        'brand-80' : '#00E08B80',
        'brand' : '#00CA7D'
      },
      width : {
        'w-max-content' : 'max-content'
      },
      textColor : {
        'brand' : '#00CA7D'
      }
    },
  },
  plugins: [],
}

