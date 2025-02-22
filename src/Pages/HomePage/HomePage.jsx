import React from "react";
import Header from "../../Components/Header/Header";
import "./HomePage.css"
import ImageButton from "../../Components/imageButton/imageButton";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    return (
        <div className="container-flex p-2 mt-2">
            <div>
                <Header/>
            </div>
            <div className="">
                <div className="title">
                    Panel de administración del club
                </div>
                <div className="button-container">
                    <ImageButton text="Tickets" image="./canchapadel.jpg"/>
                    <ImageButton text="Usuarios" image="./canchapadel.jpg"/>
                    <ImageButton text= "Historial de transacciones" image= "./canchapadel.jpg"/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
