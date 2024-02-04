import {
    ADD_ARTICLE,
    GET_ARTICLES,
    CONFIRM_ARTICLE,
    ARTICLE_ERROR,
    ARTICLE_LOADING,
    EDIT_ARTICLE_BY_MODERATOR,
    DELETE_ARTICLES
} from "../constants/articleActions"
const initialState={
    loading:false,
    articles:[],
    error:false,
    success:false
}
export const articleReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ARTICLE_LOADING:
            return {...state,loading:true,success:false, error: false}
        case GET_ARTICLES:
            return {
                ...state,success:true,articles:action.payload,
                loading:false
            }
        case ADD_ARTICLE:
            state.articles.push(action.payload)
            return {
                loading:false,
                articles:state.articles,
                success:true
            }
        case EDIT_ARTICLE_BY_MODERATOR:
            state.articles=state.articles.map(article =>{
                if(article._id == action.payload.article_id){
                    article=action.payload.newArticleData
                }
                return article
            })
            return {...state,loading:false,error:action.payload,success:false}
        case ARTICLE_ERROR:
            return {
                ...state,loading:false,success:false,error:true
            }
        case DELETE_ARTICLES:
            //state.articles=state.articles.filter(art => art._id != action.payload.articleId)
            return {
                ...state,
                articles:action.payload,
                loading:false
            }
        default: return state
    }
}
