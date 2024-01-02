import React, { useState } from 'react'
import DeleteArticle from "../assets/Deletearticle.svg";

function ArticleFavoris({title, authors, institutions}) {

   
  return (
    <div className=' rounded-[30px] bg-white ml-5 mr-5 mt-5 mb-10'>
   <div className='py-10'>
  <div className='flex flex-row justify-between'>
  <h1 className='text-black font-Poppins font-medium text-xl md:text-2xl underline ml-6 md:ml-16 mr-5 cursor-pointer'>{title}</h1>
  <button><img className='w-20 h-16 pr-2 pb-2' src={DeleteArticle} alt="delete" /></button>
  </div>
    <h1 className=' text-black font-Poppins font-medium text-xl md:text-2xl  ml-6 md:ml-16 mt-6'>Auteurs :<p className='text-primaryColor font-Poppins font-medium text-lg mt-2 mb-2'>{authors.join(', ')}</p></h1>
    

    <h1 className='text-black font-Poppins font-medium text-xl md:text-2xl  ml-6 md:ml-16'>Institutions :</h1>
    <ul className='ml-6 md:ml-16'> 
          {institutions.map((institution, index) => (
            <li className='text-primaryColor font-Poppins font-medium text-lg mt-2 mb-2 ' key={index}> - {institution}</li>
          ))}
        </ul>
   </div>
    </div>
  )
}

export default ArticleFavoris
