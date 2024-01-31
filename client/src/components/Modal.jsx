import { Link } from "react-router-dom"
export default function Modal() {
  const isModerateur=true;
  const isAdmin=true
  return (
    <div className="px-2 py-8 rounded-xl shadow-xl bg-white text-lg absolute top-20 right-[10%] min-w-max">
    
            <Link to="/editUserPassword"><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor">Modifier mot de passe</p></Link>
            {isAdmin ?<Link to="/admin" ><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor">Dashboard admin</p> </Link> : null}
            {isModerateur ?<Link to={`/moderator/{_id}`} ><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor">Dashboard modérateur</p></Link>:null}
           <Link to="/login" ><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor">Se deconnecter</p></Link>
    </div>
  )
}
