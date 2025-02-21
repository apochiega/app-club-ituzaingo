import React from "react";
import Header from "../../Components/Header/Header";
import "./HomePage.css"
import ImageButton from "../../Components/imageButton/imageButton";

const HomePage = () => {
    return (
        <div className="container">
            <Header />
            <div className="title">
                Panel de administración del club
            </div>
            <div className="button-container">
                <ImageButton text="Paquetes de cupones" image="./canchapadel.jpg" />
                <ImageButton text="Usuarios" image="./canchapadel.jpg"/>
                <ImageButton text= "Historial de transacciones" image= "./canchapadel.jpg"/>
            </div>
        </div>
    );
}

export default HomePage;
