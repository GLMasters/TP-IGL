import {USER_ERROR,USER_SUCCESS,USER_UPDATE_INFO,USER_LOADING,SAVE_USER_LOGIN_DATA,CONFIRM_USER_MAIL,CLEAR_USER_INFO} from "../constants/userActions"

import axios from "axios"

import {config} from "../api/config"

export const url = axios.create({
    baseURL:config.URL
})

const registerUser=(data)=>async(dispatch)=>{
    try {
            dispatch({
                type:USER_LOADING
            })

            var res = await url.post("/api/auth/register",JSON.stringify(data),
            {"headers": {
                "Content-Type": "application/json"
                }
            }
        )
        
        if (res.data.result){
            //return res.data.data
            dispatch({
                type:USER_SUCCESS,
                payload:res.data.data
            })

        } else {

            return dispatch({
                type:USER_ERROR,
                payload:res.data.message
            })
        }
    } catch (error) {
       dispatch({
        type:USER_ERROR,
        payload:error.message
       }) 
    }
}


const login=(data)=>async(dispatch)=>{

    try{
        dispatch({
            type:USER_LOADING
        })
        var res = await url.post("/api/auth/login",JSON.stringify(data),
            {"headers": {
                "Content-Type": "application/json"
                }
            }
        )
        
        if (res.data.result){
            //save to local storage
            localStorage.setItem("token",JSON.parse(res.data.data.token))
            //save user Data
            dispatch({
                type:SAVE_USER_LOGIN_DATA
            })

        } else {

            return dispatch({
                type:USER_ERROR,
                payload:res.data.message
            })
        }

    } catch(error){

        dispatch({
            type:USER_ERROR,
            payload:error.message
        })

    }

}

const checkIsEmailExist=(email)=>(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_LOADING
        }) 
        const userEmail=getState().userReducer.userInfo.email
        if(userEmail != email) return dispatch({
            type:USER_ERROR,
            payload:"Email entré incorrect"
        })

        dispatch({
            type:CONFIRM_USER_MAIL,
            payload:email
        })
    } catch (error) {
        dispatch({
            type:USER_ERROR,
            payload:error.message
        })
    }
}


const updateUserPassword=(user_id,userPass)=>async(dispatch)=>{

    try{
        dispatch({
            type:USER_LOADING
        })
        var res = await url.patch("/api/auth/updateUserPass",JSON.stringify({
            id:user_id,
            newPassword:userPass
        }),
            {"headers": {
                "Content-Type": "application/json"
                }
            }
        )
        
        if (res.data.result){
            dispatch({
                type:USER_UPDATE_INFO,
                payload:true
            })

        } else {

            return dispatch({
                type:USER_ERROR,
                payload:res.data.message
            })
        }

    } catch(error){

        dispatch({
            type:USER_ERROR,
            payload:error.message
        })

    }

}

const confirmVerificationCode=(code,email)=>async(dispatch)=>{
        try {
            const res=await url.post(`/api/auth/confirm`,JSON.stringify({
                email,
                code
            }),{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            if(res.data.result){
                //save user data in localStorage
                /*localStorage.setItem("user",JSON.parse({
                    token:res.data.data
                }))*/
                    dispatch({
                        type:CONFIRM_REGISTRATION
                    })
            }else{
                return  dispatch({
                    type:USER_ERROR,
                    payload:res.data.message
                })
            }
        } catch (error) {
            return  dispatch({
                type:USER_ERROR,
                payload:error.message
            })
        }
}


const logout=()=>async(dispatch)=>{
    try {
        //get token from localStorage
        const token= localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
        if(!token) return;
        //clear localStorage 
        localStorage.removeItem("user");
        const res=await url.get(`/api/auth/logout`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(res.data.result){
            //clear localStorage
            localStorage.removeItem("user");
            dispatch({
                type:CLEAR_USER_INFO
            })
            return;
        }

        return  dispatch({
            type:USER_ERROR,
            payload:res.data.message
        })

    } catch (error) {
        dispatch({
            type:USER_ERROR,
            payload:error.message
        })
    }
}

/*const getUserProfile=()=>(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
    const res=await url.get(`${url}/api/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    if(res.data.result){
        return res.data.user
    }

    return {
        message:res.data.message
    }
}*/

export {registerUser, login , logout, confirmVerificationCode,updateUserPassword,checkIsEmailExist}