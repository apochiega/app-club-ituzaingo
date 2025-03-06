import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import GreenButton from "../greenButton/greenButton";
import { logOut } from "../../services/AuthService"; // Importamos la función de logout

const Header = ()=>{

    const navigate= useNavigate();
    
    const handleClick = ()=>{
        navigate("/HomePage");
    }
    
    // Función para manejar el Logout
    const handleLogout = async () => {
        await logOut();
        navigate("/login"); // Redirigir al usuario al Login después de cerrar sesión
    };

    return(
        <div className="d-flex justify-content-between align-items-center">
            <div className="imagee">
                <img className="w-25 image"  onClick={handleClick} src="/padelogo.png" alt="logo"></img>
            </div>
            <div className="d-flex gap-3">
                <button className="btn btn-danger btn-md ml-2 inicio" alt="log out" onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </div>
    )
}

export default Header;