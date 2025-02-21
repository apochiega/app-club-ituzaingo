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
      const token = await user.getIdToken();


      const response = await fetch("http://127.0.0.1:8000/login/protected", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        alert(`Bienvenido, ${user.displayName}. Acceso autorizado.`);
      } else {
        alert("Acceso denegado. Token inválido.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("Hubo un error al iniciar sesión con Google. Inténtalo de nuevo.");
    }
  };



  return (
    <div className="login-container">
      <h3>Login</h3>
      <h2>Iniciar sesión</h2>
      <p>Ingrese sus credenciales para acceder al panel de administración</p>
      <div className="login-card">
        <button onClick={handleGoogleLogin} className="google-button">
          Iniciar sesión con Google
        </button>
      </div>
    </div>

  );
};

export default LogIn;
