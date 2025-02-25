import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteConfirmationModal = ({ open, onClose, onConfirm, item }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: 500,
          maxWidth: "90%"
        }}
      >
        <Typography variant="h6">Confirmar Eliminación</Typography>
        <Typography sx={{ mt: 2 }}>
          ¿Estás seguro de que deseas eliminar el paquete "{item?.title}"?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onConfirm} color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
