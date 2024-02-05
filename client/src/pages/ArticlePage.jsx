import { useLocation, useParams } from 'react-router-dom';
import ArticleDetailedItem from '../components/ArticleDetailedItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetails } from '../actions/article';
import Spinner from '../components/Spinner';
function ArticlesScreen() {
  const dispatch=useDispatch()
  const {success,loading,articleDetailInfo}=useSelector(state => state.articleReducer)
  const {articleId}=useParams()
  console.log(articleDetailInfo)
  useEffect(()=>{ 
    console.log("acalll")
    dispatch(getArticleDetails(articleId))
  },[])
  return (
    <div className="container px-20 w-full mx-auto mt-10 flex flex-col gap-4">
    {loading && <Spinner />}
      {/* title */}
      <ArticleDetailedItem
        title={articleDetailInfo?.title || ""}
      />
      {/* Auteurs */}
      <ArticleDetailedItem
        title={"Auteurs"}
        content={articleDetailInfo?.authors || []}
      />
      {/* institutions */}
      <ArticleDetailedItem
        title={'Institutions'}
        content={articleDetailInfo?.institutions || [] }
      />
      {/* Résume */}
      <ArticleDetailedItem
        title={'Résumé'}
        content={
          articleDetailInfo?.summary || ""
        }
      />
      {/* les mots clés */}
      <ArticleDetailedItem
        title="les mots clés"
        content={articleDetailInfo?.keywords || ""}
      />
      {/* references */}
      <ArticleDetailedItem
        title="Références"
        content={articleDetailInfo?.references || [] } />

        <iframe className='h-[100vh] rounded-3xl' src={articleDetailInfo.url}>

        </iframe>
      <button className="bg-primaryColor px-6 py-3 rounded-md shadow-lg w-fit text-white mx-auto my-10 cursor-pointer" onClick={()=>{
        window.location.href = "http://192.168.41.135:8000/api/pdf/download/"+articleDetailInfo.id


      }}>
        Télécharger
      </button>
    </div>
  );
}

export default ArticlesScreen;
