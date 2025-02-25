import "./packagePage.css"; 
import React, { useState } from "react";
import CollapsibleTable from "../../Components/Tables/CollapsibleTable";
import EditPackageModal from "../../Components/Modal/EditPackageModal";
import DeleteConfirmationModal from "../../Components/Modal/DeletePackageModal";

function PackagePage() {
  const [coupons, setCoupons] = useState({
    message: "success",
    data: [
      { id: 1, description: "ticketera 8 tickets", title: "8 tickets", price: 3200, ticket_quantity: 8 },
      { id: 2, description: "ticketera 16 tickets", title: "16 tickets", price: 5000, ticket_quantity: 16 },
    ],
  });
  
  const [open, setOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
  
  
  const handleOpen = (coupon) => {
    setCurrentCoupon(coupon);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCoupon(null);
  };

  const handleSave = (updatedCoupon) => {
    setCoupons((prevCoupons) => ({
      ...prevCoupons,
      data: prevCoupons.data.map((coupon) => 
        coupon.id === updatedCoupon.id ? updatedCoupon : coupon
      ),
    }));
    handleClose();
  };

  return (
    <div>
      <h1 className="title-package">Administrar paquetes de tickets</h1>
      <div className="table-container">
        <CollapsibleTable
          data={coupons.data}
          keysToShow={["description", "title", "price", "ticket_quantity"]}
          onEdit={handleOpen}
          onDelete={handleDeleteRequest} // <-- Aquí se pasa la función
        />
      </div>

      <EditPackageModal 
        open={open} 
        onClose={handleClose} 
        coupon={currentCoupon} 
        onSave={handleSave} 
        modalStyles={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          backgroundColor: "white", 
          padding: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          width: 400 
        }}
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

export default PackagePage;