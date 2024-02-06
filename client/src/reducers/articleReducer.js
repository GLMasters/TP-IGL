import {
    ADD_ARTICLE,
    GET_ARTICLES,
    ADD_ARTICLE_TO_FAVORIS,
    GET_FAVORITS,
    GET_APPROVED_ARTICLES,
    ARTICLE_ERROR,
    ARTICLE_LOADING,
    EDIT_ARTICLE_BY_MODERATOR,
    DELETE_ARTICLES,
    GET_ARTCLE_DETAILS,
    REMOVE_FAVORITE_ARTICLE
} from "../constants/articleActions"
const initialState={
    loading:false,
    approvedArticles:[],
    nonApprovedArticles:[],
    favoriteArticles:localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [],
    error:"",
    articleDetailInfo:{},
    success:false
}
export const articleReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ARTICLE_LOADING:
            return {...state,loading:true,success:false, error: ""}
        case GET_ARTICLES:
            return {
                ...state,success:true,nonApprovedArticles:action.payload,
                loading:false
            }
        case GET_APPROVED_ARTICLES:
            return {
                ...state,  
                 loading:false,
                approvedArticles:action.payload
            }
        case GET_ARTCLE_DETAILS:
            return {
                ...state,
                loading:false,
                articleDetailInfo:action.payload
            }
        case ADD_ARTICLE:
            return {
                ...state,
                loading:false,
                success:true
            }
            
        case EDIT_ARTICLE_BY_MODERATOR:
            state.nonApprovedArticles=state.nonApprovedArticles.map(article =>{
                if(article._id == action.payload.article_id){
                    article=action.payload.newArticleData
                }
                return article
            })
            return {...state,loading:false,error:action.payload,success:false}
        case ARTICLE_ERROR:
            return {
                ...state,loading:false,success:false,error:action.payload
            }
        case DELETE_ARTICLES:
            //state.articles=state.articles.filter(art => art._id != action.payload.articleId)
            return {
                ...state,
                nonApprovedArticles:action.payload,
                loading:false
            }
        case GET_FAVORITS:
            return {
                ...state,
                loading:false,
                success:true,
                favoriteArticles:action.payload
            }
        case REMOVE_FAVORITE_ARTICLE:
            const newArtcs=state.favoriteArticles.filter(fa => fa.id != action.payload);
            //setLocalStorage
            localStorage.setItem("favorites",JSON.stringify(newArtcs))
            return {
                ...state,
                favoriteArticles:newArtcs
            }
        case ADD_ARTICLE_TO_FAVORIS:
            state.favoriteArticles.push(action.payload);
            return {
                ...state
            }
        default: return state
    }
}
