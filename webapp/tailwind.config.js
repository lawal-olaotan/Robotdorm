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
      },
    },
  },
  plugins: [],
}
