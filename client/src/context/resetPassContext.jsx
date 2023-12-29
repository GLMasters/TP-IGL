import { createContext, useReducer } from "react";
import {validate} from "react-email-validator"
import { confirmRegistration } from "../api/auth";
const reducer=(state,action)=>{
    switch (action.type) {
        case "OP_LOADING":
            return {
                ...state,loading:true
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                errorMessage:""
            }
        case "OP_SUCCEED":
            return {
                ...state,success:true
            }
        case "EMAIL_NON_EXIST":
            return {
                ...state,
                success:false,
                errorMessage:action.payload
            }
        case "OP_FAILED":
            return {
                ...state,
                errorMessage:action.payload
            }
        case "ENTER_EMAIL":
            return {
                ...state,
                email:action.payload
            }
        case "SAVE_USER_INFO":
            return {
                ...state,
                email:action.payload.email,
                userId:action.payload.id
            }
        default:
            return state
    }
}

export const resetPasswordContext=createContext()

export const ResetPassProvider=({children})=>{
    const initialState={
        email:"",
        userId:"",
        newPassword:"",
        errorMessage:"",
        loading:false,
        success:false
    }

    const [state,dispatch]=useReducer(reducer,initialState)
    const checkEmail=()=>{
            try {
                //check if the email spelled correctly
                if(!validate(state.email)){
                    dispatch({
                        type:"OP_FAILED",
                        payload:"email format invalid"
                    })
                    return;
                }
                dispatch({
                    type:"OP_LOADING"
                })
                //use state.email    
                //call the api to check if email exist
                //if (success)
                dispatch({
                    type:"OP_SUCCEED",
                    payload:true
                })
                //if(false)
                dispatch({
                    type:"EMAIL_NON_EXIST",
                    payload:"Adress e-mail does not exist"
                })
            } catch (error) {
                dispatch({
                    type:"OP_FAILED",
                    payload:error.message
                })
            }
    }

    const enterEmail=(e)=>{
            dispatch({
                type:"ENTER_EMAIL",
                payload:e.target.value
            })
    }

    const clearError=()=>{
        dispatch({
            type:"CLEAR_ERROR"
        })
    }

    const changePassword=()=>{
        try {
            dispatch({
                type:"OP_LOADING"
            })
            //call the api to update
            //if any error happens catch block will runs else 
            dispatch({
                type:"OP_SUCCEED",
                payload:"password has changed successufuly"
            })

        } catch (error) {
            dispatch({
                type:"OP_FAILED",
                payload:error.message
            })
        }
    }


    const saveUserInfo=(userInfo)=>{
        dispatch({
            type:"SAVE_USER_INFO",
            payload:userInfo
        })
    }

    const checkConfirmationCode=async()=>{
            try {

                if(!code){ dispatch({
                    type:"OP_FAILED",
                    payload:"type your code !"
                })
                return;
                }
                
                dispatch({
                    type:"OP_LOADING"
                })
                //call confirmRegistration method
                const res =await confirmRegistration(state.code,state.userId)
                //check the code (call api)
                //if(code entered is true)
                dispatch({
                    type:"OP_SUCCEED"
                })

                //else
                dispatch({
                    type:"OP_FAILED",
                    payload:"code confirmation non valide"
                })

            } catch (error) {
                dispatch({
                    type:"OP_FAILED",
                    payload:error.message
                })
            }
    }

    return (
        <resetPasswordContext.Provider value={{
            state,
            checkEmail,
            changePassword,
            checkConfirmationCode,
            enterEmail,
            clearError,
            saveUserInfo
        }}>
                {children}
        </resetPasswordContext.Provider>
    )
}