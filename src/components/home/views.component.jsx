import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveViewItem } from '../../services/analyticsdb.service'
import { useVendorService } from '../../services/vendor.service'

export const ViewsComponent = (props) => {
  
    let navigate = useNavigate()
    useEffect(() => {
  
        handlesaveViewItem()
    }, [])

    function handlesaveViewItem(){
        console.log(props.viewId,'props.viewId')
        let data={
           itemId:props.viewId.id,
           category:props.viewId.category
         }
         saveViewItem(data)
         .then((res) => {
           alert('view item success')
           console.log('success services data', res.data)
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
       }
  return (
    <div className='text-center mt-5'>
      Component opened view recorded
    </div>
  )
}

