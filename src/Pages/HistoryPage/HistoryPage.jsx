import React from "react";
import HistoryTable from "../../Components/Tables/HistoryTable";


const HistoryPage = () => {
  return (
    <div className="history-page">
      <h1 className="textTitle z-index-999">Historial de transacciones</h1>
      
      <div className="history-table">  
      <HistoryTable />
      </div>
    </div>
  );
};

export default HistoryPage;