import React from "react";
import "./HomePage.css"
import ImagesButton from "../../Components/ImagesButton/ImagesButton";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate= useNavigate();

    return (
        <div>
            <div>
                <div className="title">
                    Panel de administración del club
                </div>
                <div className="button-container">
                    <ImagesButton text="Paquetes" image="./canchapadel.jpg" onClick={()=> navigate("/PackagePage")} fontSize="1.6em"/>
                    <ImagesButton text="Usuarios" image="./canchapadel.jpg" onClick={()=> navigate("/UserPage")} fontSize="1.6em"/>
                    <ImagesButton text= "Historial de transacciones" image= "./canchapadel.jpg" onClick={()=> navigate("/HistoryPage")}  fontSize="1.6em" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
