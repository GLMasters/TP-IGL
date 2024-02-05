import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ForgotPasswordScreen from "./pages/ForgotPasswordScreenPage"
import EditUserPassword from "./pages/EditUserPasswordPage"
import Favoris from "./pages/FavorisPage"
import About from "./pages/AboutPage"
import Profile from "./pages/MyProfilePage"
import RenderHome from "./utils/RenderHome"
import ArticlesScreen from "./pages/ArticlePage"
import AdminScreen from "./pages/AdminPage"
import CodeVerificationPage from "./pages/CodeVerificationPage"
import ModerateurPage from "./pages/ModerateurPage"
import EditArticleModeratorPage from "./pages/EditArticleModeratorPage"
import Spinner from "./components/Spinner"
import VerifyToken from "./components/VerifyToken"
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
                    <Route path="/myProfile" element={<Profile />} />
                    <Route path="/article/:articleId" element={<ArticlesScreen />} />
                    <Route path="/admin" element={<AdminScreen />} />
                    <Route path="/moderator/:modId" element={<ModerateurPage />} />
                    <Route path="/moderator/editArticle" element={<EditArticleModeratorPage />} />
                </Route>
                <Route path="/login" element={<LoginPage />}  />
                
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/verifyEmail" element={<CodeVerificationPage />} />
                <Route path="/verifyToken/:token" element={<VerifyToken />} />
                <Route path="/forgotPass" element={<ForgotPasswordScreen />} />
                <Route path="/changePassword" element={<ResetPasswordPage />} />
                <Route path="*" element={<p>Not Found oops</p>} />
                
           </Routes>
      </Router>
    </div>
  )
}

export default App
