import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyToken } from '../actions/user'
import Spinner from './Spinner'

function VerifyToken() {
    const dispatch=useDispatch()
    const {success,loading}=useSelector(state => state.userReducer)
    const navigate=useNavigate()
    const {token}=useParams()
        
    useEffect(()=>{
        if(success) {
          window.location.pathname="/login"
        }
    },[success])

    useEffect(()=>{
        dispatch(verifyToken(token))
    },[])
  return (
    <div>
      {loading && <Spinner />}
    </div>
  )
}

export default VerifyToken
