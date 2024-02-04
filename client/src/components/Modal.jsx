import { Link, useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { logout } from "../actions/user";
import { useEffect, useState } from "react";


export default function Modal() {
  const [isModerateur, setIsModerator] = useState(false) ;
  const [isAdmin, setIsAdmin] = useState(false) ;

  
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  const {userInfo} = useSelector(state=>state.userReducer) ;
  
  const logoutFunction = ()=>{

    dispatch(logout()) ;
  }

  useEffect(()=>{
  
      switch(userInfo.role_id){
        case 1:
          setIsAdmin(false) ;
          setIsModerator(false);
          break ;
        case 2:
          setIsAdmin(false) ;
          setIsModerator(true) ;
          break ;
        case 3:
          setIsAdmin(true);
          setIsModerator(false) ;
          break ;
      }
    

  }, [userInfo]) ;

  return (
    <div className="px-2 py-8 rounded-xl shadow-xl bg-white text-lg absolute top-20 right-[10%] min-w-max">
    
            <Link to="/editUserPassword"><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor">Modifier mot de passe</p></Link>
            {isAdmin ?<Link to="/admin" ><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor">Dashboard admin</p> </Link> : null}
            {(isModerateur || isAdmin) ?<Link to={`/moderator/{_id}`} ><p className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor">Dashboard modérateur</p></Link>:null}
           <p onClick={logoutFunction} className="text-lg px-5 py-3 rounded-xl block mb-5 text-black hover:bg-seconadryColor cursor-pointer">Se deconnecter</p>
    </div>
  )
}
