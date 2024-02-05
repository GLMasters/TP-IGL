import emptyHeart1 from "../assets/emptyHeart1.svg"
import heart1 from "../assets/heart1.svg"
import emptyHeart2 from "../assets/emptyHeart2.svg"
import heart2 from "../assets/heart2.svg"
import { useState } from "react"
import { Link } from "react-router-dom"

function ArticleItem({
    title,authors,institutions,index,id
}) {
    const [favorit,setIsFavorit]=useState(false)
    const changeFavorit=()=>{
            setIsFavorit(!favorit)
    }
  return (
    <Link to={`/article/${id}`} state={{title,authors,institutions,id}}>
    <div className={`lg:ml-16 lg:mr-16 grid grid-cols-cols2 gap-5 ${index % 2 == 0 ? "bg-seconadryColor text-white" : "bg-white text-black" } rounded-2xl shadow-lg px-6 py-9 my-6 relative`}>
        {/* favoris Icon */}
          
            <div className="h-10 w-10 absolute top-6 right-6" onClick={changeFavorit}>
                {(index % 2 == 0 && favorit) ? <img src={heart1} className="w-full object-cover" /> : (index % 2 !=0 && favorit ? <img src={heart2} className="w-full object-cover" /> : (index % 2 == 0 && !favorit) ? <img src={emptyHeart1} className="w-full object-cover" /> : <img src={emptyHeart2} className="w-full object-cover" />) }
            </div>
          
        <h3 className='ml-8 col-span-2 w-4/5 text-2xl'>{title}</h3>
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
    </Link>
  )
}

export default ArticleItem
