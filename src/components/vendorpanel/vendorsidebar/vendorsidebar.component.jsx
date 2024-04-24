import { Link } from "react-router-dom"
import "./vendorsidebar.component.css"
import { useEffect, useState } from "react";

// import { HeaderComponent } from "../header/header.component";
export function VendorSidebarComponent(props) {

    const handleItemClick = (menuItem) => {
        props.onMenuItemClick(menuItem);
    };

    useEffect(()=>{
        handleItemClick("dashboard")
    },[])
    return (
        <>
            {/* <HeaderComponent showSidebar={showSidebar}></HeaderComponent> */}
            <div className={props.sidebar ? " sidebar" : "sidebar sidebar_none "} >

                <div className="sidebar1">
            
                    <div>
                        <ul className="list-menu pb-3">
                            <Link to="#" className="" style={{ textDecoration: 'none' }}>
                                <li className="list  " onClick={()=>(handleItemClick("dashboard"))}><span><i className="fa-solid fa-table-cells list-icon "></i></span><span className="list-icon-name">Dashboard</span> </li>
                            </Link>
                            <Link to="#" style={{ textDecoration: 'none'}}>
                                <li className="list " onClick={()=>(handleItemClick("vendorproducts"))}><span><i className="fas fa-boxes list-icon "></i> </span> <span className="list-icon-name">Services</span></li>
                            </Link>
                            <Link to="#" style={{ textDecoration: 'none' }}>
                                <li className="list " onClick={()=>(handleItemClick("orders"))}><span><i className="fas fa-shopping-basket list-icon "></i> </span> <span className="list-icon-name">Orders</span></li>
                            </Link>
                            <Link to="#" style={{ textDecoration: 'none'}}>
                                <li className="list " onClick={()=>(handleItemClick("payments"))}><span><i className="fas fa-file-invoice-dollar list-icon "></i> </span><span className="list-icon-name ">Payments</span></li>
                            </Link>
                            {/* <Link to="#" style={{ textDecoration: 'none'}}>
                                <li className="list " onClick={()=>(handleItemClick("addservices"))}><span><i className="fas fa-boxes list-icon "></i> </span> <span className="list-icon-name">Add Service</span></li>
                            </Link> */}
                            {/* <Link to="#" style={{ textDecoration: 'none'}}>
                                <li className="list " onClick={()=>(handleItemClick("payments"))}><span><i className="fa-solid fa-star list-icon "></i> </span><span className="list-icon-name">Ratings</span></li>
                            </Link> */}
                            <Link to="#" style={{ textDecoration: 'none'}}>
                                <li className="list " onClick={()=>(handleItemClick("payments"))}><span><i className="fa-solid fa-gear list-icon "></i> </span><span className="list-icon-name">Settings</span></li>
                            </Link>
                        </ul>
                    </div>


                </div>
                {/* sidebar footer */}
                <div className="">
                    <div className="text-center  pt-3">
                        <span >© Copyright <br></br> <span className="fw-bold "> Company Name</span></span>

                    </div>

                </div>
            </div>




        </>
    )
}