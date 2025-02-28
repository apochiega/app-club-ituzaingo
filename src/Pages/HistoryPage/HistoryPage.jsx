import React from "react";
import HistoryTable from "../../Components/Tables/HistoryTable";
import { Box, Typography, CircularProgress } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import apiService from "../../axiosApiService/axiosWrapper";
import { useState, useEffect } from "react";
import "./HistoryPage.css";

const HistoryPage = () => {

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchHistoryData = async () => {
      setIsLoading(true); // Forzar el estado de carga al iniciar la solicitud
      setError(false); // Resetear error
  
      try {
        const response = await apiService.getHistory();
        if (response.data && response.data.length > 0) {
          setHistoryData(response.data);
        } else {
          setHistoryData([]); // Asegurar que se maneje correctamente un array vacío
        }
      } catch (error) {
        console.error("Error al obtener el historial:", error);
        setError(true);
      } finally {
        setIsLoading(false); // Establecer isLoading en false después de que la solicitud se haya completado
      }
    };
  
    fetchHistoryData();
  }, []);
  

  return (
    <div className="history-page mt-3">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <div className="fs-2 fw-bold">Historial de transacciones</div>
        </Box>
      
      <div className="history-table mt-3">  
      {isLoading ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="30vh">
          <CircularProgress sx={{ color: "#255E13" }} />
          <Typography sx={{ mt: 2, fontSize: 18, fontWeight: 500, color: "#555" }}>Cargando historial...</Typography>
        </Box>
      ) : historyData.length === 0 ? (
        <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        height="20vh" 
        className="no-history-container"
        >
          <InfoIcon />
          <Typography>No hay historial disponible</Typography>
        </Box>
      ) : (
        <HistoryTable data={historyData} />
      )}
      </div>
    </div>
  );
};

export default HistoryPage;