import "./vendorlayout.component.css"
import { VendorDashboardComponent } from "../vendordashboard/vendordashboard.component";
// import { OrdersComponent } from "../../orders/orders.component";
// import { PaymentsComponent } from "../../payments/payments.component";
// import { VendorAddServiceComponent } from "../vendoraddservice/vendoraddservice.component";
// import { VendorProductAllComponent } from "../vendorproductsall/vendorproductsall.component";
// import { VendorProductEditComponent } from "../vendorproductedit/vendorproductedit.component";
import { useState } from "react";
// import { VendorProductAddComponent } from "../vendorproductadd/vendorproductadd.component";
// import { VendorProfileComponent } from "../vendorprofile/vendorprofile.component";

export function VendorLayoutComponent({ selectedMenuItem, onMenuItemClick }) {
let [productEditData,setProductEditData]=useState('')
  function handleProductEditData(item){
    setProductEditData(item)
  }

  return (
    <>
    <div className="dashboard_layout pt-5 mt-5">
      {selectedMenuItem === 'dashboard' && <div><VendorDashboardComponent/></div>}
      {/* {selectedMenuItem === 'vendorproducts' && <div><VendorProductAllComponent handleProductEditData={handleProductEditData} onMenuItemClick={onMenuItemClick}/></div>}
      {selectedMenuItem === 'productedit' && <div><VendorProductEditComponent productEditData={productEditData} handleProductEditData={handleProductEditData} onMenuItemClick={onMenuItemClick}/></div>}
      {selectedMenuItem === 'vendorserviceadd' && <div><VendorProductAddComponent productEditData={productEditData} handleProductEditData={handleProductEditData} onMenuItemClick={onMenuItemClick}/></div>}
      {selectedMenuItem === 'vendorprofile' && <div><VendorProfileComponent/></div>}
      {selectedMenuItem === 'orders' && <div><OrdersComponent/></div>}
      {selectedMenuItem === 'payments' && <div><PaymentsComponent/></div>}
      {selectedMenuItem === 'addservices' && <div><VendorAddServiceComponent/></div>} */}



    </div>
    
    </>
  );
}
