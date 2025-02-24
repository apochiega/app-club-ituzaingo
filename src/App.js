import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import PackagePage from './Pages/PackagePage/packagePage';
import StickyHeadTable from './Components/Tables/userTable';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/HomePage" element={<HomePage/>}/>
          <Route path="/PackagePage" element={<PackagePage/>}/>
          <Route path="/UserPage" element={<UserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
