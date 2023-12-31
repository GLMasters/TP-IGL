import React from 'react'
import {Outlet} from "react-router-dom"
import HomeNavbar from './components/HomeNavbar'
import AuthNavbar from "./components/AuthNavbar"
function AppLayout() {
  const userIsLogged=true;
  return (
    <div>
    {
      userIsLogged ? <AuthNavbar /> :<HomeNavbar />
    }
      <Outlet />
    </div>
  )
}

export default AppLayout
