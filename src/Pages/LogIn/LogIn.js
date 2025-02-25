import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LogIn.css"

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState(""); 


  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const token = await user.getIdToken(); 
      navigate("/HomePage"); 
      alert(`Bienvenido, ${user.displayName}`);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("Hubo un error al iniciar sesión con Google. Inténtalo de nuevo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log("Email ingresado:", email);
    console.log("Contraseña ingresado:", password);

  
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert(`Bienvenido, ${userCredential.user.email}`);
      navigate("/HomePage");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.code, error.message);
      alert("Correo o contraseña incorrectos.");
    }
  };


  return (
    
    <div className="login-container">
      <div className="login-card">
        <img src="/image.png" alt="Ituzaingó Padel" className="logo" />
        <h2>Iniciar sesión</h2>
        <p>Ingrese sus credenciales para acceder al panel de administración</p>
        <form className="login-form" onSubmit={handleSubmit} >

        
          <label>Correo electronico</label>
          <input
            type="email"
            placeholder="ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="ingrese su contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
          

          </form>
        
      </div>
    </div>
  );
};

export default LogIn;
