<<<<<<< Updated upstream
import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
=======
>>>>>>> Stashed changes
import "./LogIn.css"
import React, { useState } from "react";
import { logIn } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
<<<<<<< Updated upstream
  const navigate = useNavigate();
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState(""); 


  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
=======
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
>>>>>>> Stashed changes

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< Updated upstream
      const { user } = await signInWithPopup(auth, googleProvider);
      const token = await user.getIdToken();
      console.log("Token de acceso:", token);

      navigate("/HomePage"); 
      alert(`Bienvenido, ${user.displayName}`);
=======
        const user = await logIn(email, password);

        if (user) {
            navigate("/"); // Redirige a la página principal solo si la autenticación fue exitosa
        }
        
>>>>>>> Stashed changes
    } catch (error) {
        setError("Error al iniciar sesión: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log("Email ingresado:", email);
    console.log("Contraseña ingresado:", password);
  
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Extraer el usuario
      console.log("Usuario autenticado:", user);

      // Obtener el token de acceso correctamente
        const token = await user.getIdToken();
        console.log("Token de acceso:", token);

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
<<<<<<< Updated upstream
        <form className="login-form" onSubmit={handleSubmit} >

        
          <label>Correo electronico</label>
=======
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label-login">Correo electronico</label>
>>>>>>> Stashed changes
          <input
            className="input-login"
            type="email"
            placeholder="ingrese su correo"
<<<<<<< Updated upstream
            value={email}
            onChange={(e) => setEmail(e.target.value)}
=======
            onChange={(e) => setEmail(e.target.value)}
            required
>>>>>>> Stashed changes
          />
          <label className="label-login">Contraseña</label>
          <input
            className="input-login"
            type="password"
            placeholder="ingrese su contraseña" 
<<<<<<< Updated upstream
            value={password}
            onChange={(e) => setPassword(e.target.value)}
=======
            onChange={(e) => setPassword(e.target.value)} required
>>>>>>> Stashed changes
          />
          <button className="login-button" type="submit">Iniciar Sesión</button>
          

          </form>
        
      </div>
    </div>
  );
};

export default LogIn;
