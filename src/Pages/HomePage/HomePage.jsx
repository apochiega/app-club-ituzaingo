import React from "react";
import "./HomePage.css"
import ImageButton from "../../Components/ImageButton/imageButton";
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
                    <ImageButton text="Tickets" image="./canchapadel.jpg" onClick={()=> navigate("/PackagePage")}/>
                    <ImageButton text="Usuarios" image="./canchapadel.jpg" onClick={()=> navigate("/UserPage")}/>
                    <ImageButton text= "Historial de transacciones" image= "./canchapadel.jpg" onClick={()=> navigate("/HistoryPage")}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
