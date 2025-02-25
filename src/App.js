import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import PackagePage from './Pages/PackagePage/packagePage';
import LogIn from './Pages/LogIn/LogIn';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/HomePage" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/PackagePage" 
            element={
              <ProtectedRoute>
                <PackagePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/UserPage" 
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
