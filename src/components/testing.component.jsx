import React, { useEffect } from 'react'
import { useVendorService } from '../services/vendor.service'
import { getLocalStorageItem, removeLocalStorage } from '../services/storages/local.storage'
import { savesessionduration } from '../services/analyticsdb.service'
import { useNavigate } from "react-router-dom"

export const TestingComponent = () => {
    const { getvendordata, getServiceData } = useVendorService()
    let navigate = useNavigate()
    
    function handleGetServiceData() {
        // getServiceData()
        getvendordata()
            .then((res) => {
                // alert('success')
                console.log('success')
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
                    alert(error + " \n" + "failed")

                }
            })
    }
    useEffect(() => {
        handleGetServiceData()

    }, [])
    const handleLogout = () => {
        // Capture the end time of the session
        // const sessionStart = localStorage.getItem('sessionStart');
        const sessionStart =  getLocalStorageItem('sessionStart')
        const sessionEnd = Date.now();
    
        // Calculate the session duration
        const sessionDuration = sessionEnd - sessionStart;
    
        // Log the session duration
        console.log('Session duration:', sessionDuration);
    
  
   let data={
        duration:sessionDuration
    }
    savesessionduration(data)
    .then((res) => {
        alert('success')
        console.log('getviewcount', res.data)
        removeLocalStorage()
        // setShowLogout(false);
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
    return (
        <div className=' ' >
            <div className='' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div className=' '>
                    this is testing component
                    <br></br>
                    <button onClick={() => { handleGetServiceData() }} className='btn btn-primary'>test</button>
                </div>
                <div>
                <button onClick={()=>{handleLogout()}} className='btn btn-primary'>Logout</button>
            </div>
            </div>
           
        </div>

    )
}


