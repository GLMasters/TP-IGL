import React , {useState} from 'react'
import docLibLogo from "../assets/docLibLogo.svg"
import googleLogo from "../assets/googlelogo.svg"
import hidePass from "../assets/hidepass.png"
import { Link } from 'react-router-dom';
function SignUpPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handlePasswordToggle=()=>{
        setPasswordVisible(!passwordVisible)
    }
  return (
    <div className='container w-full mx-auto px-4'>

    <header>
            <img src={docLibLogo} alt='docLibLogo' className='w-[9rem] object-cover' />
    </header>
      {
        /* signUpForm container */
        <div className='absolute top-[8rem]  right-[50%] translate-x-[50%] max-w-lg w-full md:shadow-2xl rounded-3xl h-fit '>
                <form className='w-full px-4 py-4 flex flex-col items-center'>
                        {/* s'inscrire */}
                        <div className='rounded-customRaduis1 bg-[#F8F9FA] px-16 py-3 font-bold font-Lora text-base my-10 shadow-xl'>S'inscrire</div>
                        <h5 className="font-medium italic font-Lora pr-9 text-3xl text-center my-6 w-full mx-auto mb-10">Créez votre compte</h5>

                        
                  {/* inputs */}
                  <div className='w-full mx-auto flex flex-col items-center px-4'>
                  <input type='email' className='Inputsign my-3' placeholder='Adress e-mail' />
                    <div className='relative w-full mx-auto'>
                  <input type={passwordVisible ? "text" :"password"} className='Inputsign my-3' placeholder='Mot de passe' />
                  <button onClick={handlePasswordToggle} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
                  <img src={hidePass} alt="Show/Hide Password" className="h-7 w-7"/>
                </button>

                  </div>

                  {/* confirmPassword */}

                  <div className='relative w-full mx-auto'>
                  <input type={passwordVisible ? "text" :"password"} className='Inputsign my-3' placeholder='Confirmer votre mot de passe' />
                  <button onClick={handlePasswordToggle} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
                  <img src={hidePass} alt="Show/Hide Password" className="h-7 w-7"/>
                </button>

                  </div>
                  {/* continuer button */}
                  <button className='w-full mt-6 bg-seconadryColor outline-none rounded-sm py-4'>Continuer</button>
                  <p className='w-full text-md my-4'>Vous avez déjà un compte DocLib ? Utilisez votre nom d'utilisateur et votre mot de passe DocLib. <Link className='text-seconadryColor underline'>se connecter</Link></p>
  {/* Ou div */}

                  
  <div className='flex items-center my-14 justify-center gap-2 w-full'>
  <div className=' w-5/12 border-b border-black rounded-sm' />
  <span>ou</span>
  <div className='w-5/12 border-b border-black rounded-sm' />
</div>
                  {/* continuer avec google */}
                  <button  className="flex justify-left items-center w-full h-[52px] focus:border-primaryColor focus:outline-none border-black border-[0.5px] mb-10">
                  <img src={googleLogo} className="h-10 w-10 mr-3 ml-5" />
                  <span className="font-Poppins"> Continuer avec Google</span>
                 
               </button>
                      
               
               
               </div>
                  </form>
        </div>
      }
    </div>
  )
}

export default SignUpPage