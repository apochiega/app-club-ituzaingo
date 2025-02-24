import React from 'react';
import './greenButton.css';

function GreenButton({ text, minWidth, onClick }) {
    return (
        <button 
            className="green-button" 
            onClick={onClick} 
            style={{ minWidth : minWidth }}
        >
            {text}
        </button>
    );
}
export default GreenButton;