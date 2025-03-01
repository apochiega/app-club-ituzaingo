import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

function EditPackageModal({ open, onClose, coupon, onSave }) {
  const [updatedCoupon, setUpdatedCoupon] = React.useState(coupon);

  React.useEffect(() => {
    setUpdatedCoupon(coupon);
  }, [coupon]);

  if (!updatedCoupon) return null;

  const handleChange = (field) => (e) => {
    setUpdatedCoupon({ ...updatedCoupon, [field]: e.target.value });
  };
  
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*(\.\d{0,2})?$/.test(value)) { 
      setUpdatedCoupon({ ...updatedCoupon, price: value });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <h2>Editar Paquete</h2>
        <TextField
          label="Título"
          fullWidth
          value={updatedCoupon.title}
          onChange={handleChange("title")}
          margin="normal"
        />

        <TextField
          label="Descripción"
          fullWidth
          value={updatedCoupon.description}
          onChange={handleChange("description")}
          margin="normal"
        />
        <TextField
          label="Precio"
          fullWidth
          type="text"
          value={updatedCoupon.price === "0" ? "" : updatedCoupon.price}
          onChange={handlePriceChange}
          margin="normal"
          inputMode="decimal"
          pattern="[0-9]*(\.[0-9]{0,2})?"
          min="0"
        />
        <TextField
          label="Cantidad de Partidos"
          fullWidth
          type="number"
          value={updatedCoupon.ticket_quantity}
          onChange={(e) => setUpdatedCoupon({ ...updatedCoupon, ticket_quantity: Math.max(0, parseInt(e.target.value) || 0) })}
          margin="normal"
          min="0"
        />
        <Button
          variant="contained"
          onClick={() => onSave(updatedCoupon)}
          sx={{
            mt: 2,
            alignSelf: "center",
            backgroundColor: "#255E13",
            '&:hover': {
              backgroundColor: "#1E4D10"
            }
          }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
}

export default EditPackageModal;
