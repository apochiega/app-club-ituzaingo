import "./PackagesPage.css";
import React, { useState, useEffect, useCallback } from 'react';
import CollapsibleTable from "../../Components/Tables/CollapsibleTable";
import EditPackageModal from "../../Components/Modal/EditPackageModal";
import CreatePackageModal from "../../Components/Modal/CreatePackageModal";
import DeleteConfirmationModal from "../../Components/Modal/DeletePackageModal";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import apiService from "../../services/axiosWrapper";

function PackagesPage() {

    const [coupons, setCoupons] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentCoupon, setCurrentCoupon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const firebase_uid = sessionStorage.getItem("uid");

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await apiService.getAllPackages();
                setCoupons(response.data);
            } catch (error) {
                console.error("Error al obtener los paquetes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const handleOpenModal = useCallback((modalSetter, coupon = null) => {
        setCurrentCoupon(coupon);
        modalSetter(true);
    }, []);

    const handleCloseModal = useCallback((modalSetter) => {
        modalSetter(false);
        setCurrentCoupon(null);
    }, []);

    const handleDeleteConfirm = async () => {
        if (!currentCoupon?.package_id) {
            console.error("No hay package_id para eliminar");
            return;
        }

        try {
            await apiService.deletePackage(currentCoupon.package_id);
            setCoupons((prevCoupons) =>
                prevCoupons.filter(({ package_id }) => package_id !== currentCoupon.package_id)
            );
        } catch (error) {
            console.error("Error al eliminar el paquete:", error);
        } finally {
            handleCloseModal(setDeleteModalOpen);
        }
    };

    const handleSaveEdit = async (updatedCoupon) => {
        const packageId = updatedCoupon.package_id;

        const payload = {
            price: parseFloat(updatedCoupon.price),
            ticket_quantity: Number(updatedCoupon.ticket_quantity),
            title: updatedCoupon.title,
            description: updatedCoupon.description,
            firebase_uid
        };

        try {
            await apiService.editPackage(packageId, payload);
            setCoupons((prevCoupons) =>
                prevCoupons.map((coupon) => (coupon.package_id === packageId ? updatedCoupon : coupon))
            );
            handleCloseModal(setEditModalOpen);
        } catch (error) {
            console.error("Error al actualizar el paquete:", error);
        }
    };

    const handleSaveCreate = async (newPackage) => {
        setIsLoading(true);
        try {
            const response = await apiService.createPackage({ ...newPackage, firebase_uid });
            setCoupons((prevCoupons) => [...prevCoupons, response.data]);
            handleCloseModal(setCreateModalOpen);
        } catch (error) {
            console.error("Error al crear el paquete:", error);
            alert("Hubo un error al crear el paquete. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <h1 className="title-package" style={{ marginBottom: "20px" }}>
                    Administrar paquetes 
                </h1>
            </Box>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    onClick={() => handleOpenModal(setCreateModalOpen)}
                    sx={{
                        backgroundColor: "#255E13",
                        '&:hover': { backgroundColor: "#1E4D10" }
                    }}
                >
                    Crear
                </Button>
            </Box>

            <div className="table-container">
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
                        <CircularProgress sx={{ fontSize: 50, color: "#255E13" }} />
                        <Typography variant="h6" color="#255E13">
                            Cargando paquetes...
                        </Typography>
                    </Box>
                ) : (
                    <CollapsibleTable
                        data={coupons}
                        keysToShow={["description", "title", "price", "ticket_quantity"]}
                        onEdit={(coupon) => handleOpenModal(setEditModalOpen, coupon)}
                        onDelete={(coupon) => handleOpenModal(setDeleteModalOpen, coupon)}
                    />
                )}
            </div>

            <EditPackageModal
                open={editModalOpen}
                onClose={() => handleCloseModal(setEditModalOpen)}
                coupon={currentCoupon}
                onSave={handleSaveEdit}
            />

            <CreatePackageModal
                open={createModalOpen}
                onClose={() => handleCloseModal(setCreateModalOpen)}
                onCreate={handleSaveCreate}
            />

            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => handleCloseModal(setDeleteModalOpen)}
                onConfirm={handleDeleteConfirm}
                item={currentCoupon}
            />
        </div>
    );
}

export default PackagesPage;
