import React from "react";
import Header from "../../Components/Header/Header";
import { useState } from "react";
import { useEffect } from "react";
import StickyHeadTable from "../../Components/Tables/userTable";
import "./UserPage.css";

const UserPage = ()=>{

    const [userNumber, setUserNumber] = useState("");
    const [cedula,setCedula]= useState("");

    const handleSearchUser = () => {
        //peticion a la api para encontrar el usuario
    };
    
    return(
        <div>
            <div className="fs-2 fw-bold">
                Usuarios
            </div>
            <div className="d-flex gap-3 mt-4 w-50">
                <input
                type="text"
                className="form-control w-50"
                value={userNumber}
                onChange={(e) => setUserNumber(e.target.value)}
                placeholder="Ingrese el numero de socio"
                />
                <button className="btn btn-success" onClick={handleSearchUser}> Buscar </button>
            </div>
            <div className="mt-5 ">
                <StickyHeadTable/>
            </div>
        </div>
    )
}

export default UserPage;