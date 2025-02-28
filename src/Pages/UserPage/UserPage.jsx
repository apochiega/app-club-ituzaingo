import "./UserPage.css";
import React, { useState, useEffect } from 'react';
import CollapsibleTable from "../../Components/Tables/CollapsibleTable";
import EditUserModal from "../../Components/EditUserModal/EditUserModal";
import CreateUserModal from "../../Components/Modal/CreateUserModal";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import apiService from "../../axiosApiService/axiosWrapper";
import InfoIcon from '@mui/icons-material/Info';
import GreenButton from "../../Components/greenButton/greenButton";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userNumber, setUserNumber] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiService.getAllUsers();
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSearchUser = () => {
    if (userNumber) {
      setFilteredUsers(users.filter(user => user.memberNumber.includes(userNumber)));
    } else {
      setFilteredUsers(users);
    }
  };

  const handleSearchChange = () => {
    if (searchQuery) {
        setFilteredUsers(users.filter(user => user.memberNumber.includes(searchQuery)));
      } else {
        setFilteredUsers(users);
      }
  };

  const handleDeleteRequest = (user) => {
    setCurrentUser(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== currentUser.id));
    setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== currentUser.id));
    setDeleteModalOpen(false);
    setCurrentUser(null);
  };

  const handleOpenEdit = (user) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setCurrentUser(null);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers((prevUsers) => prevUsers.map((user) => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setFilteredUsers((prevUsers) => prevUsers.map((user) => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    handleCloseEdit();
  };

  const handleOpenCreate = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateModalOpen(false);
  };

  const handleSaveCreate = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setFilteredUsers((prevUsers) => [...prevUsers, newUser]);
    handleCloseCreate();
  };

  return (
    <div>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <div className="fs-2 fw-bold">Usuarios</div>
        </Box>

        <div className="d-flex justify-content-between align-items-start mt-4 mb-">
            <div className="d-flex gap-3 w-50">
                <input
                    type="text"
                    className="form-control w-50"
                    value={userNumber}
                    onChange={(e) => setUserNumber(e.target.value)}
                    placeholder="Ingrese el numero de socio"
                />
                <GreenButton text="Buscar" minWidth="20%" onClick={handleSearchUser} />
            </div>
        <Button 
          variant="contained" 
          onClick={handleOpenCreate} 
          sx={{
            backgroundColor: "#255E13",
            '&:hover': {
              backgroundColor: "#1E4D10"
            },
            mt: 6
          }}
        >
          Crear
        </Button>
      </div>

      <div className="table-container mt-3">
        {isLoading ? (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="30vh">
            <CircularProgress sx={{ color: "#255E13" }} />
            <Typography sx={{ mt: 2, fontSize: 18, fontWeight: 500, color: "#555" }}>Cargando usuarios...</Typography>
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            height="20vh"
            className="no-users-container"
          >
            <InfoIcon />
            <Typography>No hay usuarios disponibles</Typography>
          </Box>
        ) : (
          <CollapsibleTable
            data={filteredUsers}
            keysToShow={["Nombre", "Email", "Rol"]}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteRequest}
          />
        )}
      </div>
      
      <EditUserModal 
        open={editModalOpen} 
        onClose={handleCloseEdit} 
        user={currentUser} 
        onSave={handleSaveEdit} 
      />
      
      <CreateUserModal 
        open={createModalOpen} 
        onClose={handleCloseCreate} 
        onCreate={handleSaveCreate} 
      />
    </div>

  );
}

export default UserPage;
