import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

function CreatePackageModal({ open, onClose, onCreate }) {
  const initialState = {
    id: Date.now(),
    title: "",
    description: "",
    price: "",
    ticket_quantity: "",
  };

  const [newCoupon, setNewCoupon] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setNewCoupon(initialState);
      setErrors({});
    }
  }, [open]);

  const validateFields = () => {
    let newErrors = {};
    if (!newCoupon.title.trim()) newErrors.title = "El título es obligatorio";
    if (!newCoupon.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!newCoupon.price || isNaN(newCoupon.price) || newCoupon.price <= 0) newErrors.price = "El precio debe ser un número mayor a 0";
    if (!newCoupon.ticket_quantity || isNaN(newCoupon.ticket_quantity) || newCoupon.ticket_quantity <= 0) newErrors.ticket_quantity = "La cantidad de tickets debe ser un número mayor a 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validateFields()) return;
    onCreate({
      ...newCoupon,
      price: parseFloat(newCoupon.price) || 0,
      ticket_quantity: parseInt(newCoupon.ticket_quantity) || 0,
    });
    onClose();
  };

  const handleNumberChange = (field, value) => {
    if (/^\d*$/.test(value)) {
      setNewCoupon({ ...newCoupon, [field]: value });
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
        <h2>Crear Nuevo Ticket</h2>
        <TextField
          label="Título"
          fullWidth
          value={newCoupon.title}
          onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Descripción"
          fullWidth
          value={newCoupon.description}
          onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Precio"
          fullWidth
          type="text"
          value={newCoupon.price}
          onChange={(e) => handleNumberChange("price", e.target.value)}
          margin="normal"
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          label="Tickets"
          fullWidth
          type="text"
          value={newCoupon.ticket_quantity}
          onChange={(e) => handleNumberChange("ticket_quantity", e.target.value)}
          margin="normal"
          error={!!errors.ticket_quantity}
          helperText={errors.ticket_quantity}
        />
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            mt: 2,
            alignSelf: "center",
            backgroundColor: "#255E13",
            '&:hover': {
              backgroundColor: "#1E4D10"
            }
          }}
        >
          Crear
        </Button>
      </Box>
    </Modal>
  );
}

export default CreatePackageModal;
