import profilePic from '../assets/profilePic.svg';
import docLibLogo from '../assets/docLibLogo.svg';
import favIcon from '../assets/favIcon.svg';
import Modal from './Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isMenuShown,setIsMenuShwon]=useState(false)
  const handleShowModal = () => setIsModalShown(!isModalShown);

  const handleMenu=()=>{
      setIsMenuShwon(!isMenuShown)
  }


  return (
    <header className="container w-full mx-auto px-4 py-3">
      {/* header */}
      <nav className="flex items-center justify-between">
        {/* docLibLogo */}
        <img src={docLibLogo} alt="docLib Logo" className="w-[9rem] object-cover" />
<div className='flex gap-5'>
        <div className="hidden md:flex items-center gap-10">
          {/* a propos */}
          <Link to={'/about'} className="font-semibold text-black">
            A PROPOS
          </Link>
          {/* About */} 
          <Link className="font-semibold text-black">FAQ</Link>
          {/* favoris */}
          <Link className="flex items-center gap-3">
            <img
              className="w-5 h-6 object-cover"
              src={favIcon}
              alt="favIcons"
            />
            <span className="font-semibold text-black">Favorits</span>
          </Link>
          </div>
          {/* userPic */}
          <div>
          <div
            className="absolute top-3 right-16 w-[4rem] h-[4rem] rounded-full md:sticky border border-black scale-90"
            onClick={handleShowModal}
          >
            <img
              src={profilePic}
              alt="userPic"
              className="w-[100%] object-cover"
            />

            {/* our menu */}
            {isModalShown && <Modal />}
          </div>
          </div>
        </div>
    {/* our menu in mobile screen */}
    <FiMenu size={20} className='absolute top-8 right-6 md:hidden' onClick={handleMenu} />
      {
        isMenuShown &&  <div className='absolute top-20 right-5 z-10 bg-white shadow-lg gap-5 rounded-md flex flex-col items-center p-4 md:hidden'>
        {/* a propos */}
      <Link  onClick={()=>setIsMenuShwon(false)} to={'/about'} className="font-semibold text-black">
      A PROPOS
    </Link>
    {/* About */}
    <Link  onClick={()=>setIsMenuShwon(false)} className="font-semibold text-black">FAQ</Link>
    {/* favoris */}
    <Link onClick={()=>setIsMenuShwon(false)} className="flex items-center gap-3">
      <img
        className="w-5 h-6 object-cover"
        src={favIcon}
        alt="favIcons"
      />
      <span className="font-semibold text-black">Favorits</span>
    </Link>
    </div>
      }  
      

      </nav>
    </header>
  );
}
