import ModeratorArticle from "../components/ModeratorArticle"
import Footer from '../components/Footer';
import {useSelector, useDispatch} from "react-redux"
import Spinner from "../components/Spinner"
import { useEffect, useRef, useState } from "react";
import { approveArticles, getArticles } from "../actions/article";

function ModerateurPage() {
  const dispatch = useDispatch() ;
  const {loading, articles, success, error} = useSelector(state=>state.articleReducer) ;
  const [checkedArticles, setCheckedArticles] = useState([]) ;
  const acceptRef=useRef()
  useEffect(()=>{

    dispatch(getArticles(false))

  }, [])
  
  const confirmArticles = ()=>{

    dispatch(approveArticles(checkedArticles)) ;
  //  window.location.reload() ;
  }
  
  return (
    <div>
      {loading && <Spinner/>}
    <div className="container w-full mx-auto px-8 py-20 border border-red-500">
            <div className="flex justify-end gap-4">
                    <button className="px-5 py-3 bg-primaryColor rounded-md text-white" onClick={confirmArticles}>Accepter</button>
                    <button className="px-5 py-3 bg-gray border rounded-md">Supprimer</button>
            </div>
            {/* listing artcs */}
            <div>
                <div className="grid grid-cols-3">
                    <h4 className="ml-14 font-semibold text-black">Titre d'article</h4>
                    <h4 className="font-semibold text-black">Auteurs</h4>
                </div>
                {articles.map((article)=>
                  (
                    <ModeratorArticle articleId={article.id} articleTitle={article.title} auteurs={article.authors} checkedArticles={checkedArticles} setCheckedArticles={setCheckedArticles} key={article.id}/>
                  )
                )}
            </div>
    </div>
    <Footer />
    </div>
  )
}

export default ModerateurPage
