import {USER_ERROR,USER_SUCCESS,USER_UPDATE_INFO,USER_LOADING,SAVE_USER_LOGIN_DATA,CONFIRM_USER_MAIL,CLEAR_USER_INFO, SAVE_CONFIRMATION_CODE} from "../constants/userActions"

import axios from "axios"


import {config} from "./config"

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
            

            dispatch({
                type:SAVE_CONFIRMATION_CODE,
                payload:res.data.data
            })

        } else {

            var message= "" ;

            switch(res.data.status){

                case 103:
                    message = "Email Invalid" ;
                    break ;
                
                case 101:
                    message= "Compte déja existant"
                    break
                
                case 500:
                    message = "Erreur Serveur, Veuillez Ressayer"
                    break

            }

            return dispatch({
                type:USER_ERROR,
                payload:message
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
            localStorage.setItem("user",
                JSON.stringify({
                    "token": res.data.data.token, 
                    "role_id":res.data.data.role_id
                })
            ) ;

            //save user Data
            dispatch({
                type:SAVE_USER_LOGIN_DATA,
                payload: res.data.data
            })

        } else {
            console.log("error")

            return dispatch({
                type:USER_ERROR,
                payload:res.data.message
            })
        }

    } catch(error){

        console.log(error) ;

        dispatch({
            type:USER_ERROR,
            payload:error.message
        })

    }

}

const checkIsEmailExist=(email)=>async(dispatch)=>{
    try {
        console.log(email)
        dispatch({
            type:USER_LOADING
        }) 
        //const userEmail=getState().userReducer.userInfo.email
        const res=await url.post("/api/auth/forgot",JSON.stringify({
            email
        }),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(res.data)
        if(res.data?.result){
            dispatch({
                type:USER_SUCCESS,
                payload:"vérifiez votre boite d'email"
            })
        }else{
            dispatch({
                type:USER_ERROR,
                payload:"vérifiez votre email"
            })
        }
        /*if(userEmail != email) return dispatch({
            type:USER_ERROR,
            payload:"Email entré incorrect"
        })
*/
       /* dispatch({
            type:CONFIRM_USER_MAIL,
            payload:email
        })*/
    } catch (error) {
        dispatch({
            type:USER_ERROR,
            payload:error.message
        })
    }
}


const updateUserPassword=(oldPassword,newPassword)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_LOADING
        })
        var res = await url.put("/api/profile/changepassword",JSON.stringify({
            old_password:oldPassword,
            new_password:newPassword
        }),
            {"headers": {
                "Authorization":`Bearer ${getState().userReducer.userInfo.token}`,
                "Content-Type": "application/json"
                }
            }
        )
        
        console.log(res.data)
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

const confirmVerificationCode=(code,id)=>async(dispatch)=>{
        try {
            console.log(code) ;
            console.log(id) ;

            const res=await url.post(`/api/auth/confirm`,JSON.stringify({
                id,
                code: Number(code)
            }),{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            console.log(res.data) ;

            if(res.data.result){
                //save user data in localStorage
                /*localStorage.setItem("user",JSON.parse({
                    token:res.data.data
                }))*/
                    dispatch({
                        type:CONFIRM_USER_MAIL
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


const verifyToken=(generated_token)=>async(dispatch)=>{
    try {

        dispatch({
            type:USER_LOADING
        })
        const res=await url.get(`/api/auth/reset/${generated_token}`)
        if(res.data?.result){
            dispatch({
                type:USER_SUCCESS
            })
        }else{
            dispatch({
                type:USER_ERROR,
                payload:"something went wrong"
            })
        }
    } catch (error) {
        dispatch({
            type:USER_ERROR,
            payload:error.message
        })
    }
}

const logout=()=>async(dispatch)=>{
    try {
        //get token from localStorage
        const token= localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null


        if(!token) return;

        console.log(token) ;
        const res=await url.post(`/api/auth/logout`,{},{
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

export {registerUser, login , logout, confirmVerificationCode,updateUserPassword,checkIsEmailExist,verifyToken}