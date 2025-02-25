import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

function EditPackageModal({ open, onClose, coupon, onSave }) {
  const [updatedCoupon, setUpdatedCoupon] = React.useState(coupon);

  React.useEffect(() => {
    setUpdatedCoupon(coupon);
  }, [coupon]);

  if (!updatedCoupon) return null;

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
        <h2>Editar Ticket</h2>
        <TextField label="Título" fullWidth value={updatedCoupon.title} margin="normal" disabled />
        <TextField label="Descripción" fullWidth value={updatedCoupon.description} margin="normal" disabled />
        <TextField
          label="Precio"
          fullWidth
          type="number"
          value={updatedCoupon.price}
          onChange={(e) => setUpdatedCoupon({ ...updatedCoupon, price: parseFloat(e.target.value) || 0 })}
          margin="normal"
        />
        <TextField
          label="Tickets"
          fullWidth
          type="number"
          value={updatedCoupon.ticket_quantity}
          onChange={(e) => setUpdatedCoupon({ ...updatedCoupon, ticket_quantity: parseInt(e.target.value) || 0 })}
          margin="normal"
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
