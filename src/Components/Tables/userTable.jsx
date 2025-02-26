import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from "@mui/material/IconButton";
import { Edit } from "@mui/icons-material";
import './userTable.css';
import EditUserModal from '../EditUserModal/EditUserModal';

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170, align: 'left' },
  { id: 'member_number', label: 'Número de Socio', minWidth: 100, align: 'left' },
  { id: 'tickets', label: 'Tickets', minWidth: 100, align: 'left' },
  { id: 'edit', label: 'Acción', minWidth: 100, align: 'left' },
];

export default function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [coupons, setCoupons] = useState({
    message: 'success',
    data: [
      { name: 'micaela procofio', member_number: 1, tickets: 7 },
      { name: 'juliana hernandez', member_number: 2, tickets: 16 },
    ],
  });

  useEffect(() => {

  }, []);

  const onEdit = (item) => {
    console.log("Usuario seleccionado para edición:", item);
    setSelectedUser(item);
    setOpenModal(true);
  };

  const rows = coupons.data.map((item) => ({
    ...item,
    edit: (
      <IconButton onClick={() => onEdit(item)} color="primary">
        <Edit />
      </IconButton>
    ),
  }));

  const handleSave = (member_number, tickets, description) => {
    setCoupons((prev) => ({
      ...prev,
      data: prev.data.map((user) =>
        user.member_number === member_number
          ? { ...user, tickets }
          : user
      ),
    }));
    console.log(`Guardando en BD: Usuario ${member_number}, Tickets: ${tickets}, Descripción: "${description}"`);
  };
  
  
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
      <EditUserModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        user={selectedUser}
        onSave={handleSave}
      />
    </Paper>
  );
}
