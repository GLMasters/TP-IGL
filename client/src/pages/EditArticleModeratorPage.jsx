import ArticleDetailedEditItem from "../components/ArticleDetailedEditItem"
import {useSelector,useDispatch} from "react-redux"
import { getArticleDetails } from "../actions/article"
import {useEffect} from "react"
import {useLocation} from "react-router-dom"
function EditArticleModeratorPage() {
  const {loading,articleDetailInfo}=useSelector(state => state.articleReducer)
  const dispatch=useDispatch()
 const {state}=useLocation()
const [formData,setFormData]=useState({
  title:"",
  keywords:[],
  authors:[],
  references:[],
  summary:""
})
 
  useEffect(()=>{ 
    dispatch(getArticleDetails(state))
  },[])
  return (
    <div className="container p-4 w-full mx-auto mt-10 flex flex-col gap-4">
    {/* attr */}
    <ArticleDetailedEditItem
      attr={"Titre d'article "}
      content={
        articleDetailInfo?.title || ""
      }
      setFormData={setFormData}
      formData={formData}
      name="title"
    />
    {/* Auteurs */}
    <ArticleDetailedEditItem
      attr={'Auteurs'}
      content={articleDetailInfo?.authors || []}
      name="authors"
    />
    {/* institutions */}
    <ArticleDetailedEditItem
      attr={'Institutions'}
      content={articleDetailInfo?.institutions || []}
      setFormData={setFormData}
      formData={formData}
      name="institutions"
    />
    {/* Résume */}
    <ArticleDetailedEditItem
      attr={'Résumé'}
      content={
        articleDetailInfo?.summary || ""
      }
      setFormData={setFormData}
      formData={formData}
      name="summary"
    />
    {/* les mots clés */}
    <ArticleDetailedEditItem
      attr="les mots clés"
      content={articleDetailInfo?.keywords || []}
      setFormData={setFormData}
      formData={formData}
      name="keywords"
    />
    {/* references */}
    <ArticleDetailedEditItem
      attr="Références"
      content={articleDetailInfo?.references || []}
      setFormData={setFormData}
      formData={formData}
      name="references"
    />
  
    <div className="flex gap-5">
    <button className="bg-primaryColor px-6 py-3 rounded-md shadow-lg w-fit text-white my-10">
      Enregistrer
    </button>
    <button className="bg-gray px-6 py-3 rounded-md border shadow-lg w-fit my-10">
      Télécharger
    </button>
    </div>
  </div>
  )
}

export default EditArticleModeratorPage
