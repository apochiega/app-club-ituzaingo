import "./LogIn.css"
import React, { useState } from "react";
import { logIn } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await logIn(email, password);
        
        if (user) {
            navigate("/");
        }
    } catch (error) {
        setError("Error al iniciar sesión: " + error.message);
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
    </div>
  );
};

export default LogIn;
