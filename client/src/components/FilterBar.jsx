import { useState } from "react";
import AddSvg from "../assets/addSvg.svg"
import DateInput from "./DateInput"
import { IoIosCloseCircleOutline } from "react-icons/io";
function FilterBar({visible,setVisible}) {
    
    const handleShowFilterBar=()=>{
        setVisible(!visible)
    }
  return (
    <div className={`fixed bottom-0 bg-white z-20 h-screen max-w-sm w-full lg:static lg:z-0 lg:h-full shadow-xl px-4 py-10 flex flex-col text-white ${!visible && "-translate-x-[100%]"} transition-all .6s ease-in-out`} >
    <IoIosCloseCircleOutline color="black" size={20} className="absolute top-6 right-3 lg:hidden" onClick={handleShowFilterBar} />
    {
        /* mots clés */
        <div className="flex flex-col gap-4 border-b border-b-primaryColor pb-3">
            <h3 className="text-primaryColor font-bold">Mots clés</h3>
            <div className="w-3/5 p-5 bg-[#C77DFA] rounded-md">ajouter des mots clés</div>
            <div className="flex justify-between items-center bg-white rounded-2xl w-4/5 py-2 px-4">
            <input className="w-full bg-inherit outline-none h-full" placeholder="ajoutez ..." />
            <img src={AddSvg} className="w-8 h-8" />
            </div>
        </div>
    }

    {/* auteurs */}
        <div className="flex flex-col gap-4 border-b border-b-primaryColor pb-3 my-5">
            <h3 className="text-primaryColor font-bold">Auteurs</h3>
            <div className="w-3/5 p-5 bg-[#C77DFA] rounded-md">ajouter des auteurs</div>
            <div className="flex justify-between items-center bg-white rounded-2xl w-4/5 py-2 px-4">
            <input className="w-full bg-inherit outline-none h-full" placeholder="ajoutez ..." />
            <img src={AddSvg} className="w-8 h-8" />
            </div>
        </div>

        {/* institutions */}
        <div className="flex flex-col gap-4 border-b border-b-primaryColor pb-3 my-5">
            <h3 className="text-primaryColor font-bold">Institutions</h3>
            <div className="w-3/5 p-5 bg-[#C77DFA] rounded-md">ajouter des institutions</div>
            <div className="flex justify-between items-center bg-white rounded-2xl w-4/5 py-2 px-4">
            <input className="w-full bg-inherit outline-none h-full" placeholder="ajoutez ..." />
            <img src={AddSvg} className="w-8 h-8" />
            </div>
        </div>

        {/* période */}
        <div className="flex flex-col gap-4 my-5">
            <h3 className="text-primaryColor font-bold">Période</h3>
            <div className="flex gap-3 items-center">
                    <DateInput />
                    <span className="text-black font-bold">to</span>
                    <DateInput />
            </div>
        </div>
    </div>   

  )
}

export default FilterBar
