import React from 'react'
import docLibLogo from "../assets/docLibLogo.svg"
import { Link } from 'react-router-dom'
function HomeNavbar() {
  return (
    <header className='bg-white px-3'>
    <navbar className="container mx-auto flex justify-between items-center">
      {/* logo */}
      <div className='w-[12rem] mt-3'>
      <img src={docLibLogo} className='w-[100%]' alt='docLibLogo' />
      </div>

      <div className=' flex gap-8 lg:gap-20 items-center '>
      {/* a propos */}
      <Link className='font-semibold'>A PROPOS</Link>
          {/* About */}
      <Link className='font-semibold'>FAQ</Link>
      {/* login/signUp */}
      <Link>
          <button className='loginBtn'>Login/Sign Up</button>
      </Link>
      </div>

      
      </navbar>
    </header>
  )
}

export default HomeNavbar
