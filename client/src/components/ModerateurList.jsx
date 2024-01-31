import { useEffect, useState } from "react"
import ModerateurItem from "./ModerateurItem"
import AddModeratorPopUp from "./AddModeratorPopUp"
function ModerateurList() {
  const [popUp,setPopUp]=useState(false)


  useEffect(()=>{
    //fetch Moderator List
  },[])


  return (
    <div className='container w-full mx-auto px-5 my-5'>
    {popUp && <AddModeratorPopUp setPopUp={setPopUp} />}
        <div className='flex items-center justify-between'>
            <h3>Liste de modérateurs :</h3>
            <div className='flex gap-2'>
                <button className='rounded-md bg-primaryColor px-5 py-3 text-white' onClick={()=>setPopUp(true)}>Ajouter</button>
                <button className='bg-gray rounded-md px-5 py-3 border'>Supprimer</button>
            </div>
        </div>
        {/* listing moderators */}
        <div className='w-full mt-8'>
        <div className='font-semibold hidden lg:grid lg:grid-cols-5'>
            <h4 className="ml-14">Nom Complet</h4>
            <h4>Email</h4>
            <h4>Téléphone</h4>
            <h4>Adresse</h4>
          </div>

          <ModerateurItem moderatorName={"Baitache Sami"} moderatorAdr={"Boumerdas ,Adrar"} moderatorEmail={"b_sami@esi.dz"} moderatorPhone={"21366784532"} />
          <ModerateurItem moderatorName={"Baitache Sami"} moderatorAdr={"Boumerdas ,Adrar"} moderatorEmail={"b_sami@esi.dz"} moderatorPhone={"21366784532"} />
        </div>
    </div>
  )
}

export default ModerateurList
