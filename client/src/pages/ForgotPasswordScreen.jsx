import docLibLogo from "../assets/docLibLogo.svg"
import { Link, useNavigate } from "react-router-dom"
import {resetPasswordContext} from "../context/resetPassContext"
import { useContext, useEffect } from "react"
import Spinner from "../components/Spinner"
function ForgotPasswordScreen() {
  //use resetPassContext
  const {state,checkEmail,enterEmail,clearError} = useContext(resetPasswordContext)
  const {email,errorMessage,loading,success}=state
  const navigate=useNavigate()

  useEffect(()=>{
    if(success) navigate("/verifyEmail")
  },[success])
  return (
    <div className="contanier w-full mx-auto px-4 bg-white min-h-screen">
    {loading && <Spinner />}
        <header>
                <img src={docLibLogo} alt="docLibLogo" className="w-[9rem]" />
        </header>

        {/* verify my password */}
        <div className="absolute top-[10rem] right-[50%] translate-x-[50%] md:shadow-2xl rounded-3xl flex flex-col items-center max-w-md w-full p-4">
                    <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">Mot de passe oublié ?</h3>
                    <p className="text-center text-black">Saisissez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.</p>
                    <input type="email" className={`Inputsign my-4 w-5/6 ${errorMessage && "border-red-600 text-red-600"} `} placeholder="Address e-mail" value={email} onChange={enterEmail} onFocus={clearError} />
                    {/* error */}
                    {errorMessage && <span className="text-red-600 text-sm ml-5 text-center">{errorMessage}</span> }
                    <button className="my-4 py-4 bg-seconadryColor w-5/6 text-black mb-5" onClick={checkEmail}>Continuer</button>

                    {/* retour */}
                    <Link to={""} className="underline text-seconadryColor mb-5">retour</Link>
        </div>
    </div>
  )
}

export default ForgotPasswordScreen
