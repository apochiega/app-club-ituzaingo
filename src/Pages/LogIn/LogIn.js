import "./LogIn.css"
import React, { useState } from "react";
import { logIn } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import apiService from "../../axiosApiService/axiosWrapper";

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

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await logIn(email, password);
            await apiService.logUser();
            
            if (user) {
                navigate("/");
            }
        } catch (error) {
            console.log(error.message);
            setError("Las credenciales ingresadas son incorrectas. Por favor, verificá tus datos e intentá nuevamente.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/image.png" alt="Ituzaingó Padel" className="logo" />
                <h2>Iniciar sesión</h2>
                <p>Ingrese sus credenciales para acceder al panel de administración</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="label-login">Correo electronico</label>
                    <input
                        className="input-login"
                        type="email"
                        placeholder="ingrese su correo"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="label-login">Contraseña</label>
                    <input
                        className="input-login"
                        type="password"
                        placeholder="ingrese su contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="login-button" type="submit">Iniciar Sesión</button>
                </form>
            </div>

            {/* Mostrar el modal de error si existe un mensaje */}
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
        </div>
    );
};

export default LogIn;
