import React, { useState } from 'react'
import docLib from "../assets/docLibLogo.svg"
import userPic from "../assets/userPic.svg"
import returnBackSvg from "../assets/goBack.svg"
import {validate} from "react-email-validator"
function Profile() {

    const [formData,setFormData]=useState({
        email:"",
        pass:"",
        name:""
    })
    const [isValid,setIsValid]=useState(true)

    const [isEdit,setIsEdit]=useState(false)
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleEdit=()=>{
        setIsEdit(!isEdit)
    }

    const handleSubmit=(e)=>{
        //check entered data
        if(!formData.pass.trim().length < 8 || !validate(formData.email) || !formData.name) {
            setIsValid(false);
            return;
        }
        //call api
    }
  return (
    <div className='container px-4 w-full mx-auto bg-white max-h-screen h-full flex flex-col items-center relative'>
    <div className='flex gap-3 items-center absolute top-[15%] left-6'>
    {/* return Back svg */}
    <img src={returnBackSvg} className=' object-cover' />
    <p className='font-bold'>Page précédente</p>
    </div>
    
                <header className=' self-start'>
                        {/* DocLiblogo */}
                        <img src={docLib} alt='docLibLogo' className="w-[9rem] object-cover" />
                </header>
                        {/* user info */}
                <div className='mt-24 lg:mt-0 max-w-md w-full flex flex-col gap-6 items-center px-4 relative'>
                         

                            {/* user Pic */}
                            <div className='w-[11rem] h-[11rem] rounded-full'>
                                    <img src={userPic} alt='userProfile_pic' className='w-[100%] object-cover' />
                            </div>

                            {/* user name */}
                            <div className='text-black self-start w-full'> 
                            <span className='text-lg font-semibold'>Nom complet</span>
                            <div className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 ${isEdit && "border-none"} mt-2`}>
                            {isEdit ? <input type='text' name='name' value={formData.name} onChange={handleChange} className='Inputsign placeholder:font-Poppins' placeholder='saisir name' /> : <p className='ml-4'>merabet mohammed riad</p>}
                            </div>
                            </div>

                            {/* user email */}

                            {/* user name */}
                            <div className='text-black self-start w-full'> 
                            <span className='text-lg font-semibold'>Email</span>
                            <div className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 ${isEdit && "border-none"} mt-2`}>
                            {isEdit ? <input type='email' name='email' value={formData.email} onChange={handleChange} className='Inputsign placeholder:font-Poppins' placeholder='saisir email' /> : <p className='ml-4'>lm_merabit_riyad@esi.dz</p>}
                            </div>
                            </div>

                            {/* mot de passe */}
                            <div className='text-black self-start w-full'> 
                            <span className='text-lg font-semibold'>Mot de passe</span>

                            
                            <div className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 ${isEdit && "border-none"} mt-2`}>
                                {isEdit ? <input type='password' name='password' value={formData.pass} onChange={handleChange} className='Inputsign placeholder:font-Poppins' placeholder='saisir mot de passe' /> : <p className='ml-4'>*************</p>}
                            </div>
                            </div>
                            {
                                !isValid && <span className='text-red-600 text-sm text-center'>Vérifiez bien votre données</span>
                            }
                            <span></span>

                            {/* edit Btn */}
                            {
                                isEdit ? <div className="w-full flex items-center justify-between">
                                    <button className='bg-seconadryColor px-5 py-4 rounded-md outline-none text-lg' onClick={handleSubmit}>Enregistrer</button>
                                    <button className='bg-white px-5 py-4 text-lg outline-none rounded-md border border-slate-500' onClick={handleEdit}>Annuler</button>
                                </div> :
                            
                            <button className='bg-seconadryColor px-5 py-4 rounded-md outline-none text-lg' onClick={handleEdit}>
                                modifier
                            </button>

                            }
                </div>

    </div>
  )
}

export default Profile
