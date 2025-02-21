import React from "react";
import "./Tabla.css"; 

const Tabla = () => {
  const datos = [
    { etiqueta: "Precio", valor: '$5000' },
    { etiqueta: "Expira", valor: '12/12/2025' },
    { etiqueta: "Cupos", valor: 12 },
  ];

  
  const cupos = datos.find(item => item.etiqueta === "Cupos")?.valor || 0; // Obtener el número de cupos 

  return (
    <div className="tabla-container">
        <table className="tabla">
            <thead>
                <tr>
                    <th colSpan="2">
                    <div className="header-content">
                        <span className="titulo">Ticketera</span>
                        <span className="cupos">{cupos} cupos</span>
                    </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {datos.map((item, index) => (
                    <tr key={index}>
                    <td>{item.etiqueta}</td>
                    <td>{item.valor}</td>
                    </tr>
                ))}
            </tbody>
      </table>
    </div>
  );
};

export default Tabla;
