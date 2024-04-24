import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "./storages/local.storage";
import { Navigate } from "react-router-dom";
import store from "./storages/redux.storage";
export function AuthRouteVendor(props) {
const [recheck,setRecheck]=useState('')
// const [uservalid,setUservalid]=useState(false)

useEffect(()=>{
    
        //after login profile show execute(vendor)
        // const vendorData = store?.getState()?.vendorData;
        // console.log('from authroute',vendorData)
        // let isVendorLoggedIn = vendorData ? true : false;
        // console.log('from authroute',isVendorLoggedIn)
        // setUservalid(isVendorLoggedIn)

        // store.subscribe(() => {
        //     const vendorData = store.getState().vendorData;
        //     console.log("from logout testing UserData:", vendorData);
        //     let isVendorLoggedIn = vendorData ? true : false;
        //     console.log("from logout testing UserData:", isVendorLoggedIn);
        //     setUservalid(isVendorLoggedIn)
        //   });

},[])

// console.log('from authroute uservalid',uservalid)



    let uservalid = false;
    // uservalid = getLocalStorageItem("vendorData")
    const vendorData = store?.getState()?.vendorData;
        console.log('from authroute',vendorData)
        let isVendorLoggedIn = vendorData ? true : false;
        uservalid=isVendorLoggedIn

          store.subscribe(() => {
            const vendorData = store.getState().vendorData;
            console.log("from logout testing UserData:", vendorData);
            let isVendorLoggedIn = vendorData ? true : false;
            console.log("from logout testing UserData:", isVendorLoggedIn);
            uservalid=isVendorLoggedIn

          });

    console.log(uservalid);

    if (uservalid) {
        return props.children
    }
    else {
        return <Navigate to="/login"></Navigate>
    }
  
}

// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { getLocalStorageItem, setLocalStorageItem } from "./storages/local.storage";

// export function AuthRouteVendor(props) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const token = urlParams.get('token');

//     if (token) {
//       // Store the token in local storage
//       setLocalStorageItem("vendortoken", token);
//     } else {
//       // If token doesn't exist in the URL, navigate to login page
//       navigate('/login');
//     }
//   }, [location.search, navigate]);

//   const vendortoken = getLocalStorageItem("vendortoken");

//   if (vendortoken) {
//     // If vendortoken exists in local storage, render the child components
//     return props.children;
//   } else {
//     // If vendortoken doesn't exist in local storage, navigate to login page
//     return navigate('/login');
//   }
// };
