/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        '2xl': '0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19)'
      },
      flex: {
        '75': '0 0 calc(75% - 20px)'
      },
      screens: {
        // 'sm': {'min':'400px',  },
        'md': { 'max': '768px' },
        'lg1': { 'max': '1024px' },
        'lg': { 'min': '768px' },
        'xl': { 'min': '1024px' },
        '2xl': { 'min': '1200px' },
        

        

        // 'sm': '300px',
        // // => @media (min-width: 640px) { ... }

        // 'md': '640px',
        // // => @media (min-width: 768px) { ... }

        // 'lg': '768px',
        // // => @media (min-width: 1024px) { ... }

        // 'xl': '1024px',
      },
      colors: {
        'red': '#e21b22',
        'gray': '#818181',
        'dark': '111111',
        'text-red': '#e21b22',
        'light-gray': '#ddd',
        'border_color': '#EEEEEE',
        "gray-light": "#efefef",
        "gray-dark1": "#20272C",
        "white": "#ffffff"
      }


    },
  },
  plugins: [

  ],
}
