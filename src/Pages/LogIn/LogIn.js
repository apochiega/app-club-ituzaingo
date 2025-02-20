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
        <button onClick={handleGoogleLogin} className="google-button">
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default LogIn;
