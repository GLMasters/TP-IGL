import { url } from "./user";
import {GET_MODERATORS,ADD_MODERATOR,DELETE_MODERATORS,EDIT_MODERATOR,ADMIN_ACTION_SUCCESS,ADMIN_FAIL_ACTION,ADMIN_LOADING} from "../constants/adminActions"

const getModerators=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.get("/api/admin/moderators", {
            headers:{
                "Authorization": `Bearer ${getState().userReducer.userInfo.token}`
            }
        })
        
        console.log(res) ;
        if(res.data.result){
            return dispatch({
                type:GET_MODERATORS,
                payload:res.data.data.mods
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

const addModerator=(moderatorData)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.post("/api/auth/addmoderator", JSON.stringify({
            "email": moderatorData.email,
            "phone": moderatorData.phone,
            "address": moderatorData.adr,
            "name": moderatorData.nomComplet,
        }), {
            headers: {
                "Authorization": `Bearer ${getState().userReducer.userInfo.token}`,
                "Content-Type": "application/json"
            }
        })
        
        console.log(res)
        if(res.data.result){
            console.log(moderatorData)
            return dispatch({
                type:ADD_MODERATOR,
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

const editModerator=(newModeratorData,mod_id)=>async(dispatch)=>{
    try {
        dispatch({
            type:ADMIN_LOADING
        })

        const res=await url.post("/api/article/delete")
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
                type:DELETE_MODERATORS,
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