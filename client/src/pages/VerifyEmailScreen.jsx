import docLibLogo from "../assets/docLibLogo.svg"
import { Link } from "react-router-dom"
function VerifyEmailScreen() {

  return (
    <div className="contanier w-full mx-auto px-4">
        <header>
                <img src={docLibLogo} alt="docLibLogo" className="w-[9rem]" />
        </header>

        {/* verify my password */}
        <div className="absolute top-[10rem] right-[50%] translate-x-[50%] md:shadow-2xl rounded-3xl flex flex-col items-center max-w-md w-full p-4">
                    <h3 className="font-Lora font-bold italic mt-4 mb-8">Vérifiez votre address e-mail</h3>
                    <p className="text-center">Veuillez consulter l'adresse e-mail lm_merabet@esi.dz pour obtenire le code de confirmation</p>
                    <input type="text" className="Inputsign my-4 w-5/6" placeholder="Code de confirmation" />
                    <button className="my-4 py-4 bg-seconadryColor w-5/6">Continuer</button>

                    {/* retour */}
                    <Link className="underline text-seconadryColor">retour</Link>
        </div>
    </div>
  )
}

export default VerifyEmailScreen
