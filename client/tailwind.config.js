/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "primaryColor":"#7209B7",
        "seconadryColor":"#C77DFA",
        "thirdColor":"#F8F9FA"
      }
      ,flex:{
        fluid:"max(25rem,(100% - 3rem)/2)"
      }
    },
  },
  plugins: [require("daisyui")],
}

