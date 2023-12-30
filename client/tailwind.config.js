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
        fluid:"max(25rem,(100% - 3rem)/2)",
        fluid1:"max(2rem,(100% -4rem)/2)"
      },
      gridTemplateColumns:{
        fluid:"repeat(auto-fit,minmax(20rem,1fr))"
      },
      fontFamily: {
        Lora:"Lora, serif",
        Poppins: ['Poppins'],
        
      },
      borderRadius:{
        "customRaduis1":"0px 30.4328px"
      },
      boxShadow: {
        'custom2': '17.13px 25.6px 85.64px rgba(0, 0, 0, 0.25)',
      },
        }
      },
      
      
    plugins: [require("daisyui")],

}

