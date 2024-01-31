import uploadSvg from '../assets/adminUploadSvg.svg';
import { LuLink } from 'react-icons/lu';
import { FiUpload } from "react-icons/fi";
import { useRef } from 'react';
function UploadArticle() {

    const articleUploadRef=useRef()
    const uploadArticle=()=>{
          articleUploadRef.current.click()
    }
  
  return (
    <div>
      {/* uplaod part */}
      <div className="bg-seconadryColor px-10 py-12 md:flex justify-around items-center">
        <div className="max-w-md w-full">
        {/* upload via URL */}
          <div className="flex flex-col gap-2 items-start">
            <label
              htmlFor="urlInput"
              className="font-Poppins text-white text-3xl"
            >
              Uploader votre article à partir d'un url
            </label>
            <div className="relative w-10/12 upload">
              <LuLink className='absolute top-[50%] -translate-y-[50%] right-4' size={25} />

              <input type='text' placeholder='Introduisez le lien de fichier' className="uploadInput" />
            </div>
          </div>
{/* Uploader via file */}
<div className="flex flex-col gap-2 items-start py-4">
            <label
              htmlFor="urlInput"
              className="font-Poppins text-white text-3xl"
            >
              Ou bien à partir de votre appareil
            </label>
            <div className="relative w-10/12 upload py-4" onClick={uploadArticle}>
              <FiUpload className='absolute top-[50%] -translate-y-[50%] right-4' size={25}  />
              <span className='text-slate-300 px-6'>Sélectioonez votre fichier</span>
              <input type='file' className='hidden' ref={articleUploadRef} />
            </div>
          </div>
          <button className='bg-primaryColor text-white px-4 py-3 rounded-md'>confirm</button>
        </div>
        <div className="w-[20rem]">
          <img
            src={uploadSvg}
            className="hidden md:block lg:w-full object-cover"
          />
        </div>
        
      </div>
      
    </div>
  )
}

export default UploadArticle
