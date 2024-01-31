import { useState } from "react"
import docLibLogo from "../assets/docLibLogo.svg"
import hidePass from "../assets/hidepass.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {updateUserPassword} from "../actions/user"
import Spinner from "../components/Spinner"
import { USER_FAIL } from "../constants/userActions"
function ResetPasswordPage() {
    const dispatch=useDispatch()
    const {success,error,loading}=useSelector(state => state.resetUserReducer)
    const [data,setData]=useState({
      pass:"",
      confirmPass:""
    })

    const change=(e)=>{
      setData({
        ...data,
        [e.target.name]:e.target.value
      })
    }
    const [isVisible,setIsVisible]=useState(false)
    const handleVisible=(e)=>{
        e.preventDefault()
        setIsVisible(!isVisible)
    }
    const submitPass=()=>{
      if(data.pass != data.confirmPass) return dispatch({
        type:USER_FAIL,
        payload:"vérifiez votre nouveau mot de pass"
      })
      dispatch(updateUserPassword(data.pass))
    }


  return (
    <div className="contanier w-full mx-auto px-4 bg-white min-h-screen">
    {loading && <Spinner />}
        <header>
                <img src={docLibLogo} alt="docLibLogo" className="w-[9rem]" />
        </header>

        {/* verify my password */}
        <div className="absolute top-[10rem] right-[50%] translate-x-[50%] md:shadow-2xl rounded-3xl flex flex-col items-center max-w-md w-full p-4">
                    <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">Modifiez votre mot de pass</h3>
                    <p className="text-center my-3 text-black">Saisissez un nouveau mot de passe ci-dessous pour modifier votre mot de passe.</p>
                    <div className='relative mx-auto w-5/6'>
                    <input type={isVisible ? "text" :"password"} onChange={change} className='Inputsign my-6' placeholder="Nouveau mot de pass" name="pass" />
                    <button onClick={handleVisible} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
                    <img src={hidePass} alt="Show/Hide Password" className="h-7 w-7"/>
                    </button>

                    </div>

                    <div className='relative mx-auto w-5/6'>
                        <input type={isVisible ? "text" :"password"} onChange={change} className='Inputsign my-6' placeholder="Confirmez votre mot de pass" name="confirmPass" />
                        <button onClick={handleVisible} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
                        <img src={hidePass} alt="Show/Hide Password" className="h-7 w-7"/>
                    </button>

                    </div>
     {/* error */}
     {error && (
      <span className="text-red-600 text-sm ml-5 text-center">
        {error}
      </span>
    )}
                    <button className="my-4 py-4 bg-seconadryColor w-5/6 text-black" onClick={submitPass}>Continuer</button>

                    {/* retour */}
                    <Link className="underline text-seconadryColor">retour</Link>
        </div>
    </div>
  )
}

export default ResetPasswordPage
