import React from "react";
import Header from "../../Components/Header/Header";
import "./HomePage.css"
import ImageButton from "../../Components/imageButton/imageButton";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate= useNavigate();
  
    return (
        <div className="container-flex mt-2">
            <div className="mx-3">
                <Header/>
            </div>
            <div className="mx-5">
                <div className="title">
                    Panel de administración del club
                </div>
                <div className="button-container">
                    <ImageButton text="Tickets" image="./canchapadel.jpg" onClick={()=> navigate("/PackagePage")}/>
                    <ImageButton text="Usuarios" image="./canchapadel.jpg" onClick={()=> navigate("/UserPage")}/>
                    <ImageButton text= "Historial de transacciones" image= "./canchapadel.jpg" onClick={()=> navigate("/UserPage")}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
