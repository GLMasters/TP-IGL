import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HomeNavbar from './components/HomeNavbar';
import AuthNavbar from './components/AuthNavbar';
import HomeScreen from './pages/HomePage';
import Footer from './components/Footer';
function ProtectedRoute() {
  const userIsLogged = true;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userIsLogged) navigate('/login');
    return;
  }, [userIsLogged]);
  return (
    <div>
      {userIsLogged ? <AuthNavbar /> : <HomeNavbar />}
      {userIsLogged && <Outlet context={[userIsLogged]} />}
      
    </div>
  );
}

export default ProtectedRoute;
