import "./adminlayout.css"

import { AdminDashboardComponent } from "../admindashboard/admindashboard.component";
import { AdminSearchesViewComponent } from "../adminsearchesview/AdminSearchesView.component";
import { AdminPopularCategoryComponent } from "../adminpopularcategory/adminpopularcategory.component";
// import { ProjectAllComponent } from "../adminserviceslist/projectAll/project.all.component";
// import { AdminServicesListComponent } from "../adminserviceslist/adminserviceslist/adminserviceslist.component";

export function AdminLayoutComponent({ selectedMenuItem, onMenuItemClick }) {
  return (
    <>
    <div className="dashboard_layout pt-5 mt-5">
      {selectedMenuItem === 'dashboard' && <div><AdminDashboardComponent/></div>}
      {selectedMenuItem === 'searches' && <div><AdminSearchesViewComponent/></div>}
      {selectedMenuItem === 'popularcategories' && <div><AdminPopularCategoryComponent/></div>}

      {/* {selectedMenuItem === 'servicelist' && <div><ProjectAllComponent/></div>} */}
      {/* {selectedMenuItem === 'servicelist' && <div><AdminServicesListComponent/></div>} */}

      {/* {selectedMenuItem === 'payments' && <div><PaymentsComponent/></div>}
      {selectedMenuItem === 'addservices' && <div><VendorAddServiceComponent/></div>} */}



    </div>
    
    </>
  );
}
