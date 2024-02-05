import emptyHeart1 from "../assets/emptyHeart1.svg"
import heart1 from "../assets/fullheart1.svg"
import emptyHeart2 from "../assets/emptyHeart2.svg"
import heart2 from "../assets/heart2.svg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import {addArticleToFavoris, deleteFavoriteArticle} from "../actions/article"


function ArticleItem({
    title,authors,institutions,index,id
}) {
    const [favorit,setIsFavorit]=useState(false)
    const changeFavorit=()=>{
            setIsFavorit(!favorit)
    }

    const dispatch=useDispatch()

    useEffect(()=>{
        const waitTime=2000;
        const timeOut=setTimeout(()=>{
             favorit ? dispatch(addArticleToFavoris(id)) : dispatch(deleteFavoriteArticle(id))
        },waitTime)

        return ()=>clearTimeout(timeOut)
    },[favorit])
  return (
    
    <div className={`lg:ml-16 lg:mr-16 grid grid-cols-cols2 gap-5 ${index % 2 == 0 ? "bg-seconadryColor text-white" : "bg-white text-black" } rounded-2xl shadow-lg px-6 py-9 my-6 relative`}>
        {/* favoris Icon */}
          
            <div className="h-10 w-10 absolute top-6 right-6" onClick={changeFavorit}>
                {(index % 2 == 0 && favorit) ? <img src={heart1} className="w-full object-cover" /> : (index % 2 !=0 && favorit ? <img src={heart2} className="w-full object-cover" /> : (index % 2 == 0 && !favorit) ? <img src={emptyHeart1} className="w-full object-cover" /> : <img src={emptyHeart2} className="w-full object-cover" />) }
            </div>
          
        <Link to={`/article/${id}`} state={{title,authors,institutions,id}}><h3 className='ml-8 col-span-2 w-4/5 text-2xl'>{title}</h3></Link>
        <h3 className="ml-8">Auteurs : </h3>
        <ul>
        {
            authors.map(a => (<li>{a}</li>))
        }
        </ul>
        <h3 className="ml-8">Institutions : </h3>
        <ul>
        {
            institutions.map(i => (<li>{i}</li>))
        }
        </ul>
    </div>
  )
}

export default ArticleItem
