import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import HomeScreen from "./pages/HomeScreen"
import AppLayout from "./AppLayout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
function App() {
  
  return (
    <div>
      <Router>
          <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<HomeScreen />} />
                </Route>
                <Route path="/login" element={<LoginPage />}  />
                <Route path="/register" element={<SignUpPage />} />
           </Routes>
      </Router>
    </div>
  )
}

export default App
