import emptyHeart1 from "../assets/emptyHeart1.svg"
import heart1 from "../assets/fullHeart1.svg"
import emptyHeart2 from "../assets/emptyHeart2.svg"
import heart2 from "../assets/heart2.svg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {addArticleToFavoris, deleteFavoriteArticle} from "../actions/article"


function ArticleItem({
    title,authors,institutions,index,id
}) {

    const {favoriteArticles}=useSelector(state => state.articleReducer)
    console.log(favoriteArticles)
    const isIncluded=favoriteArticles.find(ar => ar.id == id)
    console.log(isIncluded)
    const [favorit,setIsFavorit]=useState(isIncluded)
    const changeFavorit=()=>{
            setIsFavorit(!favorit)
    }

    const dispatch=useDispatch()

    useEffect(()=>{
        const waitTime=500;
        const timeOut=setTimeout(()=>{
             favorit ? dispatch(addArticleToFavoris(id)) : dispatch(deleteFavoriteArticle(id))
        },waitTime)

        return ()=>clearTimeout(timeOut)
    },[favorit])
  return (
    
    <div className={`lg:ml-16 lg:mr-16 ${index % 2 == 0 ? "bg-seconadryColor text-white" : "bg-white text-black" } rounded-2xl shadow-lg px-6 py-9 my-6 relative`}>
        {/* favoris Icon */}
          
            <div className="h-10 w-10 absolute top-6 right-6" onClick={changeFavorit}>
                {(index % 2 == 0 && favorit) ? <img src={heart1} className="w-full object-cover" /> : (index % 2 !=0 && favorit ? <img src={heart2} className="w-full object-cover" /> : (index % 2 == 0 && !favorit) ? <img src={emptyHeart1} className="w-full object-cover" /> : <img src={emptyHeart2} className="w-full object-cover" />) }
            </div>
          
        <Link to={`/article/${id}`} state={{title,authors,institutions,id}}><h3 className='ml-8 col-span-2 w-4/5 text-4xl mb-4 font-bold'>{title}</h3></Link>
        <div className="flex gap-4 items-center">
        <h3 className="ml-8 font-semibold">Auteurs : </h3>
        <ul className="flex gap-2">
        {
            authors.map(a => (<li className="text-xl">{a}</li>))
        }
        </ul>
        </div>
        <div className="flex gap-4 items-center">
        <h3 className="ml-8 font-semibold">Institutions: </h3>
        <ul className="flex gap-2 flex-wrap">
        {
            institutions.map(i => (<li className="text-xl">{i}</li>))
        }
        </ul>
        </div>
    </div>
  )
}

export default ArticleItem
