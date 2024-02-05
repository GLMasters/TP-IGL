import {GET_ARTICLES,GET_ARTCLE_DETAILS,GET_MODERATOR_ARTICLE,DELETE_ARTICLES,ADD_ARTICLE,ARTICLE_ERROR,ARTICLE_LOADING, EDIT_ARTICLE_BY_MODERATOR,GET_APPROVED_ARTICLES} from "../constants/articleActions"

import { url } from "./user"

const getArticles=(approved)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ARTICLE_LOADING
        })

        var res ;

        if (!approved){
            res=await url.get("/api/articles/pending",{
                headers: {
                    "Authorization": `Bearer ${getState().userReducer.userInfo.token}`
                }
            });

        } else {
            res=await url.get("/api/articles/approved", {
                headers: {
                    "Authorization": `Bearer ${getState().userReducer.userInfo.token}`
                }
            });
        }
        console.log(res.data)
        if(res.data.result){
                dispatch({
                    type:approved ? GET_APPROVED_ARTICLES : GET_ARTICLES,
                    payload:res.data.data.articles
                })
        }else{
            return dispatch({
                type:ARTICLE_ERROR,
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
        console.log(res)
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
            //const res=await url.put
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

const deleteArticle=(article_id_list)=>async(dispatch,getState)=>{
    console.log(article_id_list)
    try {
        dispatch({
            type:ARTICLE_LOADING
        })
        const res=await url.post("/api/articles/delete",JSON.stringify({
                articles:article_id_list
        }),{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${getState().userReducer.userInfo.token}`
            }
        });

        console.log(res.data)
        if(res.data?.result){
            return dispatch({
                type:DELETE_ARTICLES,
                payload:res.data?.data.articles
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

const approveArticles=(articles_id_list)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ARTICLE_LOADING
        })

        
        var res = await url.post("/api/articles/confirm",JSON.stringify({
            "articles": articles_id_list
            
        }), {
            headers:{
                "Authorization": `Bearer ${getState().userReducer.userInfo.token}`,
                "Content-Type": "application/json"
            }
        });

        if(res.data.result){

            return dispatch({
                type:GET_ARTICLES,
                payload: res.data.data.articles
            })
        }
        return dispatch({
            type:ARTICLE_ERROR,
            payload:res.data.status
        })
    } catch (error) {

        dispatch({
            type:ARTICLE_ERROR,
            payload:error.message
        })
    }
}

const getArticleDetails=(article_id)=>async(dispatch,getState)=>{
    console.log("called")
    try {
        dispatch({
            type:ARTICLE_LOADING
        })
        console.log("called 2")
        const res=await url.get(`/api/article/${article_id}`,{
            headers:{
                "Authorization":`Bearer ${getState().userReducer.userInfo.token}`
            }
        })
        console.log(res.data)
        if(res.data?.result){
            dispatch({
                type:GET_ARTCLE_DETAILS,
                payload:res.data.data
            })
        }else{
            dispatch({
                type:ARTICLE_ERROR,
                payload:"error"
            })
        }
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
    deleteArticle,
    approveArticles,
    getArticleDetails
}