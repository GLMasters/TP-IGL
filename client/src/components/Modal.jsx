import { Link } from "react-router-dom"
export default function Modal() {
  const isModerateur=true;
  const isAdmin=true
  return (
    <div className="px-2 py-8 rounded-xl shadow-xl bg-white text-lg absolute top-20 right-[10%] min-w-max z-30">
    
            <Link to="/editUserPassword"><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black">Modifier mot de passe</p></Link>
            {isAdmin ?<Link to="/admin" className="px-5 py-3 text-black">Dashboard admin</Link> : null}
            {isModerateur ?<Link to={`/moderator/{_id}`} className="px-5 py-3 text-black">Dashboard modérateur</Link>:null}
           <Link to="/login" className="px-5 py-3 text-black">Se deconnecter</Link>
    </div>
  )
}
