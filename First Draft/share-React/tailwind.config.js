module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    screens:{
      'lit':'400px',

      'litx':'520px',

      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',

    },

    fontFamily:{
      "oxy" : ['Oxygen', 'sans-serif'],
      "lato":['Lato', 'sans-serif']
    },
    colors: {
      // Build your palette here
      "top-nav" : "#FF7400",
      "background": "#EBD8CA",
      "white" : "#F8FFFC",
      "nav-link" : "#FC5C00",
      "nav-link-text": "#451C00",
      "bor-comm" : '#9E816C',
      'light-blue':'#0DAAF9'
    },
    extend: {
        outline: {
          editor : '2px solid #BDEED7',
          "top-nav" : '2px solid #BDEED7',
          "nav-link" : '1px solid #BDEED7',
        }
      }
  },
  variants: {

  },
  plugins: [],
}
