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


const addArticle=(article_data,byLink)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ARTICLE_LOADING
        })
        var res ;
        
        if (byLink){
            
            res=await url.post("/api/article/uploadurl", JSON.stringify({"url": article_data}), {
                headers:{
                    "Authorization": `Bearer ${getState().userReducer.userInfo.token}`,
                    "Content-Type": "application/json"
                }
            });

        } else {

            const formData = new FormData();
            formData.append('file', article_data);

            res=await url.post("/api/article/uploadfile", formData,  {
                headers:{
                    "Authorization": `Bearer ${getState().userReducer.userInfo.token}`,
                    "Content-Type": 'multipart/from-data',
                }
            });


        }
        
        console.log(res) ;
        if(res.data.result){
            dispatch({
                type:ADD_ARTICLE,
                payload:res.data.data
            })
        }else{
            return dispatch({
                type:ARTICLE_ERROR,
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