import {USER_UPDATE_INFO,CLEAR_USER_INFO,USER_ERROR,SAVE_CONFIRMATION_CODE, USER_LOADING,USER_SUCCESS, SAVE_USER_LOGIN_DATA,USER_FAIL, CONFIRM_USER_MAIL,SAVE_ENTERED_EMAIL} from "../constants/userActions"

const initialState={
    loading:false,
    userInfo:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    error:"",
    successMessage:"",
    generatedToken:"",
    success:false
}
export const userReducer=(state=initialState,action)=>{
    switch (action.type) {
        case USER_LOADING:
            return {...state,loading:true,success:false,error:"",successMessage:""}
        case USER_SUCCESS:
            return {
                ...state,loading:false,success:true,
                successMessage:action.payload
            }
        case SAVE_USER_LOGIN_DATA:
            return {userInfo:action.payload,loading:false,success:true}
        case USER_ERROR:
            return {...state,loading:false,error:action.payload,success:false}
        case CLEAR_USER_INFO:
            return {...state,success: false,userInfo:{}}
        default: return state
    }
}

const initialState2={
    success:false,
    loading:false,
    code:"",
    email:"",
    id: null,
    error:""
}
export const resetUserReducer=(state=initialState2,action)=>{
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading:true,
                success:false
            }
        case SAVE_ENTERED_EMAIL:
            return {
                ...state,
                email:action.payload
            }
        case USER_UPDATE_INFO:
            return {
                ...state,loading:false,success:true
            }
        case CONFIRM_USER_MAIL:
            return {
                ...state,
                loading:false,
                success:true
            }
        case USER_FAIL:
            return {
                ...state,
                loading:false,
                success:false,
                error:action.payload
            }
        case SAVE_CONFIRMATION_CODE:
            return {
                ...state,
                loading: false,
                id: action.payload.id
            }

        default:
            return state
    }
}


