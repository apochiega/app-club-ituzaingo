import React from "react";
import "./ImagesButton.css";

function ImagesButton({ text, image, onClick }) {
    return (
        <button className="container-image-text" onClick={onClick}>
            <img className="imagen-cancha" src={image} alt="cancha padel" />
            <p className="texto-paquete p-2 fw-bold">{text}</p>
        </button>
    );
}

export default ImagesButton;