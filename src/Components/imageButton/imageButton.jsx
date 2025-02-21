import React from "react";
import "./imageButton.css";

function ImageButton({ text, image }) {
    return (
        <button className="container-image-text">
            <img className="imagen-cancha" src={image} alt="cancha padel" />
            <p className="texto-paquete p-2 fw-bold">{text}</p>
        </button>
    );
}

export default ImageButton;
