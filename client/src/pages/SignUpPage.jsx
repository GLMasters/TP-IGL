import React, { useContext, useEffect, useState } from 'react';
import docLibLogo from '../assets/docLibLogo.svg';
import googleLogo from '../assets/googlelogo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from 'react-email-validator';
import PasswordInput from '../components/PasswordInput';
import Footer from '../components/Footer';
import { registerUser } from '../actions/user';
import {useSelector, useDispatch} from "react-redux"
import Spinner from "../components/Spinner"

function SignUpPage() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [ValidSubmission, setValidSubmission] = useState(true);

  const dispatch = useDispatch() ;
  const authState = useSelector(state=>state.userReducer) ;

  const navigate = useNavigate();
  const HanldeSubmit = async (e) => {
    e.preventDefault();
    if (
      !validate(Email) ||
      Password.trim().length < 8 === true ||
      Password != confirmPassword

    ) {
      setValidSubmission(false);
      return;
    }
    setValidSubmission(true);

    var data = {
      email: Email,
      password: Password,
    };

    dispatch(registerUser(data))
    

  };

  useEffect(()=>{
    if (authState.success)
      navigate("/verifyEmail")

  }, [authState.success])

  return (
    <>
      <div className="container w-full mx-auto px-4 bg-white lg:h-[1024px] md:h-[900px] h-[800px]">
        {authState.loading && <Spinner/>} 
        <header>
          <img
            src={docLibLogo}
            alt="docLibLogo"
            className="w-[9rem] object-cover"
          />
        </header>
        {
          /* signUpForm container */
          <div className="absolute top-[8rem] right-[50%] translate-x-[50%] max-w-lg w-full md:shadow-2xl rounded-3xl h-fit ">
            <form
              className="w-full px-4 py-4 flex flex-col items-center"
              onSubmit={HanldeSubmit}
            >
              {/* s'inscrire */}
              <div className="rounded-customRaduis1 bg-[#F8F9FA] px-16 py-3 font-bold font-Lora text-base my-10 shadow-xl text-black">
                S'inscrire
              </div>
              <h5 className="font-medium italic font-Lora pr-9 text-3xl text-center my-6 w-full mx-auto mb-10 text-black">
                Créez votre compte
              </h5>

              {/* inputs */}
              <div className="w-full mx-auto flex flex-col items-center px-4">
                <input
                  value={Email}
                  type="email"
                  className={`Inputsign my-3 ${
                    !ValidSubmission && 'border-red-600 placeholder-red-600'
                  }`}
                  placeholder="Adress e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => setValidSubmission(true)}
                />
                {/* Password */}
                <PasswordInput
                  value={Password}
                  setValue={setPassword}
                  label="password"
                  isValid={ValidSubmission}
                  setIsValid={setValidSubmission}
                />

                {/* confirmPassword */}
                <PasswordInput
                  value={confirmPassword}
                  setValue={setconfirmPassword}
                  label="confirm password"
                  setIsValid={setValidSubmission}
                  isValid={ValidSubmission}
                />

                {!ValidSubmission && (
                  <span className="text-red-600 text-xs ml-5 text-center ">
                    Saisissez une adresse de courriel ou un mot de passe valide.
                  </span>
                )}

                {authState.error && (
                  <span className="text-red-600 text-xs ml-5 text-center ">
                    {authState.error}
                  </span>
                )}

                {/* continuer button */}
                <button
                  className="w-full mt-6 bg-seconadryColor outline-none rounded-sm py-4 text-black"
                  type="submit"
                >
                  Continuer
                </button>
                <p className="w-full text-md my-4 text-black">
                  Vous avez déjà un compte DocLib ? Utilisez votre nom
                  d'utilisateur et votre mot de passe DocLib.{' '}
                  <Link to={'/login'} className="text-seconadryColor underline">
                    se connecter
                  </Link>
                </p>
                {/* Ou div */}

                <div className="flex items-center my-14 justify-center gap-2 w-full">
                  <div className=" w-5/12 border-b border-black rounded-sm" />
                  <span className="text-black">ou</span>
                  <div className="w-5/12 border-b border-black rounded-sm" />
                </div>
                {/* continuer avec google */}
                <button className="flex justify-left items-center w-full h-[52px] focus:border-primaryColor focus:outline-none border-black border-[0.5px] mb-10">
                  <img src={googleLogo} className="h-10 w-10 mr-3 ml-5" />
                  <span className="font-Poppins text-black">
                    {' '}
                    Continuer avec Google
                  </span>
                </button>
              </div>
            </form>
          </div>
        }
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;
