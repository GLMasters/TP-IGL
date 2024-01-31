import { IoIosCloseCircleOutline } from "react-icons/io";
function AddModeratorPopUp({
    setPopUp
}) {

    const addModerator=()=>{
        setPopUp(false)
    }
  return (
    <div className="bgGradient1 fixed z-10 top-0 left-0 w-full bottom-0 flex justify-center items-center">
      <div className="max-w-md shadow-lg rounded-md bg-primaryColor flex flex-wrap py-10 px-6 relative">
        <IoIosCloseCircleOutline size={25} color="white" className="absolute top-4 right-4 white mb-4" onClick={()=>setPopUp(false)} />
        <div className="inputGroup text-white flex gap-5 items-center">
          <label>Nom complet</label>
          <input
            type="text"
            placeholder="Nom complet"
            className="rounded-full py-4 px-4 outline-none text-black"
          />
        </div>
        <div className="inputGroup my-4 text-white flex gap-5 items-center">
          <label>Email</label>
          <input type="text" placeholder="Email" className="rounded-full py-4 px-4 outline-none text-black" />
        </div>
        <div className="inputGroup my-4 text-white flex gap-5 items-center">
          <label>Téléphone</label>
          <input type="text" placeholder="Téléphone" className="rounded-full py-4 px-4 outline-none text-black" />
        </div>
        <div className="inputGroup my-4 text-white flex gap-5 items-center">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            className="rounded-full py-4 px-4 outline-none text-black"
          />
        </div>
        <button className="bg-gray rounded-lg px-6 text-center text-primaryColor pt-3 pb-2 mx-auto mt-5" onClick={addModerator}>add</button>
      </div>
    </div>
  );
}

export default AddModeratorPopUp;
