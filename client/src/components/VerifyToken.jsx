import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { verifyToken } from '../actions/user'
import {SAVE_TOKEN_OF_FORGET} from "../constants/userActions"
import Spinner from './Spinner'
import SuccessMessage from './SuccessMessage'

function VerifyToken() {
    const dispatch=useDispatch()
    const {success,loading}=useSelector(state => state.resetUserReducer)
    const {token}=useParams()

    useEffect(()=>{
        dispatch({
          type:SAVE_TOKEN_OF_FORGET,
          payload:token
        })
        dispatch(verifyToken(token))
    },[])
  return (
    <div className='h-screen flex items-center justify-center bg-gray'>
      {loading && <Spinner />}
      {success && <SuccessMessage message={"Vérification de votre compte est réussite"} isOkBtn={false} link={"/changePassword"} />}
    </div>
  )
}

export default VerifyToken
