module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    fontFamily:{
      "oxy" : ['Oxygen', 'sans-serif'],
    },
    colors: {
      // Build your palette here
      "top-nav" : "#E28048",
      "background": "#EBD8CA",
      "white" : "#F8FFFC",
      "nav-link" : "#FC5C00",
      "nav-link-text": "#451C00",
      "bor-comm" : '#9E816C'
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
