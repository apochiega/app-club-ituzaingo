import React from "react";
import { useNavigate } from "react-router-dom";
import ImageButton from "../../Components/imageButton/imageButton";

const HomePage = () => {
    const navigate = useNavigate();

    const handleClickPackage = () => {
        navigate("/PackagePage");
    };

    const handleClickUser = () => {
        navigate("/UserPage");
    };

    const handleClickHistory = () => {
        navigate("/HistoryPage");
    };

    return (
        <div>
            <h1 className="title">Panel de administración del club</h1>
            <div className="button-container">
                <ImageButton text="Paquetes de cupones" onClick={handleClickPackage} image="./canchapadel.jpg" />
                <ImageButton text="Usuarios" onClick={handleClickUser}  image="./canchapadel.jpg" />
                <ImageButton text="Historial de transacciones" onClick={handleClickHistory}   image="./canchapadel.jpg" />
            </div>
        </div>
    );
};

export default HomePage;
