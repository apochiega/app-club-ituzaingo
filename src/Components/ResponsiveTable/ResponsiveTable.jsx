import React, { useState, useEffect } from "react";
import { Table, Button, Card, Container, Row, Col } from "react-bootstrap";
import "./ResponsiveTable.css";

// Función para convertir claves de JSON en títulos legibles
const formatKeyToTitle = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Agrega espacio antes de las mayúsculas
    .replace(/_/g, " ") // Reemplaza guiones bajos con espacios
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palabra
};

const ResponsiveTable = ({ data, keysToShow, onDelete, onEdit, isHistory }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Filtra solo las claves que se quieren mostrar
  const keys = keysToShow.filter((key) => Object.keys(data[0]).includes(key));

  return (
    <Container>
      {!isMobile ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {keys.map((key, index) => (
                <th key={index}>{formatKeyToTitle(key)}</th>
              ))}
              {isHistory === 0 && (
                            <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {keys.map((key, index) => (
                  <td key={index}>{item[key]}</td>
                ))}
                <td>
                  {isHistory === 0 && (
                    <>
                        <Button className="edit" variant="outlined" onClick={() => onEdit(item)}>
                            Edit
                        </Button>
                        <Button className="delete" variant="danger" onClick={() => onDelete(item)}>
                            Delete
                        </Button>
                        
                    </>
                    
                  )} 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Row>
          {data.map((item, cardIndex) => (
            <Col key={cardIndex} xs={12} className="mb-3">
              <Card>
                <Card.Body>
                  {keys.map((key, index) => (
                    <p key={index}>
                      <strong>{formatKeyToTitle(key)}:</strong> {item[key]}
                    </p>
                  ))}
                  {isHistory === 0 && (
                    <>
                        <Button className="edit" variant="outlined" onClick={() => onEdit(item)}>
                            Edit
                        </Button>
                        <Button className="delete" variant="danger" onClick={() => onDelete(item)}>
                            Delete
                        </Button>
                        
                    </>
                    
                  )} 
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ResponsiveTable;
