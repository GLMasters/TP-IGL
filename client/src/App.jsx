import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import HomeScreen from "./pages/HomeScreen"
import AppLayout from "./AppLayout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import VerifyEmailScreen from "./pages/VerifyEmailScreen"
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen"
import ChangerPasswordPage from "./pages/ChangerPasswordPage"
//import resetPassProvider
import { ResetPassProvider } from "./context/resetPassContext"
function App() {
  
  return (
    <div>
    <ResetPassProvider>
      <Router>
          <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<HomeScreen />} />
                </Route>
                <Route path="/login" element={<LoginPage />}  />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/verifyEmail" element={<VerifyEmailScreen />} />
                <Route path="/forgotPass" element={<ForgotPasswordScreen />} />
                <Route path="/changePassword" element={<ChangerPasswordPage />} />
                
           </Routes>
      </Router>
      </ResetPassProvider>
    </div>
  )
}

export default App
