// Componente Modal de Error
function ErrorModal ({ message, onClose }){
    return (
        <div className="error-modal">
            <div className="error-modal-content">
                <h3>Error</h3>
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
            <style>{`
                .error-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5); 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
    
                .error-modal-content {
                    background-color: white;
                    padding: 20px;
                    border: 3px solid #2E7D32; 
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    width: 90%;
                    max-width: 400px;
                }
    
                .error-modal-content h3 {
                    margin: 0;
                    font-size: 22px;
                    color: #2E7D32; 
                }
    
                .error-modal-content p {
                    margin: 15px 0;
                    color: #D32F2F; 
                    font-weight: bold;
                }
    
                .error-modal-content button {
                    background-color: #2E7D32; 
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.3s;
                }
    
                .error-modal-content button:hover {
                    background-color: #1B5E20; 
                }
            `}</style>
        </div>
    );
}

export default ErrorModal;