import { useContext, useState } from "react"
import docLibLogo from "../assets/docLibLogo.svg"
import { Link, useLocation } from "react-router-dom"
import {resetPasswordContext} from "../context/resetPassContext"
import Spinner from "../components/Spinner"

function VerifyEmailScreen() {

  const {state,checkConfirmationCode,clearError} = useContext(resetPasswordContext)
  const {loading,errorMessage}=state
  const [codeAuth,setCodeAuth]=useState("")
  return (

    <div className="contanier w-full mx-auto px-4 bg-white min-h-screen">
    {loading && <Spinner />}
        <header>
                <img src={docLibLogo} alt="docLibLogo" className="w-[9rem]" />
        </header>

        {/* verify my password */}
        <div className="absolute top-[10rem] right-[50%] translate-x-[50%] md:shadow-2xl rounded-3xl flex flex-col items-center max-w-md w-full p-4">
                    <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">Vérifiez votre address e-mail</h3>
                    <p className="text-center text-black">Veuillez consulter l'adresse e-mail {state?.email} pour obtenire le code de confirmation</p>
                    <input type="text" className="Inputsign my-4 w-5/6" placeholder="Code de confirmation" value={codeAuth} onChange={(e)=>setCodeAuth(e.target.value)} onFocus={clearError} />
                    {errorMessage && <span className="text-red-600 text-xs ml-5 text-center">{errorMessage}</span>}
                    <button className="my-4 py-4 bg-seconadryColor w-5/6 text-black mb-5" onClick={()=>checkConfirmationCode()}>Continuer</button>

                    {/* retour */}
                    <Link className="underline text-seconadryColor mb-5">retour</Link>
        </div>
    </div>
  )
}

export default VerifyEmailScreen
