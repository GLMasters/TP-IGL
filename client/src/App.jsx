import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage"

function App() {
  
  return (
    <div className="bg-white ">
      <Router>
          <Routes>
                <Route path="/" >
                    <Route path="/" element={<LoginPage />} />
                </Route>
          </Routes>
      </Router>
    </div>
  )
}

export default App
