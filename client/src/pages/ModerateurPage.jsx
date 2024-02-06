import ModeratorArticle from "../components/ModeratorArticle"
import Footer from '../components/Footer';
import {useSelector, useDispatch} from "react-redux"
import Spinner from "../components/Spinner"
import { useEffect, useState } from "react";
import { approveArticles, deleteArticle, getArticles } from "../actions/article";

function ModerateurPage() {
  const dispatch = useDispatch() ;
  const {loading, nonApprovedArticles, success, error} = useSelector(state=>state.articleReducer) ;
  const [checkedArticles, setCheckedArticles] = useState([]) ;
  useEffect(()=>{
    dispatch(getArticles(false))
  }, [])
  
  const deleteSelectedArticles=()=>{
    dispatch(deleteArticle(checkedArticles))
  }

  const confirmArticles = ()=>{

    dispatch(approveArticles(checkedArticles)) ;
  //  window.location.reload() ;
  }
  
  return (
    <div>
      {loading && <Spinner/>}
    <div className="container w-full mx-auto px-8 py-20">
            <div className="flex justify-end gap-4">
                    <button className="px-5 py-3 bg-primaryColor rounded-md text-white" onClick={confirmArticles}>Accepter</button>
                    <button className="px-5 py-3 bg-gray border rounded-md" disabled={!checkedArticles.length} onClick={deleteSelectedArticles}>Supprimer</button>
            </div>
            {/* listing artcs */}
            {
              nonApprovedArticles?.length ?
            
            <div>
                <div className="grid grid-cols-3">
                    <h4 className="ml-14 font-semibold text-black">Titre d'article</h4>
                    <h4 className="font-semibold text-black">Auteurs</h4>
                </div>
                {nonApprovedArticles.map((article)=>
                  (
                    <ModeratorArticle articleId={article.id} articleTitle={article.title} auteurs={article.authors} checkedArticles={checkedArticles} setCheckedArticles={setCheckedArticles} key={article.id}/>
                  )
                )}
            </div> : <p>no articles pour le moment</p>
                  }
    </div>
    <Footer />
    </div>
  )
}

export default ModerateurPage
