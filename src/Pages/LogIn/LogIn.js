import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase";
import "./LogIn.css"

const LogIn = () => {
  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      alert(`Bienvenido, ${user.displayName}`);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("Hubo un error al iniciar sesión con Google. Inténtalo de nuevo.");
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-card">
        <img src="/image.png" alt="Ituzaingó Padel" className="logo" />
        <h2 className="login-title">Iniciar sesión</h2>
        <p>Ingrese sus credenciales para acceder al panel de administración</p>
        <form className="login-form" >

        
          <label>Correo electronico</label>
          <input
            type="email"
            placeholder="ingrese su correo"
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="ingrese su contraseña" 
          />
          <button type="submit">Iniciar Sesión</button>
          

          </form>
        
      </div>
    </div>
  );
};

export default LogIn;
