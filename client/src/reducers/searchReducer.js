import {SEARCH_BY_AUTHOR,SEARCH_BY_TITLE,SEARCH_ERROR,SEARCH_LOADING} from "../constants/searchActions"

const initialState={
    resultedArticles:[],
    error:"",
    success:false,
    loading:false
}

const searchReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SEARCH_BY_AUTHOR:
            
            break;
    
        default:
            return state
    }
}


export {searchReducer}