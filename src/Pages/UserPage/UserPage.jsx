import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import GreenButton from "../../Components/greenButton/greenButton";
import UserTable from "../../Components/Tables/UserTable";
import CreateUserModal from "../../Components/Modal/CreateUserModal";
import "./UserPage.css";

const UserPage = () => {
    const [userNumber, setUserNumber] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "" });

    const handleSearchUser = () => {
        // Petición a la API para encontrar el usuario
    };

    const handleCreateUser = async (userData) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <div className="fs-2 fw-bold">Usuarios</div>
            </Box>

            <div className="d-flex gap-3 mt-4 w-50 mb-">
                <input
                    type="text"
                    className="form-control w-50"
                    value={userNumber}
                    onChange={(e) => setUserNumber(e.target.value)}
                    placeholder="Ingrese el numero de socio"
                />
                <GreenButton text="Buscar" minWidth="20%" onClick={handleSearchUser} />
            </div>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    onClick={() => setShowForm(true)} // Esto abre el modal
                    sx={{
                        backgroundColor: "#255E13",
                        "&:hover": {
                            backgroundColor: "#1E4D10",
                        },
                    }}
                >
                    Crear
                </Button>
            </Box>

            <div className="mt-3">
                <UserTable />
            </div>

            <CreateUserModal
                open={showForm} // Abre el modal cuando showForm es true
                onClose={() => setShowForm(false)} // Cierra el modal cuando el usuario lo desea
                onCreate={handleCreateUser} // Llama a la función para crear el usuario
            />
        </div>
    );
};

export default UserPage;
