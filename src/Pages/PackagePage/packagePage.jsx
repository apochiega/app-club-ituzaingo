import Header from "../../Components/Header/Header";
import "./packagepage.css";
import React, { useState } from "react";
import CollapsibleTable from "../../Components/Tables/CollapsibleTable";

function PackagePage() {
  var [coupons, setCoupons] = useState({"message":"success","data":[{"id":1,"description":"ticketera 8 tickets","title":"8 tickets","price":3200,"ticket_quantity":8},{"id":2,"description":"ticketera 16 tickets","title":"16 tickets","price":5000,"ticket_quantity":16}]});

  const deleteCoupon = (couponToDelete) => {
    setCoupons((prevCoupons) => ({
      ...prevCoupons,
      data: prevCoupons.data.filter((coupon) => coupon.id !== couponToDelete.id),
    }));
  };
  
//   const editCoupon = (couponToEdit) => {
//     setCoupons((prevCoupons) => ({
//       ...prevCoupons,
//       data: prevCoupons.data.filter((coupon) => coupon.id !== couponToEdit.id),
//     }));
//   };
  
  
//   const editCoupon = (couponToEdit) => {
//     // navigate(`/edit/${couponToEdit.id}`, { state: { coupon: couponToEdit } });
//     setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== couponToEdit.id));
//   };

  return (
    <div className="package-page">
      <Header />
      <h1 className="title-package">Administrar paquetes de cupones</h1>
      <div className="table-container">
        <CollapsibleTable
            data={coupons.data}
            keysToShow={["description", "title", "price", "ticket_quantity"]}
            onDelete={deleteCoupon}
            // onEdit={editCoupon}
        />
      </div>
      
    </div>
  );
}

export default PackagePage;
