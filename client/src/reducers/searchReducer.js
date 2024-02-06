import {SEARCH_BY_AUTHOR,SEARCH_BY_TITLE,SEARCH_ERROR,SEARCH_LOADING, GENERAL_SEARCH, FILTER_SEARCH} from "../constants/searchActions"

const initialState={
    resultedArticles:[],
    error:false,
    success:false,
    loading:false
}

const searchReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SEARCH_BY_AUTHOR:
            
            break;
        
        case GENERAL_SEARCH:
            return {
                ...state,success:true, error: false, resultedArticles: action.payload
            }

        case FILTER_SEARCH:
            return {
                ...state,success:true, error: false, resultedArticles: action.payload
            }
        default:
            return state
    }
}


export {searchReducer}