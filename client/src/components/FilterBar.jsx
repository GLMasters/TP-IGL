import { useRef, useState } from "react"
import AddSvg from "../assets/addSvg.svg"
import DateInput from "./DateInput"

function FilterBar({visible,setVisible}) {
    const [auts,setAuts]=useState([])
    const [institutions,setInstitutions]=useState([])
    const [motsC,setMotsC]=useState([])
    const autRef=useRef()
    const motCleRef=useRef()
    const instRef=useRef()
    const add=(e)=>{
        
        switch (e.target.alt){
            case "auts":
                if(!autRef.current.value) return;
                setAuts([...auts,autRef.current.value])
                autRef.current.value=""
                break;
            case "motscles":
                if(!motCleRef.current.value) return;
                setMotsC([...motsC,motCleRef.current.value])
                motCleRef.current.value=""
                break;
            case "institutions":
                if(!instRef.current.value) return;
                setInstitutions([...institutions,instRef.current.value])
                instRef.current.value=""
                break;
        
            default:
                break;
        }
    }

    const handleShowFilterBar=()=>{
        setVisible(!visible)
    }
  return (
    <div className={`fixed bg-primaryColor bottom-0 top-28 -mt-4 z-20 max-w-lg md:max-w-md w-full shadow-xl px-4 py-10 flex flex-col text-white ${!visible && "-translate-x-[100%]"} transition-all .6s ease-in-out h-screen overflow-y-scroll scrollbar2`} >
    {
        /* mots clés */
        <div className="flex flex-col gap-4 my-4">
            <h3 className="text-white font-bold">Mots clés</h3>
            <div className="w-3/5 p-5 bg-[#C77DFA] rounded-md max-h-32 overflow-y-scroll">{motsC.length ? <ul>{
                motsC.map(mot => <li>{mot}</li>)
            }</ul> :"Ajoutez des mots clés"}</div>
            <div className="flex justify-between items-center bg-white rounded-full w-4/5 relative">
            <input type="text" ref={motCleRef} className="w-full bg-inherit text-black focus:outline-primaryColor rounded-full py-3 px-5" placeholder="Ajoutez ..." />
            <img alt="motscles" src={AddSvg} onClick={add} className="w-8 h-8 absolute right-2" />
            </div>
        </div>
    }

    {/* auteurs */}
        <div className="flex flex-col gap-4 my-6">
            <h3 className="text-white font-bold">Auteurs</h3>
            <div className="w-3/5 p-5 bg-[#C77DFA] rounded-md max-h-32 overflow-y-scroll">{auts.length ? <ul>{
                auts.map(aut => <li>{aut}</li>)
            }</ul> :"Ajoutez des auteurs ..."}</div>
            <div className="flex justify-between items-center bg-white rounded-full w-4/5 relative">
            <input type="text" ref={autRef} className="w-full bg-inherit text-black focus:outline-primaryColor rounded-full py-3 px-5" placeholder="Ajoutez ..." />
            <img src={AddSvg} onClick={add} alt="auts" className="w-8 h-8 absolute right-2" />
            </div>
        </div>

        {/* institutions */}
        <div className="flex flex-col gap-4 border-b border-b-primaryColor">
            <h3 className="text-white font-bold">Institutions</h3>
            <div className="w-3/5 p-5 bg-[#C77DFA] rounded-md max-h-32 overflow-y-scroll">{institutions.length ? <ul>{
                institutions.map(ins => <li>{ins}</li>)
            }</ul> :"Ajoutez des institutions"}</div>
            <div className="flex justify-between items-center bg-white rounded-full w-4/5 relative">
            <input type="text" ref={instRef} className="w-full bg-inherit text-black focus:outline-primaryColor rounded-full py-3 px-5" placeholder="Ajoutez ..." />
            <img alt="institutions" onClick={add} src={AddSvg} className="w-8 h-8 absolute right-2" />
            </div>
        </div>

        {/* période */}
        <div className="flex flex-col gap-4 my-5">
            <h3 className="text-white font-bold">Période</h3>
            <div className="flex gap-3 items-center">
                    <DateInput />
                    <span className="text-white font-bold">to</span>
                    <DateInput />
            </div>
        </div>

        {/* buttons */}
        <div className="flex justify-around mb-28 mt-10">
            <button className="btn2 bg-white text-black pl-8 pr-5 py-3" onClick={handleShowFilterBar}>Annuler</button>
            <button className="btn1 bg-white text-black pl-5 pr-8 py-3">Valider</button>
        </div>
    </div>   

  )
}

export default FilterBar
