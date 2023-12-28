import docLibLogo from "../assets/docLibLogo.svg";
import hidepass from "../assets/hidepass.png";
import googlelogo from "../assets/googlelogo.svg";
import React, { useState } from 'react';
function HomeScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = (e) => {
    e.preventDefault();
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  return (
    <div >
       <div className="flex">
         <img src={docLibLogo} alt="docLibLogo" className="h-[80px] mt-5" />
       </div>
      
       <div className="flex flex-col justify-center items-center py-10">
       <div className="flex flex-col justify-center items-center w-[300px] rounded-3xl md:w-[400px] md:shadow-custom2 mt-[-20px]">
           <div className="relative text-center items-center  rounded-ss-none rounded-se-[30.71px] rounded-es-[30.71px] rounded-ee-none mt-10 w-[198px] h-[43px] shadow-custom">
              <h5 className="absolute mt-4 inset-0 flex justify-center items-center font-bold font-Lora pb-4 text-base">Se connecter</h5>
           </div>
           <div className=" text-center ml-9 mt-14">
              <h5 className="font-medium italic font-Lora pr-9 text-3xl">Ravis de vous revoir</h5>
           </div>
           <div className="flex flex-col justify-center items-center mt-[55px] ">
               <form className="w-[290px] h-[330px]">
                 <input type="text" placeholder="Adresse e-mail" className="Inputsign"/>
                 <div className="relative mt-[50px]">
                 <input type={passwordVisible ? 'text' : 'password'} placeholder="Mot de passe" className="Inputsign"/>
                   <button onClick={handlePasswordToggle} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
                     <img src={hidepass} alt="Show/Hide Password" className="h-7 w-7"/>
                   </button>
                 </div>
                 <div className="mt-4">
                 <a href="/#" className=" text-seconadryColor font-Poppins"><u>Mot de passe oublié ?</u></a> 
                 </div>
                 <button type="submit" className="w-full h-[52px] bg-seconadryColor mt-[35px] ">
                 <span className=" font-Poppins">Continuer</span> 
                 </button>
                 <div className="mt-4">
                  <span className=" font-Poppins">Vous n'avez pas de compte ? </span>
                 <a href="/#" className=" text-seconadryColor font-Poppins"><u>Inscription</u></a> 
                 </div>
               </form>
               <div class="w-[290px] flex items-center mt-[35px]">
                   <div class="flex-1 border-b border-black"></div>
                    <span class="mx-4">Ou</span>
                   <div class="flex-1 border-b border-black"></div>
               </div>
               <button  className="flex justify-left items-center w-[290px] h-[52px] focus:border-primaryColor focus:outline-none mt-10 border-black border-[0.5px] mb-10">
                  <img src={googlelogo} className="h-10 w-10 mr-3 ml-5" />
                  <span className="font-Poppins"> Continuer avec Google</span>
               </button>
            </div>
        </div>
       </div>
    

        </div>
   
    
  )
}

export default HomeScreen
