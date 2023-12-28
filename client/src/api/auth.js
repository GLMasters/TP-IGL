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
            return true

        } else {

            return {message: res.data.message}
        }

    } catch(err){

        return false

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

    } catch(err){

        return false

    }

}

export {signup, login}