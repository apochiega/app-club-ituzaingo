import "./PackagesPage.css";
import React, { useState, useEffect } from 'react';
import CollapsibleTable from "../../Components/Tables/CollapsibleTable";
import EditPackageModal from "../../Components/Modal/EditPackageModal";
import CreatePackageModal from "../../Components/Modal/CreatePackageModal";
import DeleteConfirmationModal from "../../Components/Modal/DeletePackageModal";
import { Button, Box } from "@mui/material";
import apiService from "../../axiosApiService/axiosWrapper"
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

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

  const handleDeleteConfirm = () => {
    setCoupons((prevCoupons) => ({
      ...prevCoupons,
      data: prevCoupons.data.filter((coupon) => coupon.id !== currentCoupon.id),
    }));
    setDeleteModalOpen(false);
    setCurrentCoupon(null);
  };
  
  const handleOpenEdit = (coupon) => {
    setCurrentCoupon(coupon);
    setEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setCurrentCoupon(null);
  };

  const handleSaveEdit = (updatedCoupon) => {
    setCoupons((prevCoupons) => ({
      ...prevCoupons,
      data: prevCoupons.data.map((coupon) => 
        coupon.id === updatedCoupon.id ? updatedCoupon : coupon
      ),
    }));
    handleCloseEdit();
  };

  const handleOpenCreate = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateModalOpen(false);
  };

  const handleSaveCreate = (newCoupon) => {
    setCoupons((prevCoupons) => ({
      ...prevCoupons,
      data: [...prevCoupons.data, newCoupon],
    }));

    handleCloseCreate();
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
            <Typography variant="h6" color="#255E13" > Cargando paquetes... </Typography>
          </Box>
        ) : (
          <CollapsibleTable
            data={coupons}
            keysToShow={["description", "title", "price", "ticket_quantity"]}
            onEdit={setCurrentCoupon}
            onDelete={setCurrentCoupon}
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

