module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,tx,jsx,tsx}",
    "./components/**/*.{js,tx,jsx,tsx}",
  ],
  media: false,
  theme: {
    extend: {
      screens: {
        _sm: "320px",
        _md: "768px",
        _lg: "1024px",
        _xl: "1440px",
        _2xl: "1920px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0A2635",
        grey: "#808080",
        blue: "#0D67FF",
        secondary: "#307BD1",
        dashpop: "#EBF6FE",
        dashbg: "#F1F3F6",
        disabledprimary: "#0A263556",
      },
      boxShadow: {
        "5xl": "rgb(0 0 0 / 8%) 0px 2px 12px 0px",
        "6xl": "rgba(0, 0, 0, 0.15) 0px 2px 8px",
      },
    },
  },
  plugins: [],
};
