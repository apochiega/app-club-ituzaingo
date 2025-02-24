import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import "./EditUserModal.css";


const EditUserModal = ({ open, handleClose, user, onSave }) => {
  const [tickets, setTickets] = useState(0);
  const [description, setDescription] = useState("");

  // console.log('tickets', tickets);

  const handleSave = () => {
    onSave(user.member_number, tickets, description);
    handleClose();
  };

  useEffect(() => {
    if (user) {
      setTickets(user.tickets);
    }
  }, [user]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80%", md: "40%" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Editar Usuario
        </Typography>

        <TextField
          label="Tickets"
          type="number"
          fullWidth
          margin="normal"
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
        />
        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}>
            Guardar
          </Button>
          <Button onClick={handleClose} variant="outlined" sx={{ color: "red", borderColor: "red", "&:hover": { borderColor: "darkred", color: "darkred" } }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
