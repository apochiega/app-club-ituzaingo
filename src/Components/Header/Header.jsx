import React from "react";

const Header = ()=>{

    return(
        <div className="d-flex justify-content-between align-items-center">
            <div className="">
                <img className="w-25"  src="/padelogo.png" alt="logo"></img>
            </div>
            <div className="d-flex gap-3">
                <button className="btn btn-success btn-lg " alt="log in">Inicio</button>
                <button className="btn btn-danger btn-lg ml-2" alt="log out">Logout</button>
            </div>
        </div>
    )
}

export default Header;