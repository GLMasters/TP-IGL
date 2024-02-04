import { useNavigate } from 'react-router-dom';
import docLibLogo from '../assets/docLibLogo.svg';
import PasswordInput from '../components/PasswordInput';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../actions/user';
import Spinner from '../components/Spinner';
function EditUserPassword() {
  const [oldpass, setoldpass] = useState('');
  const [pass, setPass] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [confirmedPass, setConfirmedPass] = useState('');
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {error,success,loading}=useSelector(state => state.resetUserReducer)
  const submitHandler = (e) => {
    e.preventDefault();
    if (pass != confirmedPass || !(pass.trim().length > 5)) {
      setIsValid(false);
      return;
    }
    //add action 
    dispatch(updateUserPassword(oldpass,pass))
  };

  const navigateBack=()=>{
      navigate(-1)
  }
  useEffect(()=>{
    if(success) navigate("/")
  },[success])

  return (
    <>
    <div className="container w-full mx-auto bg-white px-4 min-h-screen">
    {loading && <Spinner />}
      {/* form */}
      <form
        onSubmit={submitHandler}
        className="max-w-md w-full shadow-none mt-44 lg:mt-0 lg:shadow-xl rounded-xl flex flex-col items-center gap-6 px-12 py-10 mx-auto"
      >
        {/* docLibLog */}
        <img
          src={docLibLogo}
          alt="docLibLogo"
          className="w-[10rem] object-cover"
        />
        <h3 className="font-Lora font-bold italic text-black">
          Modifier votre mot de passe
        </h3>

        <p className="text-center font-Poppins text-black">
          Saisissez un nouveau mot de passe ci-dessous pour modifier votre mot
          de passe.
        </p>
        {/* ancien mot de passe */}
        <PasswordInput
          value={oldpass}
          setValue={setoldpass}
          setIsValid={setIsValid}
          isValid={isValid}
          label={'Ancien mot de passe'}
        />
        {/* mot de passe */}
        <PasswordInput
          value={pass}
          setValue={setPass}
          setIsValid={setIsValid}
          isValid={isValid}
          label={'Nouveau mot de passe'}
        />
        {/* confirmer mot de passe */}
        <PasswordInput
          value={confirmedPass}
          setValue={setConfirmedPass}
          isValid={isValid}
          setIsValid={setIsValid}
          label={'Confirmer votre mot de passe'}
        />

        {!isValid && (
          <span className="text-red-600 text-xs ml-5 text-center">
            vérifier votre mot de passe !
          </span>
        )}
        {!error && (
          <span className="text-red-600 text-xs ml-5 text-center">
            {error}
          </span>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-seconadryColor rounded-md text-black"
        >
          continuer
        </button>
        <p className='text-seconadryColor underline text-center' onClick={navigateBack}>retour</p>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default EditUserPassword;
