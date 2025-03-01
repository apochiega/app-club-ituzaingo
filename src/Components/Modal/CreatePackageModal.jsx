import React, { useState, useEffect, use } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import apiService from "../../services/axiosWrapper";

function CreatePackageModal({ open, onClose, onCreate }) {
  const initialState = {
    id: Date.now(),
    title: "",
    description: "",
    price: "",
    ticket_quantity: "",
  };

  const [user, setUser] = useState([]);
  // const [newCoupon, setNewCoupon] = useState(initialState);

  const [newPackage, setNewPackage] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setUser(sessionStorage.getItem("uid") );
  }, []);

  useEffect(() => {
    if (open) {
      setNewPackage(initialState);
      setErrors({});
    }
  }, [open]);

  const validateFields = () => {
    let newErrors = {};
    if (!newPackage.title.trim()) newErrors.title = "El título es obligatorio";
    if (!newPackage.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!newPackage.price || isNaN(newPackage.price) || newPackage.price <= 0)
      newErrors.price = "El precio debe ser un número mayor a 0";
    if (!newPackage.ticket_quantity || isNaN(newPackage.ticket_quantity) || newPackage.ticket_quantity <= 0)
      newErrors.ticket_quantity = "La cantidad de tickets debe ser un número mayor a 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateFields()) return;

    setLoading(true);
    
    try {

      const packageData = {
        title: newPackage.title,
        description: newPackage.description,
        price: parseFloat(newPackage.price),
        ticket_quantity: parseInt(newPackage.ticket_quantity),
        firebase_uid: user}

      // onCreate(response.data); // Agregar el nuevo paquete a la lista
      onCreate(packageData);
      onClose();

    } catch (error) {
      console.error("Error al crear el paquete:", error);
      alert("Hubo un error al crear el paquete. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = (field, value) => {
    if (/^\d*$/.test(value)) {
      setNewPackage({ ...newPackage, [field]: value });
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
          value={setNewPackage.title}
          onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Descripción"
          fullWidth
          value={newPackage.description}
          onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Precio"
          fullWidth
          type="text"
          value={newPackage.price}
          onChange={(e) => handleNumberChange("price", e.target.value)}
          margin="normal"
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          label="Tickets"
          fullWidth
          type="text"
          value={newPackage.ticket_quantity}
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

