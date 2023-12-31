import profilePic from "../assets/profilePic.svg"
import docLibLogo from "../assets/docLibLogo.svg"
import Modal from "./Modal"
import { useState } from "react"

export default function Navbar() {
    const [isModalShown,setIsModalShown]=useState(false)

    const handleShowModal=()=>setIsModalShown(!isModalShown)
  return (
    
    <header className="container w-full mx-auto px-4 py-3">
    {/* header */}
    <nav className="flex items-center justify-between">
        {/* docLibLogo */}
        <img src={docLibLogo} alt="" className="w-[9rem] object-cover" />
        {/* userPic */}
        <div className="w-[5rem] h-[5rem] rounded-full relative border border-black" onClick={handleShowModal}>
                <img src={profilePic} alt="userPic" className="w-[100%] object-cover" />

                {/* our menu */}
                {
                  isModalShown && <Modal />
                }
                
        </div>
    </nav>
</header>
  )
}
