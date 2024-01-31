import { url } from "./user";
import {GET_MODERATORS,ADD_MODERATOR,DELETE_MODERATOR,EDIT_MODERATOR, UPLOAD_ARTICLELOAD_ARTICLE,ADMIN_ACTION_SUCCESS,ADMIN_FAIL_ACTION,ADMIN_LOADING, UPLOAD_ARTICLE} from "../constants/adminActions"

const getModerators=()=>async(dispatch)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.get("/api/admin/...")
        if(res.data?.result){
            return dispatch({
                type:GET_MODERATORS,
                payload:res.data.data
            })
        }
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:res.data.message
        })
    } catch (error) {
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:error.message
        })
    }
}

const addModerator=(moderatorData)=>async(dispatch)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.post("/api/admin/...")
        if(res.data?.result){
            return dispatch({
                type:ADD_MODERATOR,
                payload:moderatorData
            })
        }
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:res.data.message
        })
    } catch (error) {
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:error.message
        })
    }
}

const editModerator=(newModeratorData,mod_id)=>async(dispatch)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.patch("/api/admin/...")
        if(res.data?.result){
            return dispatch({
                type:EDIT_MODERATOR,
                payload:{newModeratorData,mod_id}
            })
        }
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:res.data.message
        })
    } catch (error) {
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:error.message
        })
    }
}

const deleteModerator=(mod_id)=>async(dispatch)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.delete("/api/admin/...")
        if(res.data?.result){
            return dispatch({
                type:DELETE_MODERATOR,
                payload:{mod_id}
            })
        }
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:res.data.message
        })
    } catch (error) {
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:error.message
        })
    }
}


const uploadArticle=(article)=>async(dispatch)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.post("/api/admin/...")
        if(res.data?.result){
            return dispatch({
                type:UPLOAD_ARTICLE,
                payload:{
                    articleId:res.data.data,
                    article
                }
            })
        }
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:res.data.message
        })
    } catch (error) {
        dispatch({
            type:ADMIN_FAIL_ACTION,
            payload:error.message
        })
    }
}


export {
    getModerators,
    addModerator,
    editModerator,
    deleteModerator,
    uploadArticle
}