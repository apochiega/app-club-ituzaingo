import React from "react";
import Header from "../../Components/Header/Header";
import "./UserPage.css"
import { useState } from "react";

const UserPage = ()=>{

    const [userNumber, setUserNumber] = useState("");
    const [cedula,setCedula]= useState("");

    const handleSearchUser = () => {
        //peticion a la api para encontrar el usuario
    };
    
    return(
        <div className="container-flex mx-5 mt-2">
            <div>
                <Header/>
            </div>
            <div className="">
                <div className="title">
                    Usuarios
                </div>
                <div className="search-container mt-5">
                        <input
                        type="text"
                        className="form-control"
                        value={userNumber}
                        onChange={(e) => setUserNumber(e.target.value)}
                        placeholder="Ingrese el numero de socio"
                        />
                        <input
                        type="text"
                        className="form-control"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        placeholder="Ingrese la cedula"
                        />
                        <button className="btn btn-success" onClick={handleSearchUser}> Buscar </button>
                </div>
            </div>
        </div>
    )
}

export default UserPage;