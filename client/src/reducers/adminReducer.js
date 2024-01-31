import {
    ADD_MODERATOR,
    DELETE_MODERATOR,
    EDIT_MODERATOR,
    UPLOAD_ARTICLE,
    ADMIN_ACTION_SUCCESS,
    ADMIN_FAIL_ACTION,
    ADMIN_LOADING,
    GET_MODERATORS
} from "../constants/adminActions"
const initialState={
    loading:false,
    moderators:[],
    error:"",
    success:false
}
export const adminReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ADMIN_LOADING:
            return {...state,loading:true,success:false}
        case GET_MODERATORS:
            return {
                ...state,
                success:true,
                moderators:action.payload,
                loading:false
            }
        case ADD_MODERATOR:
            state.moderators.push(action.payload)
            return {
                loading:false,
                moderators:state.moderators,
                success:true
            }
        case DELETE_MODERATOR:
            state.moderators=state.moderators.filter(mod => mod._id != action.payload.mod_id)
            return {...state,loading:false,error:action.payload,success:false}
        case EDIT_MODERATOR:
            state.moderators=state.moderators.map(mod => {
                if(mod._id == action.payload.mod_id) {
                    mod=newModeratorInfo
                }
                return mod
            })
            return {...state,loading:false,error:action.payload,success:false}
        case UPLOAD_ARTICLE:
            return state
        case ADMIN_FAIL_ACTION:
            return {
                ...state,loading:false,success:false,error:action.payload
            }
        case ADMIN_ACTION_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true
            }
        default: return state
    }
}
