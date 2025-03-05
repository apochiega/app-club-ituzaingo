import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GreenButton from "../greenButton/greenButton";
import { Height } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "80%", md: "40%" },
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p:6
  };

export default function ConfirmDecrementModal({ open, handleClose, handleConfirm }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 550 , textAlign: "center"}}>
          ¿Confirmas restar un partido?
        </Typography>
      
        <Box sx={{ width:'100%', mt: 6, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <GreenButton text="Confirmar" minWidth="20%" onClick={handleConfirm} />
          <Button variant="outlined" color="secondary" onClick={handleClose}  sx={{ color: "red", borderColor: "red", "&:hover": { borderColor: "darkred", color: "darkred" } }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}