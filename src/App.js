import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPages/UserPage';
import PackagePage from './Pages/PackagePage/packagePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/UserPage" element={<UserPage/>}/>
          <Route path="/HomePage" element={<HomePage/>}/>
          <Route path="/PackagePage" element={<PackagePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
