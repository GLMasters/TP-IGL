import AuthNavbar from "../components/AuthNavbar"
import docLibLogo from "../assets/docLibLogo.svg"
import PasswordInput from "../components/PasswordInput"
import { useState } from "react"
function EditUserPassword() {
    const [pass,setPass]=useState("")
    const [isValid,setIsValid]=useState(true)
    const [confirmedPass,setConfirmedPass]=useState("")

    const submitHandler=(e)=>{
        e.preventDefault()
        if(pass != confirmedPass || !pass.trim().length < 8) {
            setIsValid(false)
            return;
        }

    }
  return (
    <div className="container w-full mx-auto bg-white px-4">
            {/* form */}
            <form onSubmit={submitHandler} className="max-w-md w-full shadow-none mt-44 lg:mt-0 lg:shadow-xl rounded-xl flex flex-col items-center gap-6 px-12 py-10 mx-auto">
                    {/* docLibLog */}
                    <img src={docLibLogo} alt="docLibLogo" className="w-[10rem] object-cover" />
                    <h3 className="font-Lora font-bold italic">Modifier votre mot de passe</h3>

                    <p className="text-center font-Poppins">Saisissez un nouveau mot de passe ci-dessous pour modifier votre mot de passe.</p>
                        {/* mot de passe */}
                    <PasswordInput value={pass} setValue={setPass} setIsValid={setIsValid} isValid={isValid} label={"Nouveau mot de passe"}  />
                        {/* confirmer mot de passe */}
                    <PasswordInput value={confirmedPass} setValue={setConfirmedPass} isValid={isValid} setIsValid={setIsValid} label={"Confirmer votre mot de passe"} />

                    {!isValid && <span className="text-red-600 text-xs ml-5 text-center">vérifier votre mot de passe !</span>}

                    <button type="submit" className="w-full py-4 bg-seconadryColor rounded-md">continuer</button> 
                    </form>
    </div>
  )
}

export default EditUserPassword
