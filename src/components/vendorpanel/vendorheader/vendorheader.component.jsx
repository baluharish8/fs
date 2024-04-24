import { useState } from "react";
import "./vendorheader.component.css"
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem, removeLocalStorage, removeLocalStorageItem } from "../../../services/storages/local.storage";
import store from "../../../services/storages/redux.storage";
import { savesessionduration } from "../../../services/analyticsdb.service";

export function VendorHeaderComponent(props){
    const navigate = useNavigate()
    const [showLogout, setShowLogout] = useState(false);


    const handleIconClick = () => {
        setShowLogout(!showLogout);
    };
    const handleProfile = () => {
        props.onMenuItemClick('vendorprofile')
        // props.childRef.current.profileComponentSidebarMenuItemsHide()
        setShowLogout(false);
    };

    // const handleLogout = () => {
    //     removeLocalStorage()
    //     setShowLogout(false);
    //     store.dispatch({ type: "userData", data: null })
    //     store.dispatch({ type: "vendorData", data: null })
    //     navigate('/')

    // };
    const handleLogout = () => {
        let vendorIdLocalStorage=getLocalStorageItem('userData')
        let parsingLocalStorage= JSON.parse(vendorIdLocalStorage)
         if(parsingLocalStorage){
          console.log(parsingLocalStorage.checked._id,'useridfrom local storage')
         }

     
        // Capture the end time of the session
        // const sessionStart = localStorage.getItem('sessionStart');
        const sessionStart =  getLocalStorageItem('sessionStart')
        const sessionEnd = Date.now();
    
        // Calculate the session duration
        const sessionDuration = sessionEnd - sessionStart;
    
        // Log the session duration
        console.log('Session duration:', sessionDuration);
    
  
   let data={
        duration:sessionDuration,
      _id:parsingLocalStorage.checked._id

    }
    savesessionduration(data)
    .then((res) => {
        alert('success')
        console.log('getviewcount', res.data)
        removeLocalStorage()
        setShowLogout(false);
        navigate('/')
      })
      .catch((error) => {
        // alert(error)
        if (error.response && error.response.status === 400) {
          // Backend returned a 400 status code
    
          if (error.response.data) {
            // handleAlertMessageFailure()
            // setFailedMessage(error.response.data.message)
            alert(error.response.data)
    
          } else {
            console.error(error.response.data); // This will log 'User already exists'
            // alert(error.response.data)
          }
        } else {
          // Other types of errors
          console.log('An error occurred:', error);
        }
        alert(error + " \n" + "failed")
      })
  
};

    return(<>
     <div className="dashboard_header">
                <div className="mt-3">
                    <div className="row d-flex  text-white  ">
                        <div className="col-10 d-flex align-items-center ps-4 h5 ">
                            <span onClick={() => {props.showSidebar()}} className="bars_icon ps-3 pe-3"> {props.sidebar ? <i className="fa-solid fa-arrow-left"></i> : <i className="fa-solid fa-bars"></i>} </span>
                            <h5 className="mt-1 ms-2 dashboard_header_title" onClick={() => navigate('/') }>Vendor Dashboard </h5>
                        </div>

                        <div className="col-2 " style={{ position: 'relative' }}>
                            <div className="text-end pe-4 ">
                                <span onClick={() => handleIconClick()} ><i className="fas fa-ellipsis-v  ms-1"></i> </span><br></br>
                                {showLogout && (
                                    <div className="logout  text-start">
                                        <ul className="pb-0 mb-0">
                                            <li className="bottom_borde" onClick={() => { handleProfile() }}> <span> <i className="fa-solid fa-user pe-2"></i></span> <span>Profile</span></li>
                                            <li className="bottom_border p-0 m-0"></li>
                                            <li className="" onClick={() => { handleLogout() }}><span><i className="fas fa-sign-out-alt  pe-2" aria-hidden="true"></i> </span> <span>Sign Out</span></li>
                                        </ul>
                                    </div>
                                )}
                          
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    </>)
}