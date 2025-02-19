import React, { useState } from 'react';
import "./UserPage.css";
import { app } from "../../firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const UserPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
   
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
  
    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("Usuario autenticado con Google:", user);
        alert(`Bienvenido, ${user.displayName}`);
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
        alert("Hubo un error al iniciar sesión con Google. Inténtalo de nuevo.");
      }
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
      console.log('Intento de login:', { email, password });
    };
  
    return (
      <div className="userpage-container">
        <div className="userpage-card">
          <h1 className="userpage-title">Iniciar Sesión</h1>
          <form onSubmit={handleLogin} className="userpage-form">
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="userpage-button">Iniciar Sesión</button>
          </form>
  
          <button onClick={handleGoogleLogin} className="userpage-button google-button">
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    );
  };
  
  export default UserPage;