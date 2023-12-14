import React from 'react'
import docLibLogo from "../assets/Logo.svg"
import { Link } from 'react-router-dom'
function HomeNavbar() {
  return (
    <header className='bg-white px-3'>
    <navbar className="container mx-auto flex justify-between items-center">
      {/* logo */}
      <div className='w-[9rem]'>
      <img src={docLibLogo} className='w-[100%]' alt='docLibLogo' />
      </div>

      {/* About */}
      <Link className='font-semibold'>About</Link>

      {/* login/signUp */}
      <Link>
          <button className='loginBtn'>Login/Sign Up</button>
      </Link>
      </navbar>
    </header>
  )
}

export default HomeNavbar
