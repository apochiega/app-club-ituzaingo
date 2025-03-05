import "./LogIn.css"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logIn, getUserRole } from "../../services/AuthService"; // Asegúrate de importar getUserRole
import { auth } from "../../services/firebase";
import apiService from "../../services/axiosWrapper";

// Componente Modal de Error
const ErrorModal = ({ message, onClose }) => (
    <div className="error-modal">
        <div className="error-modal-content">
            <h3>Error</h3>
            <p>{message}</p>
            <button onClick={onClose}>Cerrar</button>
        </div>
        <style>{`
            .error-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5); 
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }

            .error-modal-content {
                background-color: white;
                padding: 20px;
                border: 3px solid #2E7D32; 
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                text-align: center;
                width: 90%;
                max-width: 400px;
            }

            .error-modal-content h3 {
                margin: 0;
                font-size: 22px;
                color: #2E7D32; 
            }

            .error-modal-content p {
                margin: 15px 0;
                color: #D32F2F; 
                font-weight: bold;
            }

            .error-modal-content button {
                background-color: #2E7D32; 
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s;
            }

            .error-modal-content button:hover {
                background-color: #1B5E20; 
            }
        `}</style>
    </div>
);





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

            // Comprobar si el rol está cacheado
            let role = sessionStorage.getItem(`role_${user.uid}`);
            if (!role) {
                role = await getUserRole(user.uid);
                // Guarda en cache si se obtuvo el rol
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