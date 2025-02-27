import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import GreenButton from "../greenButton/greenButton";
import "./EditUserModal.css";


const EditUserModal = ({ open, handleClose, user, onSave }) => {
  const [partidos, setPartido] = useState(0);
  const [description, setDescription] = useState("");

  // console.log('tickets', tickets);

  const handleSave = () => {
    onSave(user.member_number, partidos, description);
    handleClose();
  };

  useEffect(() => {
    if (user) {
      setPartido(user.partidos);
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
          label="Partidos"
          type="number"
          fullWidth
          margin="normal"
          value={partidos}
          onChange={(e) => setPartido(Number(e.target.value))}
        />
        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>

          <GreenButton text="GUARDAR" minWidth="20%" onClick={handleSave} />
          
          <Button onClick={handleClose} variant="outlined" sx={{ color: "red", borderColor: "red", "&:hover": { borderColor: "darkred", color: "darkred" } }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
