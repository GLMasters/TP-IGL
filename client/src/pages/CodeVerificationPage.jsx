import { useState } from 'react';
import docLibLogo from '../assets/docLibLogo.svg';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import {confirmVerificationCode} from "../actions/user"
import {useSelector,useDispatch} from "react-redux"
function CodeVerificationPage() {
  const [codeAuth, setCodeAuth] = useState('');
  const dispatch=useDispatch()
  const {success,error,loading,email}=useSelector(state => state.resetUserReducer)
  const submitCode=()=>{
    dispatch(confirmVerificationCode(codeAuth,))
  }
  return (
    <div className="contanier w-full mx-auto px-4 bg-white min-h-screen">
      {loading && <Spinner />}
      <header>
        <img src={docLibLogo} alt="docLibLogo" className="w-[9rem]" />
      </header>

      {/* verify my password */}
      <div className="absolute top-[10rem] right-[50%] translate-x-[50%] md:shadow-2xl rounded-3xl flex flex-col items-center max-w-md w-full p-4">
        <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">
          Vérifiez votre address e-mail
        </h3>
        <p className="text-center text-black">
          Veuillez consulter l'adresse e-mail {} pour obtenire le
          code de confirmation
        </p>
        <input
          type="text"
          className="Inputsign my-4 w-5/6"
          placeholder="Code de confirmation"
          value={codeAuth}
          onChange={(e) => setCodeAuth(e.target.value)}
        />
        {error && (
          <span className="text-red-600 text-xs ml-5 text-center">
            {error}
          </span>
        )}
        <button
          className="my-4 py-4 bg-seconadryColor w-5/6 text-black mb-5"
          onClick={submitCode}
        >
          Continuer
        </button>

        {/* retour */}
        <Link className="underline text-seconadryColor mb-5">retour</Link>
      </div>
    </div>
  );
}

export default CodeVerificationPage;
