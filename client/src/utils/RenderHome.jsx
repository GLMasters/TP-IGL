import { useOutletContext } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import HomeScreen from "../pages/HomePage"
function RenderHome() {
    const [userIsLogged]=useOutletContext()
  return (
    <div>
      {
        userIsLogged ? <LandingPage /> : <HomeScreen />
      }
    </div>
  )
}

export default RenderHome
