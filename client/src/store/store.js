// here basically we gather all our redcers and try
//to combine theme in one single store
import {createStore,combineReducers,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "@redux-devtools/extension"
//import our product reducer
import {userReducer,resetUserReducer} from "../reducers/userReducer"
//import our cart reducer
import {articleReducer} from "../reducers/articleReducer"
import {adminReducer} from "../reducers/adminReducer"
const initialState={}

const middleware=[thunk]
const reducer = combineReducers({
   userReducer,
    adminReducer,
    articleReducer,
    resetUserReducer
})

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(
    ...middleware)))


export default store;