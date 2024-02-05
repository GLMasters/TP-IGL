import checkSvg from "../assets/checkSvg.svg"
import checkDisabled from "../assets/checkDisabled.svg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ModeratorArticle({
    articleId,
    articleTitle,
    auteurs,
    checkedArticles, 
    setCheckedArticles
}) {
    const articleData={}
    const [checked,setChecked]=useState(false)

    useEffect(()=>{
    

        if (checked && !(checkedArticles.includes(articleId) )) {
            setCheckedArticles([...checkedArticles, articleId])
        } else if ((! checked) && (checkedArticles.includes(articleId))){
            setCheckedArticles(checkedArticles.filter((id)=>{
                return id != articleId
            }))
        }


    }, [checked])


  return (
    <div className="grid grid-cols-3 gap-4 border border-b-2 border-b-black border-r-0 border-l-0 border-t-0 py-6 relative -z-0">
    <img src={checked ? checkSvg : checkDisabled} onClick={()=>setChecked(!checked)} className="absolute -left-0 w-8 top-[0%] translate-y-[70%]" />
    <h4 className="ml-14 text-black">{articleTitle}</h4>
    {
        <div className="text-black">
            {
                auteurs.join(",")
            }
        </div>
    }
    {/* view details button */}
    <Link to={`/moderator/editArticle`} state={articleData} className="bg-seconadryColor px-8 py-3 mt-2  lg:ml-60 rounded-md w-fit h-fit text-white">view Details</Link>
    </div>
  )
}

export default ModeratorArticle
