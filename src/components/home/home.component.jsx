import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVendorService } from '../../services/vendor.service'
import { getAverageSessionDuration, getPopularCategories, getSearchCount, getclickcount, getviewcount, saveClickItem, saveSearchQueryItem } from '../../services/analyticsdb.service'
import { getServiceData } from '../../services/vendorservices.service'

const HomeComponent = (props) => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  let navigate = useNavigate()
  useEffect(() => {
    handleGetServiceData()


  }, [])
  function handleGetServiceData() {
    getServiceData()
      .then((res) => {
        // alert('success')
        console.log('success services data', res.data)
        setData(res.data)
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
  function handlesaveClickItem(itemId) {
    let data = {
      itemId
    }
    saveClickItem(data)
      .then((res) => {
        alert('success')
        navigate('/viewscomponent');
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
  function handleSaveSearchQueryItem(query) {
    let data = {
      query
    }
    saveSearchQueryItem(data)
      .then((res) => {
        alert('success')
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
  function handleGetPopularCategories() {

    getPopularCategories()
      .then((res) => {
        alert('success')
        console.log('GetPopularCategories', res.data)
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
        alert('success')
        console.log('getSearchCount', res.data)
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
        alert('success')
        console.log('getclickcount', res.data)
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
        alert('success')
        console.log('getviewcount', res.data)
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
        alert('success')
        console.log('getAverageSessionDuration', res.data)
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
    <>
      <div className='d-flex justify-content-center mt-5'>
        <div>
          <button className='btn btn-primary' onClick={() => { navigate('/login') }}>Admin Login</button>&nbsp;&nbsp;
          {/* <button className='btn btn-primary' onClick={()=>{navigate('/registration')}}>Admin Registration</button>&nbsp;&nbsp; */}
          <button className='btn btn-primary' onClick={() => { navigate('/vendorlogin') }}> Login</button>&nbsp;&nbsp;
          <button className='btn btn-primary' onClick={() => { navigate('/newlogin') }}>New Login</button>


        </div>


      </div>
      <div className='text-center' >
        {data.map((item) => (
          <li key={item._id} style={{ cursor: "pointer" }} className='' onClick={() => { handlesaveClickItem(item._id); props.setViewId({ id: item._id, category: item.category }) }} >{item.name}</li>
        ))}
      </div>
      <div className=' d-flex justify-content-center'>
        <div className=' w-25'>
          <input className="form-control " type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />

        </div>

      </div>
      <div className="search_data d-flex justify-content-center">
        <div>

          {
            data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) && search !== "" && item.isapproved === 'true').map((item) => {
              // const base64String = btoa(String.fromCharCode(...new Uint8Array(item.serviceimages))) // this is working for sql database
              return <>
                {/* <li> {item.name}</li>
                                        <li><img src={item.image} alt="online cou"></img> </li> */}
                <div className="card" key={item.id} onClick={() => { }}>
                  <div onClick={() => { handleSaveSearchQueryItem(item.name) }} style={{ cursor: 'pointer' }}>{item.name}</div>
                </div>
              </>
            })
          }
        </div>

      </div>
      <div className=' d-flex justify-content-center mt-3' >
        <div>
          <div >
            <button onClick={() => { handleGetPopularCategories() }} className='btn btn-primary' >getPopularCategories </button>
          </div>
          <div >
            <button onClick={() => { handleGetSearchCount() }} className='btn btn-primary' >GetSearchCount </button>
          </div><div >
            <button onClick={() => { handlegetclickcount() }} className='btn btn-primary' >getclickcount </button>
          </div>
          <div >
            <button onClick={() => { handlegetviewcount() }} className='btn btn-primary' >getviewcount </button>
          </div>
          <div >
            <button onClick={() => { handlegetAverageSessionDuration() }} className='btn btn-primary' >getAverageSessionDuration </button>
          </div>
        </div>
      </div>

    </>

  )
}

export default HomeComponent
