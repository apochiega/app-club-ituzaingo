import Header from "../../Components/Header/Header";
import "./packagepage.css"; 
import React, { useState } from "react";
import ResponsiveTable from "../../Components/ResponsiveTable/ResponsiveTable";

function PackagePage() {
    var [coupons, setCoupons] = useState([
        {
          name: "Ticketera",
          expiration_date: "12/12/2025",
          price: 3200,
          coupon: 8,
        },{
          name: "Ticketera",
          expiration_date: "12/12/2025",
          price: 5600,
          coupon: 16,
        },
        {
          name: "Ticketera",
          expiration_date: "12/12/2025",
          price: 8000,
          coupon: 20,
        }
      ]);
    
    const deleteCoupon = (couponToDelete) => {
        setCoupons(coupons.filter((coupon) => coupon !== couponToDelete));
    };

    const editCoupon = (couponToEdit) => { 
        setCoupons(coupons.filter((coupon) => coupon !== couponToEdit));
    };

    return (
        <div>
            <Header />
            <h1 className="titlePackage"> Administrar paquetes de cupones</h1>
            <ResponsiveTable
                data={coupons}
                keysToShow={["name", "expiration_date", "price", "coupon"]}
                onDelete={deleteCoupon}
                onEdit={editCoupon}
                isHistory = {0}
            />
        </div>
    )
}

export default PackagePage;