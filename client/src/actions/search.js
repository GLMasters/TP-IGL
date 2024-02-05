import {SEARCH_BY_TITLE,SEARCH_BY_AUTHOR,SEARCH_LOADING,SEARCH_ERROR} from "../constants/searchActions.js" 
import { url } from "./user.js"


const searchByTitle=(query)=>async(dispatch,getState)=>{
    try {
        const approvedArticles=getState().articleReducer.approvedArticles
        dispatch({
            type:SEARCH_LOADING
        })

        const newArtcls=approvedArticles.filter(article => article.title.includes(query))
        dispatch({
            type:SEARCH_BY_TITLE,
            payload:newArtcls
        })
    } catch (error) {
        dispatch({
            type:SEARCH_ERROR,
            payload:"something went wrong"
        })
    }
}



const generalSearch=(query)=>async(dispatch,getState)=>{
    try {
        const approvedArticles=getState().articleReducer.approvedArticles
        dispatch({
            type:SEARCH_LOADING
        })

        
        
        dispatch({
            type:SEARCH_BY_TITLE,
            payload:newArtcls
        })
    } catch (error) {
        dispatch({
            type:SEARCH_ERROR,
            payload:"something went wrong"
        })
    }
}

export {searchByTitle}