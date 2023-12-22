import { createContext, useReducer } from "react";

const reducer=(state,action)=>{
    switch (action.type) {
        case "OP_LOADING":
            return {
                ...state,loading:true
            }
        case "OP_SUCCEED":
            return {
                ...state,success:true
            }
        case "EMAIL_NON_VALID":
            return {
                ...state,
                success:false,
                error:action.payload
            }
        case "OP_FAILED":
            return {
                ...state,
                error:action.payload
            }

    
        default:
            break;
    }
}

export const resetPasswordContext=createContext()

export const ResetPassProvider=({children})=>{
    const initialState={
        email:"",
        newPassword:"",
        errorMessage:"",
        loading:false,
        success:false
    }

    const [state,dispatch]=useReducer(reducer,initialState)
    const checkEmail=(email)=>{
            try {
                dispatch({
                    type:"OP_LOADING"
                })
                //call the api to check if email exist
                //if (success)
                dispatch({
                    type:"OP_SUCCEED",
                    payload:true
                })
                //if(false)
                dispatch({
                    type:"EMAIL_NON_VALID",
                    payload:"Address e-mail non valide"
                })
            } catch (error) {
                dispatch({
                    type:"OP_FAILED",
                    payload:error.message
                })
            }
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

    const checkConfirmationCode=(code)=>{
            try {
                dispatch({
                    type:"OP_LOADING"
                })
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
            checkConfirmationCode
        }}>
                {children}
        </resetPasswordContext.Provider>
    )
}