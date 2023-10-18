/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,vue}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik, sans-serif"],
      },
    },
  },
  // plugins: [require("tw-elements/dist/plugin.cjs")],
};
