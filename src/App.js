import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { auth } from "./services/firebase.js";
import { getUserRole } from "./services/AuthService";
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
            if (user) {
                setUser(user);
                sessionStorage.setItem("accessToken", user.accessToken);
                sessionStorage.setItem("uid", user.uid);

                // Obtener el rol del usuario
                const roleFromFirestore = await getUserRole(user.uid);
                console.log("Nuevo usuario detectado. Rol en Firestore:", roleFromFirestore);
                setRole(roleFromFirestore);
            } else {
                setUser(null);
                setRole(null);
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("uid");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
        <Router>
            <div className="App">
                {user && role === "admin" && <Header />}
                <Row>
                    <Col>
                        <Routes>
                            {/* Si no hay usuario o el rol no es admin, siempre mostramos LogIn */}
                            {user && role === "admin" ? (
                                <>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/HomePage" element={<HomePage />} />
                                    <Route path="/UserPage" element={<UserPage />} />
                                    <Route path="/PackagePage" element={<PackagesPage />} />
                                    <Route path="/HistoryPage" element={<HistoryPage />} />
                                    <Route path="/login" element={<Navigate to="/" />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/login" element={<LogIn />} />
                                    <Route path="/*" element={<Navigate to="/login" />} />
                                </>
                            )}
                        </Routes>
                    </Col>
                </Row>
            </div>
        </Router>
    );
}

export default App;
