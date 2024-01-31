import axios from "axios"

import {config} from "./config"

const URL = config.URL

async function signup(data){

    try{
        var res = await axios.post(URL+"/api/auth/register",JSON.stringify(data),
            {"headers": {
                "Content-Type": "application/json"
                }
            }
        )
        
        if (res.data.result){
            return res.data.data

        } else {

            return {message: res.data.status }
        }

    } catch(error){

        return {
            message:error.message
        }

    }

}

async function login(data){

    try{
        var res = await axios.post(URL+"/api/auth/login",JSON.stringify(data),
            {"headers": {
                "Content-Type": "application/json"
                }
            }
        )
        
        if (res.data.result){

            localStorage.setItem("token",JSON.parse(res.data.data.token))

            return true

        } else {

            return {message: res.data.message}
        }

    } catch(error){

        return {
            message:error.message
        }

    }

}

async function confirmRegistration(code,userId){
        try {
            const res=await axios.post(`${URL}/api/auth/confirm`,JSON.stringify({
                id:userId,
                code
            }),{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            if(res.data.result){
                //save user data in localStorage
                localStorage.setItem("user",JSON.parse({
                    token:res.data.data
                }))
            }else{
                return {
                    message:res.data.message
                }
            }
        } catch (error) {
            return {
                message:error.message
            }
        }
}


async function logout(){
    try {
        //get token from localStorage
        const token= localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
        if(!token) return;
        //clear localStorage 
        localStorage.removeItem("user");
        const res=await axios.get(`${URL}/api/auth/logout`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(res.data.result){
            //clear localStorage
            localStorage.removeItem("user");
            return true
        }

        return {
            message:res.data.message
        }

    } catch (error) {
        return {
            message:error.message
        }
    }
}

async function getUserProfile(){
    const res=await axios.get(`${URL}/api/profile`,{
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
}

export {signup, login , logout, confirmRegistration ,getUserProfile}