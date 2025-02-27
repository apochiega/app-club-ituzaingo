import React from "react";
import HistoryTable from "../../Components/Tables/HistoryTable";


const HistoryPage = () => {
  return (
    <div className="history-page">
      <h1 className="fs-2 fw-bold">Historial de transacciones</h1>
      
      <div className="history-table">  
        <HistoryTable />
      </div>
    </div>
  );
};

export default HistoryPage;