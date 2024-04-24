import { Route, Routes } from "react-router-dom";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import HomeComponent from "./components/home/home.component";
import { AdminHeaderComponent } from "./components/adminpanel/adminpanelheader/adminheader";
import { AdminSidebarComponent } from "./components/adminpanel/adminsidebar/adminsidebar.component";
import { AdminLayoutComponent } from "./components/adminpanel/adminlayout/adminlayout";
import { useState } from "react";
import AdminOtpCheck from "./components/adminpanel/adminotpcheck/adminotpcheck";
import AdminAccountVerify from "./components/adminpanel/adminaccountverify/adminaccountverify";
import { AuthRoute } from "./services/auth-route";
import AdminForgetPasswordOtpCheck from "./components/adminpanel/adminforgetpasswordotpcheck/adminforgetpasswordotpcheck";
import { VendorLoginComponent } from "./components/login/vendor.login.component";
import { VendorLayoutComponent } from "./components/vendorpanel/vendorlayout/vendorlayout.component";
import { VendorHeaderComponent } from "./components/vendorpanel/vendorheader/vendorheader.component";
import { VendorSidebarComponent } from "./components/vendorpanel/vendorsidebar/vendorsidebar.component";
import { TestingComponent } from "./components/testing.component";
import { ViewsComponent } from "./components/home/views.component";
import { Newloginpage } from "./components/newLoginPage/newloginpage";


export function AppRouter() {
const [viewId, setViewId]=useState('')
    return (
        <>
            <Routes>
            <Route path="/newlogin" element={ <Newloginpage/>} />
            <Route path="/viewscomponent" element={ <ViewsComponent viewId={viewId}/>} />
            <Route path="/testingcomponent" element={ <TestingComponent/>} />
            <Route path="/" element={ <HomeComponent setViewId={setViewId}/>} />
            <Route path="/login" element={ <LoginComponent/>} />
            <Route path="/vendorlogin" element={ <VendorLoginComponent/>} />
            <Route path="/registration" element={<RegistrationComponent />} />
            <Route path="/admindashboard" element={<AuthRoute><NavigateAdminSidebarDashboard /></AuthRoute>} />
            {/* <Route path="/admindashboard" element={<NavigateAdminSidebarDashboard />} /> */}

            <Route path="/adminotpcheck" element={<AuthRoute><AdminOtpCheck/> </AuthRoute> } />
            {/* <Route path="/adminotpcheck" element={<AdminOtpCheck/> } /> */}

            <Route path="/adminaccountverify" element={ <AuthRoute><AdminAccountVerify/></AuthRoute>} />
            <Route path="/forgetpasswordotpcheck" element={ <AdminForgetPasswordOtpCheck/>} />

            <Route path="/vendordashboard" element={<NavigateVendorSidebarDashboard />} />
            
            </Routes>
        </>
    )
}


function NavigateAdminSidebarDashboard() {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    }
    return (
        <>
        <div>
            <AdminHeaderComponent sidebar={sidebar} showSidebar={showSidebar}/>
        </div>
            <div>
                <AdminSidebarComponent  onMenuItemClick={handleMenuItemClick} sidebar={sidebar} showSidebar={showSidebar}/>
            </div>
            <div>
                <AdminLayoutComponent selectedMenuItem={selectedMenuItem} />
            </div>
        </>
    )

}

function NavigateVendorSidebarDashboard() {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    }
    return (
        <>
        <div>
            <VendorHeaderComponent onMenuItemClick={handleMenuItemClick} sidebar={sidebar} showSidebar={showSidebar}/>
        </div>
            <div>
                <VendorSidebarComponent  onMenuItemClick={handleMenuItemClick} sidebar={sidebar} showSidebar={showSidebar}/>
            </div>
            <div>
                <VendorLayoutComponent selectedMenuItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick} />
            </div>
        </>
    )

}