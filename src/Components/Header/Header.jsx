import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ()=>{

    const navigate= useNavigate();
    
    const handleClick = ()=>{
        navigate("/HomePage");
    }
    
    return(
        <div className="d-flex justify-content-between align-items-center header-container">
            <div className="image-container">
                <img className="w-25 image"  src="/padelogo.png" alt="logo"></img>
            </div>
            <div className="d-flex gap-3">
                <button className="btn btn-lg login green-button" onClick={handleClick} alt="log in">Inicio</button>
                <button className="btn btn-lg ml-2 red-button" alt="log out">Logout</button>
            </div>
        </div>
    )
}

export default Header;