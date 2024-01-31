import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ForgotPasswordScreen from "./pages/ForgotPasswordScreenPage"
import EditUserPassword from "./pages/EditUserPasswordPage"
import Favoris from "./pages/FavorisPage"
import About from "./pages/AboutPage"
import RenderHome from "./utils/RenderHome"
import ArticlesScreen from "./pages/ArticlesPage"
import AdminScreen from "./pages/AdminPage"
import CodeVerificationPage from "./pages/CodeVerificationPage"
function App() {
  
  return (
    <div>
      <Router>
          <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<RenderHome />} />
                    <Route path="/editUserPassword" element={<EditUserPassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/favoris" element={<Favoris />} />
                    <Route path="/article/:articleId" element={<ArticlesScreen />} />
                    <Route path="/admin" element={<AdminScreen />} />
                </Route>
                <Route path="/login" element={<LoginPage />}  />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/verifyEmail" element={<CodeVerificationPage />} />
                <Route path="/forgotPass" element={<ForgotPasswordScreen />} />
                <Route path="/changePassword" element={<ResetPasswordPage />} />
                <Route path="*" element={<p>Not Found oops</p>} />
                
           </Routes>
      </Router>
    </div>
  )
}

export default App
