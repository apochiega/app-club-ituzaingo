import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";


const Header = ()=>{

    const navigate= useNavigate();
    
    const handleClick = ()=>{
        navigate("/HomePage");
    }
    
    return(
        <div className="d-flex justify-content-between align-items-center">
            <div className="">
                <img className="img"  src="/padelogo.png" alt="logo"></img>
            </div>
            <div className="d-flex gap-3 mb-2 mx-1">
                <button className="btn btn-success btn-lg logout" onClick={handleClick} alt="log in">Inicio</button>
                <button className="btn btn-danger btn-lg ml-2 inicio" alt="log out">Logout</button>
            </div>
        </div>
    )
}

export default Header;