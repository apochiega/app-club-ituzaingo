import "./PackagesPage.css";
import React, { useState, useEffect } from 'react';
import CollapsibleTable from "../../Components/Tables/CollapsibleTable";
import EditPackageModal from "../../Components/Modal/EditPackageModal";
import CreatePackageModal from "../../Components/Modal/CreatePackageModal";
import DeleteConfirmationModal from "../../Components/Modal/DeletePackageModal";
import { Button, Box } from "@mui/material";
import apiService from "../../axiosApiService/axiosWrapper";
import { Typography, CircularProgress } from "@mui/material";

function PackagesPage() {
  const [coupons, setCoupons] = useState([]);  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const packageData = async () => {
      try {
        const response = await apiService.getAllPackages();
        setCoupons(response.data); 
      } catch (error) {
        console.error("Error al obtener los paquetes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    packageData();
  }, []);

  const handleDeleteRequest = (coupon) => {
    setCurrentCoupon(coupon);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!currentCoupon?.package_id) {
      console.error("No hay package_id para eliminar");
      return;
    }

    try {
      await apiService.deletePackage(currentCoupon.package_id); 

      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.package_id !== currentCoupon.package_id) 
      );
    } catch (error) {
      console.error("Error al eliminar el paquete:", error);
    } finally {
      
      setDeleteModalOpen(false);
      setCurrentCoupon(null);
    }
  };
  
  const handleOpenEdit = (coupon) => {
    setCurrentCoupon(coupon);
    setEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setCurrentCoupon(null);
  };
  const handleSaveEdit = async (updatedCoupon) => {
    const packageId = updatedCoupon.package_id;
  
    const payload = {
      price: parseFloat(updatedCoupon.price),
      ticket_quantity: Number(updatedCoupon.ticket_quantity),
      title: updatedCoupon.title,             
      description: updatedCoupon.description,  
      firebase_uid: sessionStorage.getItem("uid") 
    };
  
    try {
      await apiService.editPackage(packageId, payload);  
  
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.package_id === packageId ? updatedCoupon : coupon
        )
      );
  
      handleCloseEdit();
    } catch (error) {
      console.error("Error al actualizar el paquete:", error);
    }
  };
  
  const handleOpenCreate = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateModalOpen(false);
  };

  const handleSaveCreate = async (newPackage) => {
    setIsLoading(true);

    try {
        const firebase_uid = sessionStorage.getItem("uid");

        const packageData = {
            ...newPackage,
            firebase_uid
        };

        const response = await apiService.createPackage(packageData);
        setCoupons((prevCoupons) => [...prevCoupons, response.data]);
    } catch (error) {
        console.error("Error al crear el paquete:", error);
        alert("Hubo un error al crear el paquete. Inténtalo de nuevo.");
    } finally {
        setIsLoading(false);
        handleCloseCreate();
    }
  };


  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1 className="title-package" style={{ marginBottom: "20px" }}>Administrar paquetes de tickets</h1>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          onClick={handleOpenCreate}
          sx={{
            backgroundColor: "#255E13",
            '&:hover': {
              backgroundColor: "#1E4D10"
            }
          }}
        >
          Crear
        </Button>
      </Box>
      <div className="table-container">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
            <CircularProgress sx={{ fontSize: 50, color: "#255E13" }} />
            <Typography variant="h6" color="#255E13"> Cargando paquetes... </Typography>
          </Box>
        ) : (
          <CollapsibleTable
            data={coupons}  // Pasamos el array directo
            keysToShow={["description", "title", "price", "ticket_quantity"]}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteRequest}  
          />
        )}
      </div>

      <EditPackageModal
        open={editModalOpen}
        onClose={handleCloseEdit}
        coupon={currentCoupon}
        onSave={handleSaveEdit}
      />

      <CreatePackageModal
        open={createModalOpen}
        onClose={handleCloseCreate}
        onCreate={handleSaveCreate}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}  
        onConfirm={handleDeleteConfirm}
        item={currentCoupon}
      />
    </div>
  );
}

export default PackagesPage;
