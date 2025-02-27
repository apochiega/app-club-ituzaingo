import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("APP_USR-a81a9c3a-7aee-4263-a521-cc37ac563569"); // Reemplaza con tu Public Key

const PaymentButton = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  // useEffect(() => {
  //   fetch("https://tu-backend.com/create_preference", {  // URL del backend
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title: "Producto X", price: 100, quantity: 1 })
  //   })
  //     .then(response => response.json())
  //     .then(data => setPreferenceId(data.response.id));
  // }, []);

  // Simular un preference_id de prueba (reemplázalo con uno válido)
  const fakePreferenceId = "TEST1234567890"; // Usa uno real de Mercado Pago

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
    {preferenceId ? <Wallet initialization={{ preferenceId }} /> : <p>Cargando botón de pago...</p>}
  </div>
  );
};

export default PaymentButton;
