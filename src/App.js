import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { auth } from "./services/firebase.js";
import HomePage from "./Pages/HomePage/HomePage";
import UserPage from "./Pages/UserPage/UserPage.jsx";
import PackagesPage from "./Pages/PackagesPage/PackagesPage";
import HistoryPage from "./Pages/HistoryPage/HistoryPage";
import Header from "./Components/Header/Header";
import LogIn from "./Pages/LogIn/LogIn";
import { Container, Row, Col } from "react-bootstrap";

function App() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            sessionStorage.setItem("accessToken", user?.accessToken);
            sessionStorage.setItem("uid", user?.uid);
            // console.log(user?.accessToken);
            // console.log(user?.uid);
            if (user) {
                setRole(role);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
      <Router>
          <div className="App">
                {user && <Header />}
                  <Row>
                      <Col >
                      <Routes>
                          <Route path="/login" element={!user ? <LogIn /> : <Navigate to="/" />} />
                          {user ? (
                              <>
                                  <Route path="/" element={<HomePage />} />
                                  <Route path="/HomePage" element={<HomePage />} />
                                  <Route path="/UserPage" element={<UserPage />} />
                                  <Route path="/PackagePage" element={<PackagesPage />} />
                                  <Route path="/HistoryPage" element={<HistoryPage />} />
                              </>
                          ) : (
                              <Route path="/*" element={<Navigate to="/login" />} />
                          )}
                      </Routes>

                      </Col>
                  </Row>
          </div>
      </Router>
    );
}

export default App;
