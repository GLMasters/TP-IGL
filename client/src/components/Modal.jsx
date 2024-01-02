import { Link } from "react-router-dom"
export default function Modal() {
  return (
    <div className="px-2 py-8 rounded-xl shadow-xl bg-white text-lg absolute top-20 right-[10%] min-w-max">
    
            <Link to="/editUserPassword"><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black">Modifier mot de passe</p></Link>
            <Link to="/login" className="px-5 py-3 text-black">Se deconnecter</Link>
    </div>
  )
}