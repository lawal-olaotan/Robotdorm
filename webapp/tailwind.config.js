module.exports = {
  mode:'jit',
  content:['./pages/**/*.{js,tx,jsx,tsx}','./components/**/*.{js,tx,jsx,tsx}'],
  media:false,
  theme: {
    screens:{
      'sm':"320px",
      'md':"768px",
      'lg':'1024px',
      'xl':'1440px',
      '2xl':'2560px',
    },
    extend: {
      fontFamily:{
        "sans": ['Poppins', 'sans-serif']
      },
      colors:{
        primary:'#0A2635',
        grey:'#808080',
        blue: '#0D67FF',
        secondary:'#307BD1',
        dashpop:'#EBF6FE',
        dashbg:'#F1F3F6'
      },
      boxShadow:{
        '5xl': 'rgb(0 0 0 / 8%) 0px 2px 12px 0px',
        '6xl': 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
      }
    },
  },
  plugins: [],
}
