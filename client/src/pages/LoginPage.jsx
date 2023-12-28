import docLibLogo from "../assets/docLibLogo.svg";
import googlelogo from "../assets/googlelogo.svg";
import React, { useState } from 'react';
import {validate} from 'react-email-validator' ;
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
function HomeScreen() {
  const [Email , setEmail] = useState("");
  const [Password , setPassword] = useState();

  const [validSubmission , setValidSubmission] = useState(true);


  const HanldeSubmit = (e) =>{
     
    e.preventDefault();
   if(!validate(Email) || (Password.trim().length < 8 === true)){
    
    setValidSubmission(false);
    return;
   }
  setValidSubmission(true);
  
  };
  return (
    <div>
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
               <form className="w-[290px] h-[330px]" onSubmit={HanldeSubmit}>
                
                
                 <input onChange={(e) => setEmail(e.target.value)} onFocus={(e)=>setValidSubmission(true)} value={Email} type="email" placeholder="Adresse e-mail"  className= {`Inputsign my-3 mb-8 ${!validSubmission && "border-red-600 placeholder-red-600" }`}/>
                 {/* password */}
                 <PasswordInput label={"mot de passe"} value={Password} setValue={setPassword} isValid={validSubmission} setIsValid={setValidSubmission} />
                 {!validSubmission && <span className='text-red-600 text-xs ml-5 text-center'>Saisissez une adresse de courriel ou un mot de passe valide.</span>}
                

                 <div className="mt-4">
                 <Link to="/forgotPass" className=" text-seconadryColor font-Poppins"><u>Mot de passe oublié ?</u></Link> 
                 </div>
                 <button type="submit" className="w-full h-[52px] bg-seconadryColor mt-[35px] ">
                 <span className=" font-Poppins">Continuer</span> 
                 </button>
                 <div className="mt-4">
                  <span className=" font-Poppins">Vous n'avez pas de compte ? </span>
                 <Link to="/register" className=" text-seconadryColor font-Poppins"><u>Inscription</u></Link> 
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
