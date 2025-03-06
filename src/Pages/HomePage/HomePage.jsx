import React from "react";
import "./HomePage.css";
import ImagesButton from "../../Components/ImagesButton/ImagesButton";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div>
        <div className="title">Panel de administración del club</div>
        <div className="button-container">
          <ImagesButton
            text="Paquetes"
            image="./package.png"
            onClick={() => navigate("/PackagePage")}
          />
          <ImagesButton
            text="Usuarios"
            image="./user.png"
            onClick={() => navigate("/UserPage")}
          />
          <ImagesButton
            text="Historial de transacciones"
            image="./history.png"
            onClick={() => navigate("/HistoryPage")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
