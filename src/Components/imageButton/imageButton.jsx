import React from "react";
import "./ImageButton.css";

function ImageButton({ text, image }) {
    return (
        <button className="container-image-text">
            <img className="imagen-cancha" src={image} alt="cancha padel" />
            <p className="texto-paquete">{text}</p>
        </button>
    );
}

export default ImageButton;
