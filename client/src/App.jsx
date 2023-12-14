import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import HomeScreen from "./pages/HomeScreen"
import AppLayout from "./AppLayout"
function App() {
  
  return (
    <div>
      <Router>
          <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<HomeScreen />} />
                </Route>
          </Routes>
      </Router>
    </div>
  )
}

export default App
