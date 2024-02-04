import uploadSvg from '../assets/adminUploadSvg.svg';
import { LuLink } from 'react-icons/lu';
import { FiUpload } from "react-icons/fi";
import { useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { addArticle } from '../actions/article';
import Spinner from "../components/Spinner"

function UploadArticle() {

  const [link, setLink] = useState("") ;

  const dispatch = useDispatch() ;
  const {loading, success, articles,error} = useSelector(state=>state.articleReducer) ;
  const [selectedFileName, setSelectedFileName] = useState(null);
  const articleUploadRef=useRef()
  const uploadArticle=()=>{
        articleUploadRef.current.click()
       
  }

  const handlefilechange=()=>{
    const fileInput = articleUploadRef.current;
    if (fileInput && fileInput.files.length > 0) {
      setSelectedFileName(fileInput.files[0].name);
      // You can also perform other actions related to the uploaded file here
    } 
  }
  const confirmUpload = ()=>{

    if (!link && (! articleUploadRef.current.files[0])){


    } else if (link){

      console.log(link) ;
      dispatch(addArticle(link,true)) ;

    } else {
      dispatch(addArticle(articleUploadRef.current.files[0], false))
      console.log("file selected") ;
    }

  }

  return (
    <div>
      {loading && (<Spinner/>)}
      {/* uplaod part */}
      <div className="bg-seconadryColor px-10 py-12 md:flex justify-around items-center">
        <div className="max-w-[42rem] w-full">
        {/* upload via URL */}
          <div className="flex flex-col gap-3 items-center">
            <label
              htmlFor="urlInput"
              className="ml-16 font-Poppins text-white text-3xl"
            >
              Uploader votre article à partir d'un url :
            </label>
            <div className="relative w-10/12 upload">
              <LuLink className='absolute top-[50%] -translate-y-[50%] right-4' size={25} />

              <input type='text' placeholder='Introduisez le lien de fichier' className="uploadInput w-full" value={link} onChange={(e)=>setLink(e.target.value)}/>
            </div>
          </div>
           {/* Uploader via file */}
           <div className="flex flex-col gap-2 items-center py-4">
            <label
              htmlFor="urlInput"
              className="ml-16 md:ml-0 font-Poppins text-white text-3xl"
            >
              Ou bien à partir de votre appareil : 
            </label>
            <div className="relative w-10/12 upload py-4 " onClick={uploadArticle}>
              <FiUpload className='absolute top-[50%] -translate-y-[50%] right-4' size={25}  />
              <span className='text-slate-300 px-6'>
                {selectedFileName || 'Sélectionnez votre fichier'} 
              </span>
              <input type='file' className='hidden' ref={articleUploadRef}  onChange={handlefilechange} />
            </div>
          </div>
         <div className='flex flex-col items-center'>
         { success && (<span className=' text-green-500 text-bold mb-4 text-xl '>Opération effectué avec succes</span>)}
         { error && (<span className=' text-red-500 text-bold mb-4 text-xl '>Une Erreur est survenue !</span>)}
         </div>
          <div className='flex flex-col items-center'>
          <button className='bg-primaryColor text-white px-4 py-3 rounded-md hover:bg-black ' onClick={confirmUpload}>confirm</button>
          </div>
         
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
