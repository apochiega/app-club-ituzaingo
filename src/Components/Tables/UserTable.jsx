import React, { useState, useEffect } from 'react';
import apiService from "../../services/axiosWrapper"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from "@mui/material/IconButton";
import { LocalActivity } from "@mui/icons-material";
import ConfirmDecrementModal from '../ConfirmDecrementModal/ConfirmDecrementModal';
import './userTable.css';
import EditUserModal from '../EditUserModal/EditUserModal';


const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170, align: 'left' },
  { id: 'phone_number', label: 'Número de Celular', minWidth: 170, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'left' },
  { id: 'user_id', label: 'Número de Socio', minWidth: 100, align: 'left' },
  { id: 'tickets', label: 'Partidos', minWidth: 100, align: 'left' },
  { id: 'edit', label: 'Acción', minWidth: 100, align: 'center' },
];

export default function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userToDecrement, setUserToDecrement] = useState(null);
  const [users,setUsers] = useState([]);

  useEffect(()=>{
      const usersData= async()=>{
          const response= await apiService.getAllUsers();
          console.log("Datos de la API:", response.data);
          setUsers(response.data)
        }
        usersData()
    }, []);

  const onEdit = (item) => {
    console.log("Usuario seleccionado para edición:", item);
    setSelectedUser(item);
    setOpenModal(true);
  };

  const handleSave = (member_number, partidos, description) => { //member-number????
    setUsers((prev) => ({
      ...prev,
      data: prev.map((user) =>
        user.member_number === member_number
          ? { ...user, partidos }
          : user
      ),
    }));
    console.log(`Guardando en BD: Usuario ${member_number}, Partidos: ${partidos}, Descripción: "${description}"`);
  };

  const handleDecrement = (member_number) => {
    setUsers((prev) => ({
      ...prev,
      data: prev.data.map((user) =>
        user.member_number === member_number && user.partidos > 0
          ? { ...user, partidos: user.partidos - 1 }
          : user
      ),
    }));
  };
  

  const handleOpenConfirmModal = (user_id) => {
    setUserToDecrement(user_id);
    setOpenConfirmModal(true);
  };

  const handleConfirmDecrement = () => {
    console.log('confirm decrement', userToDecrement);
    handleDecrement(userToDecrement);
    setOpenConfirmModal(false);
  };
  
  const rows = users.map((item) => ({ 
    ...item,
    edit: (
      <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-around' }} >
        <IconButton  onClick={() => handleOpenConfirmModal(item.user_id)}  color="primary">
          <LocalActivity sx={{ color: 'darkred' , fontSize : '100%'}} />
        </IconButton>
      </div>
    ),
  }));
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer className="table-container" sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ backgroundColor: '#255E13', color: 'white', fontWeight: 'bold',  border: '1px solid #333'  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align} sx={{ border: '1px solid #333' }}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ border: '0.5px solid #333',
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          marginBottom: 0, 
        },}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ConfirmDecrementModal
        open={openConfirmModal}
        handleClose={() => setOpenConfirmModal(false)}
        handleConfirm={handleConfirmDecrement}
      />
    </Paper>
  );
}
