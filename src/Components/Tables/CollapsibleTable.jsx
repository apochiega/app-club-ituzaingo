import React from "react";
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Collapse,Box,Typography,useMediaQuery} from "@mui/material";
import { Edit, Delete, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const columnTitles = {
  title: "Título",
  ticket_quantity: "Cantidad de Tickets",
  description: "Descripción",
  price: "Precio"
};

function Row({ item, keysToShow, onDelete, onEdit, isMobile }) {
  const [open, setOpen] = React.useState(false);

  // columnas que se van a visualizar en mobile
  const collapsibleKeys = ["title", "ticket_quantity", "description", "price"];

  return (
    <>
      <TableRow>
        {/* Solo visualizo el icono de colapsable en mobile  */}
        {isMobile && (
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
        {/* Solo muestro el titulo y la cant de tickets para mobile */}
        {keysToShow
          .filter(key => !isMobile || ["title", "ticket_quantity"].includes(key))
          .map((key, index) => (
            <TableCell key={index}>{item[key]}</TableCell>
          ))}
        {/* {isHistory === 0 && ( */}
          <TableCell>
            <IconButton onClick={() => onEdit(item)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(item)} color="error">
              <Delete />
            </IconButton>
          </TableCell>
        {/* )} */}
      </TableRow>

      {/* Opcion colapsable solo en mobile */}
      {isMobile && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={keysToShow.length + 2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Detalles
                </Typography>
                <Table size="small">
                  <TableBody>
                    {collapsibleKeys.map((key, index) => (
                      <TableRow key={index}>
                        <TableCell>{columnTitles[key] || key}</TableCell>
                        <TableCell>{item[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

const CollapsibleTable = ({ data, keysToShow, onDelete, onEdit, isHistory }) => {
  const isMobile = useMediaQuery("(max-width:768px)"); // Detecta si es pantalla móvil

  if (!data || data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* Solo mostrar la columna de expandir en mobile */}
            {isMobile && <TableCell />}
            {keysToShow
              .filter(key => !isMobile || ["title", "ticket_quantity"].includes(key))
              .map((key, index) => (
                <TableCell key={index}>{columnTitles[key] || key}</TableCell>
              ))}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <Row key={index} item={item} keysToShow={keysToShow} onDelete={onDelete} onEdit={onEdit} isHistory={isHistory} isMobile={isMobile} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
