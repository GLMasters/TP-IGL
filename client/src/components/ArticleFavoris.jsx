import React, { useState } from 'react'
import DeleteArticle from "../assets/Deletearticle.svg";
import { useDispatch } from 'react-redux';
import { deleteFavoriteArticle } from '../actions/article';

function ArticleFavoris({title, authors, institutions,id}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  const dispatch=useDispatch()
  const removeFavoriteArticled=()=>{
      dispatch(deleteFavoriteArticle(id))
  }
   
  return (
    <div className={`${isHovered ? 'bg-seconadryColor':'bg-white'} rounded-[30px]  ml-10 mr-10 lg:ml-32 lg:mr-32 mt-5 mb-10 cursor-pointer `}  onMouseEnter={handleHover} onMouseLeave={handleHover}>
   <div className='py-10'>
  <div className='flex flex-row justify-between'>
  <h1 className='text-black font-Poppins font-medium text-xl md:text-2xl underline ml-6 md:ml-16 mr-5 '>{title}</h1>
  <button onClick={removeFavoriteArticled}><img className='w-20 h-16 pr-2 pb-2 mr-2' src={DeleteArticle} alt="delete" /></button>
  </div>
    <h1 className=' text-black font-Poppins font-medium text-xl md:text-2xl  ml-6 md:ml-16 mt-6'>Auteurs :<p className={`${isHovered ?' text-white':''} text-primaryColor  font-Poppins font-medium text-lg mt-2 mb-2`}>{authors.join(', ')}</p></h1>
    

    <h1 className='text-black font-Poppins font-medium text-xl md:text-2xl  ml-6 md:ml-16'>Institutions :</h1>
    <ul className='ml-6 md:ml-16'> 
          {institutions.map((institution, index) => (
            <li className={`${isHovered ?' text-white':''} text-primaryColor  font-Poppins font-medium text-lg mt-2 mb-2 `} key={index}> - {institution}</li>
          ))}
        </ul>
   </div>
    </div>
  )
}

export default ArticleFavoris
