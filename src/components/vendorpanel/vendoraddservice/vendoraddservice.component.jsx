import "./vendoraddservice.component.css"
import React, { useState } from 'react'
import { deleteServiceData, getServiceData, saveServiceData, updateServiceData } from '../../../services/vendorservices.service';

export function VendorAddServiceComponent() {
    const [name, setName] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [location, setlocation] = useState('')
    const [rating, setrating] = useState('')
    const [reviewcontent, setreviewcontent] = useState('')
    const [id, setid] = useState('')
    const [errors, setErrors] = useState(false)


    const [img, setImg] = useState([])
    function handleUpload() {
        // setErrors(true)
        // let fileInput = document.getElementById("serviceimages");
        // let file = fileInput.files[0];

        // if (file && name !== '' && description !== '' && price !== '' && location !== '') {
        //     let formData = new FormData();
        //     formData.append("serviceimages", file);
        //     formData.append("name", name);
        //     formData.append("description", description);
        //     formData.append("price", price);
        //     formData.append("location", location);
        //     formData.append("rating", rating);
        //     formData.append("reviewcontent", reviewcontent);

        //     saveServiceData(formData)
        //         .then((res) => {
        //             console.log(res)
        //             // if you select file then post will work, see if condition
        //             alert("success")
        //             setErrors(false)
        //             clearForm()

        //         })
        //         .catch((res) => {
        //             alert(res + " \n" + "user not exist")
        //         })

        // }

    }
    function handleDownload() {
        // getServiceData()
        //     .then((res) => {
        //         setImg(res.data)
        //         console.log(res.data)
        //         alert("get success")
        //     })
        //     .catch((res) => {
        //         alert(res + " \n" + "user not exist")
        //     })
    }
    function handleEdit(item) {
        setid(item.id)
        setName(item.name)
        setdescription(item.description)
        setprice(item.price)
        setlocation(item.location)
        setrating(item.rating)
        setreviewcontent(item.reviewcontent)
    }

    function handleEdited() {
        // let data = {
        //     id: id,
        //     name: name,
        //     description: description,
        //     price: price,
        //     location: location,
        //     rating: rating,
        //     reviewcontent: reviewcontent
        // }

        // updateServiceData(data)
        //     .then((res) => {
        //         alert("update success")
        //         clearForm()
        //         handleDownload()
        //     })
        //     .catch((res) => {
        //         alert(res + " \n" + "user not exist")
        //     })
    }

    function handleDelete(id) {
        console.log(id)
        deleteServiceData(id)
            .then((res) => {
                alert("delete success")
                handleDownload()
            })
            .catch((res) => {
                alert(res)
            })
    }
    function clearForm() {
        setid("")
        setName('')
        setdescription('')
        setprice('')
        setlocation('')
        setrating('')
        setreviewcontent('')
        setErrors(false)

    }
    return (<>
        <div className="container-fluid">
            <div className="add_service ms-2 pb-5">
                <h3>Add Service</h3>
                <div className='form-group ' >
                    <label className=""> Enter Service Name :</label><br></br>
                    <input type='text' className='mt-1 form-control' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    {
                        errors && name == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                </div>
                <div className='form-group mt-2'>
                    <label className=""> Enter Service description :</label><br></br>

                    <input type='text' className='mt-1 form-control' value={description} onChange={(e) => { setdescription(e.target.value) }}></input>
                    {
                        errors && description == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                </div>
                <div className='form-group mt-2'>
                    <label className=""> Enter Service price :</label><br></br>

                    <input type='text' className='mt-1 form-control' value={price} onChange={(e) => { setprice(e.target.value) }}></input>
                    {
                        errors && price == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                </div>
                <div className='form-group mt-2'>
                    <label className=""> Enter Service location :</label><br></br>

                    <input type='text' className='mt-1 form-control' value={location} onChange={(e) => { setlocation(e.target.value) }}></input>
                    {
                        errors && location == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                </div>
                {/* <div>
                    <input type='text' className='mt-1' value={rating} onChange={(e) => { setrating(e.target.value) }}></input>
                </div>
                <div>
                    <input type='text' className='mt-1' value={reviewcontent} onChange={(e) => { setreviewcontent(e.target.value) }}></input>
                </div> */}
                <div className='mt-2 form-group'>
                    <input type="file" id="serviceimages" className="form-control" /><br></br>
                    {/* <button onClick={() => { handleEdited() }}>EDited Submit</button>&nbsp;&nbsp; */}
                    {/* <button onClick={() => { clearForm() }}>clear form</button>&nbsp;&nbsp; */}

                </div>
                <div className='mt-2 form-group'>
                    <button onClick={() => { handleUpload() }} className='btn btn-primary ' >Add Service</button> &nbsp;&nbsp;
                    <button onClick={() => { clearForm() }} className="btn btn-danger">clear form</button>&nbsp;&nbsp;

                    {/* <button onClick={() => { handleDownload() }}>get</button> */}
                </div>
                  <div className='mt-2 form-group'>
                    <button onClick={() => { handleUpload() }} className='btn btn-primary ' >Add Service</button> &nbsp;&nbsp;
                    <button onClick={() => { clearForm() }} className="btn btn-danger">clear form</button>&nbsp;&nbsp;

                    {/* <button onClick={() => { handleDownload() }}>get</button> */}
                </div>
            </div>

        </div>
    </>)
}