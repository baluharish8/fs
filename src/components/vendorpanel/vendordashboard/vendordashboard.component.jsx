import { useNavigate } from "react-router-dom"
import "./vendordashboard.component.css"
import { useEffect, useState } from "react"
import store from "../../../services/storages/redux.storage"
import axios from "axios"
import { useVendorService } from "../../../services/vendor.service"
import { useAdminService } from "../../../services/admin.service"
import { sendGetVendorItemPopularClicks, sendGetVendorItemPopularViews } from "../../../services/analyticsdb.service"
import { getLocalStorageItem } from "../../../services/storages/local.storage"
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip } from 'chart.js';
Chart.register(
    LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip
)
export function VendorDashboardComponent(props) {
    const { getActiveUsers} = useAdminService()
    const {getvendordata, getServiceData } = useVendorService()
    const [serviceData, setServiceData] = useState([])
    const [activeUsers, setActiveUsers] = useState(0)
    const [clickNames, setClickNames] = useState([])
    const [clickValues, setClickValues] = useState([])
    const [viewNames, setViewNames] = useState([])
    const [viewValues, setViewValues] = useState([])

    const totalClicksCount = clickValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalViewsCount = viewValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    useEffect(() => {
        handleGetServiceData()
        handlesendGetVendorItemPopularClicks()
        handlesendGetVendorItemPopularViews()
    }, [])

    function handleGetServiceData() {
        getServiceData()
            .then((res) => {
                // alert('success')
                console.log('success',res.data)
                setServiceData(res.data)
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
                alert(error+ " \n" + "failed")
            })
    }
    function handlesendGetVendorItemPopularClicks(){
       let vendorIdLocalStorage=getLocalStorageItem('userData')
      let parsingLocalStorage= JSON.parse(vendorIdLocalStorage)
       if(parsingLocalStorage){
        console.log(parsingLocalStorage.checked._id,'useridfrom local storage')
       }
 let data={
    _id:parsingLocalStorage.checked._id
 }
        sendGetVendorItemPopularClicks(data)
        .then((res) => {
        //   alert('success')
          console.log('sendGetVendorItemPopularClicks', res.data)
          handleClickNames(res.data)
          handleClickValues(res.data)
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
      function handlesendGetVendorItemPopularViews(){
        let vendorIdLocalStorage=getLocalStorageItem('userData')
       let parsingLocalStorage= JSON.parse(vendorIdLocalStorage)
        if(parsingLocalStorage){
         console.log(parsingLocalStorage.checked._id,'useridfrom local storage')
        }
  let data={
     _id:parsingLocalStorage.checked._id
  }
         sendGetVendorItemPopularViews(data)
         .then((res) => {
        //    alert('success')
           console.log('sendGetVendorItemPopularViews', res.data)
           handleViewNames(res.data)
                handleViewValues(res.data)
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
       function handleClickNames(data) {
        const newData = data.map(item => item.name);
        console.log(newData, 'clicknames')
        setClickNames(newData);
    }
    function handleClickValues(data) {
        const newData = data.map(item => item.count);
        console.log(newData, 'clickvalues')
        setClickValues(newData);
    }
    function handleViewNames(data) {
        const newData = data.map(item => item.name);
        console.log(newData, 'Viewnames')
        setViewNames(newData);
    }
    function handleViewValues(data) {
        const newData = data.map(item => item.count);
        console.log(newData, 'Viewvalues')
        setViewValues(newData);
    }

        // click bar start 
        const data = {
            labels: clickNames,
            datasets: [
                {
                    label: 'Clicks',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    hoverBorderColor: 'rgba(0,0,0,1)',
                    data: clickValues,
                    barPercentage: 0.5, // Adjust bar width (percentage of available space)
                    categoryPercentage: 0.7, // Adjust space between bars within the same category (percentage of available space)
                    barThickness: 20
                }
            ]
        };
        let options = {
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Clicks make on services in Descending order",
                    fontSize: 30 // Adjust the font size of the title
                }
            },
    
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category' // Specify scale type for the x-axis
                },
                y: {
                    beginAtZero: true // Ensure y-axis starts at zero
                }
            }
    
        }
        // click bar end
        // view bar start 
        const viewdata = {
            labels: viewNames,
            datasets: [
                {
                    label: 'Views',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    hoverBorderColor: 'rgba(0,0,0,1)',
                    data: viewValues,
                    barPercentage: 0.5, // Adjust bar width (percentage of available space)
                    categoryPercentage: 0.7, // Adjust space between bars within the same category (percentage of available space)
                    barThickness: 20
                }
            ]
        };
        let viewoptions = {
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "views make on services in Descending order",
                    fontSize: 30 // Adjust the font size of the title
                }
            },
    
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category' // Specify scale type for the x-axis
                },
                y: {
                    beginAtZero: true // Ensure y-axis starts at zero
                }
            }
    
        }
        // view bar end 
    return (
        <>
            <div className="dashboard  ">
                <div className="container-fluid">
                    <div>
                        <h2>Dashboard</h2>
                        {/* <button onClick={()=>{handlesendGetVendorItemPopularViews()}} className='btn btn-primary'>test</button> */}

                    </div>
                    <div className="row  mt-3 ">
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4">
                            <div className="project_box d-flex ms-1 me-1 ">
                                <div className=" icon_div "> <i className="fas fa-shopping-basket dashboard_icon_size"></i></div>
                                <div className=" ps-2 pt-3 project_content">
                                    <div><h4>Clicks</h4></div>
                                    <div><h5>{totalClicksCount}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4 ">
                            <div className="ledgertype_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-file-invoice-dollar dashboard_icon_size"></i></div>
                                <div className=" pt-3 ps-2 ledgertype_content">
                                    <div><h4>Views</h4></div>
                                    <div><h5>{totalViewsCount}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4 ">
                            <div className="ledgergroup_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-shopping-bag dashboard_icon_size" ></i></div>
                                <div className=" ps-2 pt-3 ledgergroup_content">
                                    <div><h4>Services </h4></div>
                                    <div><h5>{serviceData?.length}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4">
                            <div className="ledger_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-file-invoice-dollar dashboard_icon_size"></i></div>
                                <div className=" pt-3 ps-2 ledger_content">
                                    <div><h4>Count</h4></div>
                                    <div><h5>{activeUsers}</h5></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

<div className="d-flex ms-3">
<div style={{ height: '400px', width: '500px' }} className="mb-5 border">
    {/* <h2>Click Chart</h2> */}
    <Bar
        data={data}
        options={
            options
        }
    />
</div>
<div style={{ height: '400px', width: '500px' }} className="mb-5 border ms-3">
    {/* <h2>View Chart</h2> */}
    <Bar
        data={viewdata}
        options={viewoptions}
       
    />
</div>
</div>


            </div>
        </>
    )
}