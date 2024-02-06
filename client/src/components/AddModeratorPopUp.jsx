import { IoIosCloseCircleOutline } from "react-icons/io";
import { addModerator,editModerator } from "../actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
function AddModeratorPopUp({
    setPopUp,
    isEdit,
    mod_id
}) {
  const dispatch=useDispatch()
  const {success,error}=useSelector(state => state.adminReducer)

  const [formData,setFormData]=useState({
    nomComplet:"",
    adr:"",
    phone:"",
    email:""
  })

  const mutateInputs=(e)=>{
    switch (e.target.name) {
      case "email":
        setFormData({
          ...formData,
          email:e.target.value
        })
        break;
      case "phone":
        setFormData({
          ...formData,
          phone:e.target.value
        })
        break;

      case "adr":
        setFormData({
          ...formData,
          adr:e.target.value
        })
        break;

      case "nom":
        setFormData({
          ...formData,
          nomComplet:e.target.value
        })
        break;
    }
  }


  const handleModerator=()=>{
      isEdit ? dispatch(editModerator(formData,mod_id)) : dispatch(addModerator(formData))
      setPopUp(false)
  }
  
  return (
    <div className="bgGradient1 fixed z-10 top-0 left-0 w-full bottom-0 flex justify-center items-center">
      <div className="max-w-md shadow-lg rounded-md bg-primaryColor flex flex-wrap py-10 px-6 relative">
        <IoIosCloseCircleOutline size={25} color="white" className="absolute top-4 right-4 white mb-4" onClick={()=>setPopUp(false)} />
        <div className="inputGroup text-white flex gap-5 items-center">
          <label>Nom complet</label>
          <input
            onChange={mutateInputs}
            name="nom"
            type="text"
            placeholder="Nom complet"
            className="rounded-full py-4 px-4 outline-none text-black"
          />
        </div>
        {!isEdit &&  <div className="inputGroup my-4 text-white flex gap-5 items-center">
        <label>Email</label>
        <input  onChange={mutateInputs} name="email" type="text" placeholder="Email" className="rounded-full py-4 px-4 outline-none text-black" />
      </div>}
       
        <div className="inputGroup my-4 text-white flex gap-5 items-center">
          <label>Téléphone</label>
          <input type="text" onChange={mutateInputs} name="phone" placeholder="Téléphone" className="rounded-full py-4 px-4 outline-none text-black" />
        </div>
        <div className="inputGroup my-4 text-white flex gap-5 items-center">
          <label>Address</label>
          <input
            onChange={mutateInputs}
            name="adr"
            type="text"
            placeholder="Address"
            className="rounded-full py-4 px-4 outline-none text-black"
          />
        </div>
        <button className="bg-gray rounded-lg px-6 text-center text-primaryColor pt-3 pb-2 mx-auto mt-5" onClick={handleModerator}>{isEdit ? "modifier" : "ajouter"}</button>
      </div>
    </div>
  );
}

export default AddModeratorPopUp;
