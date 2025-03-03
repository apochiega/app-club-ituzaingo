import React, { useState } from "react";
import UserTable from "../../Components/Tables/UserTable";
import GreenButton from "../../Components/greenButton/greenButton";
import "./UserPage.css";
import CreateUserModal from "../../Components/Modal/CreateUserModal";
import { Button, Box } from "@mui/material";

const UserPage = ()=>{

    const [userNumber, setUserNumber] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
    });

    const handleSearchUser = () => {
        //peticion a la api para encontrar el usuario
    };

    const handleCreateUser = async (newUser) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
          } catch (error) {
            console.error("Error al crear usuario", error);
          }
    };

    return(
        <div>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <div className="fs-2 fw-bold">
                Usuarios
            </div>
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

            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
                <Button 
                  variant="contained" 
                  onClick={() => setShowForm(true)} 
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

            <div className="mt">
              <UserTable/>
            </div>

            <CreateUserModal
                open={showForm}
                onClose={() => setShowForm(false)}
                onCreaet={handleCreateUser}
            />
        </div>
    )
}

export default UserPage;