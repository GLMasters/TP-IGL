import { useEffect, useState } from "react"
import ModerateurItem from "./ModerateurItem"
import AddModeratorPopUp from "./AddModeratorPopUp"
import { useSelector, useDispatch } from "react-redux"
import {deleteModerators, getModerators } from "../actions/admin"
import Spinner from "./Spinner"


function ModerateurList() {
  const [popUp,setPopUp]=useState(false)
  const [checkedMods,setCheckedMods]=useState([])
  const [mod_id,setMod_id]=useState("")
  const [isEditMode,setIsEditMode]=useState(false)
  const {success,error,moderators,loading}=useSelector(state => state.adminReducer)
  const dispatch = useDispatch() ;
  useEffect(()=>{
    //fetch Moderator List
    dispatch(getModerators())
    
  },[])

  const delMods = ()=>{
    dispatch(deleteModerators(checkedMods)) ;
  }


  return (
    <div className='container w-full mx-auto px-5 my-5'>
      {loading && <Spinner/>}
    {popUp && <AddModeratorPopUp mod_id={mod_id} setPopUp={setPopUp} isEdit={isEditMode} />}
        <div className='flex items-center justify-between'>
            <h3 className="text-black">Liste de modérateurs :</h3>
            <div className='flex gap-2'>
                <button className='rounded-md bg-primaryColor px-5 py-3 text-white' onClick={()=>{setPopUp(true)
                setIsEditMode(false)
                }}>Ajouter</button>
                <button className='bg-gray rounded-md px-5 py-3 border' disabled={!checkedMods.length} onClick={delMods}>Supprimer</button>
            </div>
        </div>
        {/* listing moderators */}
        {moderators.length ?
        <div className='w-full mt-8'>
        <div className='font-semibold hidden lg:grid lg:grid-cols-5'>
            <h4 className="ml-14 text-black">Nom Complet</h4>
            <h4 className="text-black">Email</h4>
            <h4 className="text-black">Téléphone</h4>
            <h4 className="text-black">Adresse</h4>
          </div>

          {moderators.map(mod=>(
            <ModerateurItem setIsEdit={setIsEditMode} isEdit={isEditMode} setCheckedMods={setCheckedMods} checkedMods={checkedMods} moderatorName={mod.name} moderatorAdr={mod.address} moderatorEmail={mod.email} moderatorPhone={mod.phone} moderatorId={mod.id} isPop={popUp} setPop={setPopUp} setMod_id={setMod_id} key={mod.id}/>
          ))}

          {/* <ModerateurItem setCheckedMods={setCheckedMods} checkedMods={checkedMods} moderatorName={"Baitache Sami"} moderatorAdr={"Boumerdas ,Adrar"} moderatorEmail={"b_sami@esi.dz"} moderatorPhone={"21366784532"} moderatorId={"1"} isPop={popUp} setPop={setPopUp} setMod_id={setMod_id} />
          <ModerateurItem setCheckedMods={setCheckedMods} checkedMods={checkedMods} moderatorName={"Baitache Sami"} moderatorAdr={"Boumerdas ,Adrar"} moderatorEmail={"b_sami@esi.dz"} moderatorPhone={"21366784532"} moderatorId={"2"} isPop={popUp} setPop={setPopUp} setMod_id={setMod_id} /> */}
        </div>
         : <p className="text-center">no modérateurs pour le moments</p> }
    </div>
  )
}

export default ModerateurList
