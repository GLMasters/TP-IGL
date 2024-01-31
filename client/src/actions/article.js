import {GET_ARTICLES,GET_ARTCLE_DETAILS,GET_MODERATOR_ARTICLE,DELETE_ARTICLE,ADD_ARTICLE,ARTICLE_ERROR,ARTICLE_LOADING, EDIT_ARTICLE_BY_MODERATOR} from "../constants/articleActions"

import { url } from "./user"

const getArticles=()=>async(dispatch)=>{
    try {
        dispatch({
            type:ARTICLE_LOADING
        })
        const res=await url.get("/");
        if(res.data?.result){
                dispatch({
                    type:GET_ARTICLES,
                    payload:res.data.data
                })
        }else{
            return dispatch({
                type:ARTICLE_ERROR,
                payload:res.data.message
            })
        }
    } catch (error) {
        dispatch({
            type:ARTICLE_ERROR,
            payload:error.message
        })
    }
}


const addArticle=(article_data)=>async(dispatch)=>{
    try {
        dispatch({
            type:ARTICLE_LOADING
        })

        const res=await url.post();
        if(res.data?.result){
            dispatch({
                type:ADD_ARTICLE,
                payload:article_data
            })
        }else{
            return dispatch({
                type:ARTICLE_ERROR,
                payload:res.data.message
            })
        }
    } catch (error) {
        dispatch({
            type:ARTICLE_ERROR
        })
    }
}

const editArticle=(article_id,newArticleData)=>(dispatch)=>{
    try {
            dispatch({
                type:ARTICLE_LOADING
            })
            //call api if necessary !
            dispatch({
                type:EDIT_ARTICLE_BY_MODERATOR,
                payload:{newArticleData,article_id}
            })
    } catch (error) {
        dispatch({
            type:ARTICLE_ERROR,
            payload:error.message
        })
    }
}

const deleteArticle=(article_id)=>async(dispatch)=>{
    try {
        dispatch({
            type:ARTICLE_LOADING
        })
        const res=await url.delete("");
        if(res.data?.result){
            return dispatch({
                type:DELETE_ARTICLE,
                payload:{
                    articleId:article_id
                }
            })
        }
        return dispatch({
            type:ARTICLE_ERROR,
            payload:res.data.message
        })
} catch (error) {
    dispatch({
        type:ARTICLE_ERROR,
        payload:error.message
    })
}
}

export {
    getArticles,
    addArticle,
    editArticle,
    deleteArticle
}