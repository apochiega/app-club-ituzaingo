import "./LogIn.css"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logIn, getUserRole } from "../../services/AuthService"; // Asegúrate de importar getUserRole
import { auth } from "../../services/firebase";
import apiService from "../../services/axiosWrapper";
import ErrorModal from "../../Components/Modal/ErrorModal";





const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    // Leer error desde query params
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const errorParam = query.get("error");
        if (errorParam) {
            setError(errorParam);
        }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // Autenticar usuario
            const user = await logIn(email, password);
            if (!user) throw new Error("Credenciales incorrectas.");

            // Llamada a logUser para registrar el inicio de sesión en el backend
            await apiService.logUser();

            // Comprobar si el rol está cacheado
            let role = sessionStorage.getItem(`role_${user.uid}`);
            if (!role) {
                role = await getUserRole(user.uid);
                if (role) {
                    sessionStorage.setItem(`role_${user.uid}`, role);
                }
            }
            console.log("Rol obtenido:", role);

            if (!role || role !== "admin") {
                await auth.signOut();
                setError("No tienes permisos para acceder.");
                setLoading(false);
                return;
            }

            // Redirigir cuando todo es correcto
            navigate("/");
        } catch (error) {
            console.error("Error en inicio de sesión:", error);
            setError("Las credenciales ingresadas son incorrectas o no tienes permiso para acceder.");
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/image.png" alt="Ituzaingó Padel" className="logo" />
                <h2>Iniciar sesión</h2>
                <p>Ingrese sus credenciales para acceder al panel de administración</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="label-login">Correo electrónico</label>
                    <input
                        className="input-login"
                        type="email"
                        placeholder="Ingrese su correo"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="label-login">Contraseña</label>
                    <input
                        className="input-login"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="login-button" type="submit" disabled={loading}>
                        {loading ? "Validando permisos..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>

            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
        </div>
    );
};

export default LogIn;