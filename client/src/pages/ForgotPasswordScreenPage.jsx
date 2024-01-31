import docLibLogo from '../assets/docLibLogo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {checkIsEmailExist} from "../actions/user"
import Spinner from '../components/Spinner';
import {useSelector,useDispatch} from "react-redux"
import Footer from '../components/Footer';
function ForgotPasswordScreen() {
  const [email,setEmail]=useState("")
  const navigate = useNavigate();

  const dispatch=useDispatch()
  const {success,error,loading}=useSelector(state => state.userReducer)
  const enterEmail=(e)=>{
      setEmail(e.target.value)
  }


  const checkMail=()=>{
      dispatch(checkIsEmailExist())
  }


  useEffect(() => {
    if (success) navigate('/verifyEmail');
  }, [success]);
  return (
    <>
    <div className="contanier w-full mx-auto px-4 bg-white min-h-screen">
      {loading && <Spinner />}
      <header>
        <img src={docLibLogo} alt="docLibLogo" className="w-[9rem]" />
      </header>

      {/* verify my password */}
      <div className="absolute top-[10rem] right-[50%] translate-x-[50%] md:shadow-2xl rounded-3xl flex flex-col items-center max-w-md w-full p-4">
        <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">
          Mot de passe oublié ?
        </h3>
        <p className="text-center text-black">
          Saisissez votre adresse e-mail et nous vous enverrons des instructions
          pour réinitialiser votre mot de passe.
        </p>
        <input
          type="email"
          className={`Inputsign my-4 w-5/6 ${
            error && 'border-red-600 text-red-600'
          } `}
          placeholder="Address e-mail"
          value={email}
          onChange={enterEmail}
        />
        {/* error */}
        {error && (
          <span className="text-red-600 text-sm ml-5 text-center">
            {error}
          </span>
        )}
        <button
          className="my-4 py-4 bg-seconadryColor w-5/6 text-black mb-5"
          onClick={checkMail}
        >
          Continuer
        </button>

        {/* retour */}
        <Link to={'/login'} className="underline text-seconadryColor mb-5">
          retour
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ForgotPasswordScreen;
