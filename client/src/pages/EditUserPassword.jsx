import AuthNavbar from "../components/AuthNavbar"
import docLibLogo from "../assets/docLibLogo.svg"
import PasswordInput from "../components/PasswordInput"
import { useState } from "react"
function EditUserPassword() {
    const [oldpass,setoldpass] = useState("");
    const [pass,setPass]=useState("")
    const [isValid,setIsValid]=useState(true)
    const [confirmedPass,setConfirmedPass]=useState("")

    const submitHandler=(e)=>{
        e.preventDefault()
        if(pass != confirmedPass || !(pass.trim().length > 8)) {
            setIsValid(false)
            return;
        }

    }
  return (
    <div className="container w-full mx-auto bg-white px-4 min-h-screen">
            {/* form */}
            <form onSubmit={submitHandler} className="max-w-md w-full shadow-none mt-44 lg:mt-0 lg:shadow-xl rounded-xl flex flex-col items-center gap-6 px-12 py-10 mx-auto">
                    {/* docLibLog */}
                    <img src={docLibLogo} alt="docLibLogo" className="w-[10rem] object-cover" />
                    <h3 className="font-Lora font-bold italic text-black">Modifier votre mot de passe</h3>

                    <p className="text-center font-Poppins text-black">Saisissez un nouveau mot de passe ci-dessous pour modifier votre mot de passe.</p>
                    {/* ancien mot de passe */}
                    <PasswordInput value={oldpass} setValue={setoldpass} setIsValid={setIsValid} isValid={isValid} label={"Ancien mot de passe"}  />
                        {/* mot de passe */}
                    <PasswordInput value={pass} setValue={setPass} setIsValid={setIsValid} isValid={isValid} label={"Nouveau mot de passe"}  />
                        {/* confirmer mot de passe */}
                    <PasswordInput value={confirmedPass} setValue={setConfirmedPass} isValid={isValid} setIsValid={setIsValid} label={"Confirmer votre mot de passe"} />

                    {!isValid && <span className="text-red-600 text-xs ml-5 text-center">vérifier votre mot de passe !</span>}

                    <button type="submit" className="w-full py-4 bg-seconadryColor rounded-md text-black">continuer</button> 
                    </form>
    </div>
  )
}

export default EditUserPassword
