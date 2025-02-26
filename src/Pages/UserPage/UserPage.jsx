import React from "react";
import Header from "../../Components/Header/Header";
import { useState } from "react";
import { useEffect } from "react";
import UserTable from "../../Components/Tables/UserTable";
import GreenButton from "../../Components/greenButton/greenButton";
import "./UserPage.css";


const UserPage = ()=>{

    const [userNumber, setUserNumber] = useState("");

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
                <GreenButton text="Buscar" minWidth="20%" onClick={handleSearchUser} />
            </div>
            <div className="mt-5 ">
                <UserTable/>
            </div>
        </div>
    )
}

export default UserPage;