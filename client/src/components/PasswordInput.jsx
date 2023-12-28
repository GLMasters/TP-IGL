import React, { useState } from 'react'
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

function PasswordInput({
    label,
    setValue,
    value,
    isValid
}) {

    const [visible,setVisible]=useState(false)
    const handleVisible=(e)=>{
        e.preventDefault()
        setVisible(!visible)
    }
  return (
    <div className='relative w-full mx-auto'>
    <input value={value} onChange={(e) => setValue(e.target.value)} type={visible ? "text" :"password"} className={`Inputsign my-3 ${!isValid && "border-red-600 placeholder-red-600" }`} placeholder={label} />
    <button onClick={handleVisible} className="absolute inset-y-0 right-0 flex items-center justify-center px-3 py-2 focus:outline-none"> 
    {
        visible ? <IoEyeOffOutline /> : <IoEyeOutline />
    }
    </button>
    </div>
  )
}

export default PasswordInput
