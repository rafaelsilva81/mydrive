/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      opacity: ['disabled'],
      border: ['disabled'],
      // add any tailwind classes you wish to enable disabled: on here  
    }
  },
  content: ['./index.html', './src/*.tsx', './src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Fira Sans', 'sans-serif'],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'png-background': 'repeating-conic-gradient(#808080 0% 25%, #FFF 0% 50%)',
      },
    },
  },
  plugins: [],
};
