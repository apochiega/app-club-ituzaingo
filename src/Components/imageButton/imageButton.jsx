import React from "react";

const ImageButton = ({ text, onClick, image }) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer", textAlign: "center" }}>
            <img src={image} alt={text} style={{ width: "100px", height: "100px" }} />
            <p>{text}</p>
        </div>
    );
};

export default ImageButton;
