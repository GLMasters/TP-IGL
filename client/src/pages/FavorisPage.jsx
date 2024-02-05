import Footer from '../components/Footer';
import ArticleFavoris from '../components/ArticleFavoris';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { getFavoritsArticles } from '../actions/article';

function Favoris() {
  const dispatch=useDispatch()
  const {loading,success,favoriteArticles}=useSelector(state => state.articleReducer)

  useEffect(()=>{
    dispatch(getFavoritsArticles())
  },[])
  return (
    <>
      <div className=" bg-thirdColor min-h-screen mt-0">
      {loading && <Spinner />}
        <div className="py-16 ">
          <h1 className="font-Lora text-3xl text-black ml-10 md:ml-32 font-semibold">
            Vos articles préférés :
          </h1>
        </div>
      <div>
        {
          favoriteArticles.length ? favoriteArticles.map(fa=>(
            <ArticleFavoris key={fa.id} {...fa} />
          )) : <p className='text-center'>no favoris</p>
        }
      </div>

        
      </div>
      <Footer />
    </>
  );
}

export default Favoris;
