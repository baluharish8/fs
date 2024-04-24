import { useEffect, useState } from "react"
import { useVendorService } from "../../../services/vendor.service"
import "./admindashboard.component.css"
import LoaderComponent from "../../loader/loader.component"
import { useAdminService } from "../../../services/admin.service"
import useAuth from "../../../services/useAuth"
import { getAverageSessionDuration, getPopularCategories, getPopularClicks, getPopularViews, getSearchCount, getclickcount, getviewcount } from "../../../services/analyticsdb.service"
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip } from 'chart.js';
Chart.register(
    LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip
)
export function AdminDashboardComponent(props) {
    const { auth, setAuth } = useAuth();

    const { getvendordata, getServiceData } = useVendorService()
    const { getActiveUsers } = useAdminService()

    const [loading, setLoading] = useState(false)
    const [vendorsData, setVendorsData] = useState([])
    const [serviceData, setServiceData] = useState([])
    const [activeUsers, setActiveUsers] = useState(0)
    const [searches, setSearches] = useState(0)
    const [clicks, setClicks] = useState(0)
    const [views, setViews] = useState(0)
    const [popularCategories, setPopularCategories] = useState([])
    const [averageSessionDuration, setAverageSessionDuration] = useState('')
    const [popularClickData, setPopularClickData] = useState([])
    const [clickNames, setClickNames] = useState([])
    const [clickValues, setClickValues] = useState([])
    const [viewNames, setViewNames] = useState([])
    const [viewValues, setViewValues] = useState([])




    function checkingFunct() {
        handleActiveUsersData()

    }

    useEffect(() => {
        handleGetPopularCategories()
        handleGetSearchCount()
        handlegetclickcount()
        handlegetviewcount()
        handlegetAverageSessionDuration()
        handlegetPopularClicks()
        handlegetPopularViews()

        handleGetVendorData()
        handleGetServiceData()
        handleActiveUsersData()
        // Start the timer when the component mounts
        const intervalId = setInterval(() => {
            // Update the seconds state every second
            // handleActiveUsersData()
            checkingFunct()
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [])
    function handleGetVendorData() {
        setLoading(true)
        getvendordata()
            .then((res) => {
                setLoading(false)
                // alert('success')
                setVendorsData(res.data)
            })
            .catch((error) => {
                setLoading(false)
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
    function handleGetServiceData() {
        setLoading(true)
        getServiceData()
            .then((res) => {
                setLoading(false)
                // alert('success')
                setServiceData(res.data)
            })
            .catch((error) => {
                setLoading(false)
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
    function handleActiveUsersData() {
        // setLoading(true)
        getActiveUsers()
            .then((res) => {
                setLoading(false)
                // alert('success')
                setActiveUsers(res.data)
                console.log(res.data, ' from active users ')
            })
            .catch((error) => {
                setLoading(false)
                // alert(error)
                // if (error.response && error.response.status === 400) {
                //     // Backend returned a 400 status code

                //     if (error.response.data) {
                //         // handleAlertMessageFailure()
                //         // setFailedMessage(error.response.data.message)
                //         alert(error.response.data)

                //     } else {
                //         console.error(error.response.data); // This will log 'User already exists'
                //         // alert(error.response.data)
                //     }
                // } else {
                //     // Other types of errors
                //     console.log('An error occurred:', error);
                // alert(error+ " \n" + "failed")

                // }
            })
    }

    function handleGetPopularCategories() {

        getPopularCategories()
            .then((res) => {
                //   alert('success')
                console.log('GetPopularCategories', res.data)
                setPopularCategories(res.data)
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
    function handleGetSearchCount() {

        getSearchCount()
            .then((res) => {
                //  alert('success')
                console.log('getSearchCount', res.data)
                setSearches(res.data)
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
    function handlegetclickcount() {

        getclickcount()
            .then((res) => {
                //  alert('success')
                console.log('getclickcount', res.data)
                setClicks(res.data)
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
    function handlegetviewcount() {

        getviewcount()
            .then((res) => {
                //  alert('success')
                console.log('getviewcount', res.data)
                setViews(res.data)
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
    function handlegetAverageSessionDuration() {

        getAverageSessionDuration()
            .then((res) => {
                //  alert('success')
                console.log('getAverageSessionDuration', res.data)
                let timestamp = res.data.averageDuration
                let seconds = timestamp / 1000;
                let minutes = seconds / 60;
                setAverageSessionDuration(Math.round(minutes))
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
    function handlegetPopularClicks() {

        getPopularClicks()
            .then((res) => {
                //  alert('success')
                console.log('getPopularClicksMergedData', res.data)
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
    function handlegetPopularViews() {

        getPopularViews()
            .then((res) => {
                //  alert('success')
                console.log('getPopularViewsMergedData', res.data)
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
        console.log(newData, 'clicknames')
        setViewNames(newData);
    }
    function handleViewValues(data) {
        const newData = data.map(item => item.count);
        console.log(newData, 'clickvalues')
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
    // sessionDuration bar start 
    const sessionDuration = {
        labels: ["Avg Session Duration"],
        datasets: [
            {
                label: 'Session Duration',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(0,0,0,1)',
                data: [averageSessionDuration],
                // barPercentage: 0.5, // Adjust bar width (percentage of available space)
                // categoryPercentage: 0.7, // Adjust space between bars within the same category (percentage of available space)
                barThickness: 25
            }
        ]
    };
    let sessionOptions = {
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: "Average Session Duration",
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
    return (
        <>
            {/* <button onClick={()=>{handleActiveUsersData()}} className='btn btn-primary'>test</button> */}

            {
                loading && <LoaderComponent loading={loading} />
            }
    

            <div className="dashboard  ">
                <div className="container-fluid">
                    <div>
                        <h2>Dashboard</h2>
                    </div>
                    <div className="row  mt-3 ">
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4">
                            <div className="project_box d-flex ms-1 me-1 ">
                                <div className=" icon_div "> <i className="fas fa-shopping-basket dashboard_icon_size"></i></div>
                                <div className=" ps-2 pt-3 project_content">
                                    <div><h4>Users</h4></div>
                                    <div><h5>{vendorsData.length}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4 ">
                            <div className="ledgertype_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-file-invoice-dollar dashboard_icon_size"></i></div>
                                <div className=" pt-3 ps-2 ledgertype_content">
                                    <div><h4>Active Users</h4></div>
                                    <div><h5>{activeUsers}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4 ">
                            <div className="ledgergroup_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-shopping-bag dashboard_icon_size" ></i></div>
                                <div className=" ps-2 pt-3 ledgergroup_content">
                                    <div><h4>Services</h4></div>
                                    <div><h5>{serviceData.length}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4">
                            <div className="ledger_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-file-invoice-dollar dashboard_icon_size"></i></div>
                                <div className=" pt-3 ps-2 ledger_content">
                                    <div><h4>searches</h4></div>
                                    <div><h5>{searches}</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row  mt-4 mb-3">
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4">
                            <div className="project_box d-flex ms-1 me-1 ">
                                <div className=" icon_div "> <i className="fas fa-shopping-basket dashboard_icon_size"></i></div>
                                <div className=" ps-2 pt-3 project_content">
                                    <div><h4>clicks</h4></div>
                                    <div><h5>{clicks}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4 ">
                            <div className="ledgertype_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-file-invoice-dollar dashboard_icon_size"></i></div>
                                <div className=" pt-3 ps-2 ledgertype_content">
                                    <div><h4> views</h4></div>
                                    <div><h5>{views}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4 ">
                            <div className="ledgergroup_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-shopping-bag dashboard_icon_size" ></i></div>
                                <div className=" ps-2 pt-3 ledgergroup_content">
                                    <div><h4>popularCategories</h4></div>
                                    <div><h5>{popularCategories.length}</h5></div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-4 col-lg-3 mb-4">
                            <div className="ledger_box d-flex ms-1 me-1 ">
                                <div className=" icon_div p-3"> <i className="fas fa-file-invoice-dollar dashboard_icon_size"></i></div>
                                <div className=" pt-3 ps-2 ledger_content">
                                    <div><h4>avgSessionDuration</h4></div>
                                    <div><h5>{averageSessionDuration}mins</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex ps-3">

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
<div className="pb-5">
<div style={{ height: '400px', width: '200px' }} className="mb-5 mt-4 border ms-3">
    {/* <h2>Average Session Duration Chart</h2> */}
    <Bar
        data={sessionDuration}
        options={sessionOptions}
       
    />
</div>
</div>

            </div>
        </>
    )
}