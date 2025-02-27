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
                    <ImagesButton text="Tickets" image="./canchapadel.jpg" onClick={()=> navigate("/PackagePage")}/>
                    <ImagesButton text="Usuarios" image="./canchapadel.jpg" onClick={()=> navigate("/UserPage")}/>
                    <ImagesButton text= "Historial de transacciones" image= "./canchapadel.jpg" onClick={()=> navigate("/HistoryPage")}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
