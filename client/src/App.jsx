import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import HomeScreen from "./pages/HomePage"
import AppLayout from "./AppLayout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import VerifyEmailScreen from "./pages/VerifyEmailScreen"
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen"
import ChangerPasswordPage from "./pages/ChangerPasswordPage"
//import resetPassProviderq
import { ResetPassProvider } from "./context/resetPassContext"
import EditUserPassword from "./pages/EditUserPassword"
import Favoris from "./pages/Favoris"
import About from "./pages/About"
import LandingPage from "./pages/LandingPage"
import ArticlesScreen from "./pages/ArticlesScreen"
function App() {
  
  return (
    <div>
    <ResetPassProvider>
      <Router>
          <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={false ? <HomeScreen /> : <LandingPage />} />
                    <Route path="/editUserPassword" element={<EditUserPassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/favoris" element={<Favoris />} />
                    <Route path="/article/:articleId" element={<ArticlesScreen />} />
                </Route>
                <Route path="/login" element={<LoginPage />}  />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/verifyEmail" element={<VerifyEmailScreen />} />
                <Route path="/forgotPass" element={<ForgotPasswordScreen />} />
                <Route path="/changePassword" element={<ChangerPasswordPage />} />
                <Route path="*" element={<p>Not Found oops</p>} />
                
           </Routes>
      </Router>
      </ResetPassProvider>
    </div>
  )
}

export default App
