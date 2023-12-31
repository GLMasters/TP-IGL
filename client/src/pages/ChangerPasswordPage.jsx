import { useState } from "react"
import docLibLogo from "../assets/docLibLogo.svg"
import hidePass from "../assets/hidepass.png"
import { Link } from "react-router-dom"
function VerifyEmailScreen() {
    const [isVisible,setIsVisible]=useState(false)
    const handleVisible=(e)=>{
        e.preventDefault()
        setIsVisible(!isVisible)
    }
  return (
    <div className="contanier w-full mx-auto px-4 bg-white min-h-screen">
        <header>
                <img src={docLibLogo} alt="docLibLogo" className="w-[9rem]" />
        </header>

        {/* verify my password */}
        <div className="absolute top-[10rem] right-[50%] translate-x-[50%] md:shadow-2xl rounded-3xl flex flex-col items-center max-w-md w-full p-4">
                    <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">Modifiez votre mot de pass</h3>
                    <p className="text-center my-3 text-black">Saisissez un nouveau mot de passe ci-dessous pour modifier votre mot de passe.</p>
                    <div className='relative mx-auto w-5/6'>
                    <input type={isVisible ? "text" :"password"} className='Inputsign my-6' placeholder="Nouveau mot de pass" />
                    <button onClick={handleVisible} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
                    <img src={hidePass} alt="Show/Hide Password" className="h-7 w-7"/>
                    </button>

                    </div>

                    <div className='relative mx-auto w-5/6'>
                        <input type={isVisible ? "text" :"password"} className='Inputsign my-6' placeholder="Confirmez votre mot de pass" />
                        <button onClick={handleVisible} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
                        <img src={hidePass} alt="Show/Hide Password" className="h-7 w-7"/>
                    </button>

                    </div>
    
                    <button className="my-4 py-4 bg-seconadryColor w-5/6 text-black">Continuer</button>

                    {/* retour */}
                    <Link className="underline text-seconadryColor">retour</Link>
        </div>
    </div>
  )
}

export default VerifyEmailScreen
