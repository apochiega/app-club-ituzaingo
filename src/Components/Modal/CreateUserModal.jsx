import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

function CreateUserModal({ open, onClose, onCreaet }) {
    const initialState = {
        name: "",
        email: "",
    };
    
    const [newUser, setNewUser] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            setNewUser(initialState);
            setErrors({});
        }
    }, [open]);

    const validateFields = () => {
        let newErrors = {};
        
        if (!newUser.name.trim()) newErrors.name = "El nombre es obligatorio";
        if (!newUser.email.trim()) {
        newErrors.email = "El correo es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
        newErrors.email = "Ingrese un correo válido";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        };

    const handleCreate = () => {
        if(validateFields()) {
            onCreaet(newUser);
            onClose();
        }
    };
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    width: 400,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h6">Crear Usuario</Typography>
                <TextField
                    label="Nombre"
                    fullWidth
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Correo Electrónico"
                    fullWidth
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    sx={{ 
                        mt: 2,
                        alignSelf: "center",
                        backgroundColor: "#255E13",
                        "&:hover": {
                            backgroundColor: "#1E4D10",
                        },
                    }}
                >
                    Crear
                </Button>
            </Box>
        </Modal>
    )
        
}

export default CreateUserModal;