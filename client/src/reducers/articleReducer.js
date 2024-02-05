import {
    ADD_ARTICLE,
    GET_ARTICLES,
    CONFIRM_ARTICLE,
    GET_APPROVED_ARTICLES,
    ARTICLE_ERROR,
    ARTICLE_LOADING,
    EDIT_ARTICLE_BY_MODERATOR,
    DELETE_ARTICLES,
    GET_ARTCLE_DETAILS
} from "../constants/articleActions"
const initialState={
    loading:false,
    approvedArticles:[],
    nonApprovedArticles:[],
    error:false,
    articleDetailInfo:{},
    success:false
}
export const articleReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ARTICLE_LOADING:
            return {...state,loading:true,success:false, error: false}
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
            state.articles.push(action.payload)
            return {
                loading:false,
                articles:state.articles,
                error: false,
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
                ...state,loading:false,success:false,error:true
            }
        case DELETE_ARTICLES:
            //state.articles=state.articles.filter(art => art._id != action.payload.articleId)
            return {
                ...state,
                nonApprovedArticles:action.payload,
                loading:false
            }
        default: return state
    }
}
