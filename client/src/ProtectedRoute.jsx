import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HomeNavbar from './components/HomeNavbar';
import AuthNavbar from './components/AuthNavbar';
import HomeScreen from './pages/HomePage';
import Footer from './components/Footer';
import {useSelector} from "react-redux"

function ProtectedRoute() {
  const {userInfo} = useSelector(state=>state.userReducer) ;

  const navigate = useNavigate();
  useEffect(() => {

    if (!userInfo.role_id) {
      navigate('/login');
    }
    return;
  }, [userInfo.role_id]);
  return (
    <div>
      {userInfo.role_id ? <AuthNavbar /> : <HomeNavbar />}
      {userInfo.role_id && <Outlet context={[userInfo.role_id]} />}
      
    </div>
  );
}

export default ProtectedRoute;
