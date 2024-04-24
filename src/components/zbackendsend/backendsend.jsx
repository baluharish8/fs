import React, { useState } from 'react'
import { setLocalStorageItem } from '../../services/storages/local.storage';
// import store from '../../services/storages/redux.storage';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { deleteServiceData, getServiceData, saveServiceData, updateServiceData } from '../../services/vendorservices.service';
import { saveImageData } from '../../services/user.service';

export function BackendSendDataComponent() {
    const [name, setName] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [location, setlocation] = useState('')
    const [rating, setrating] = useState('')
    const [reviewcontent, setreviewcontent] = useState('')
    const [isapproved, setIsApproved] = useState('false')
    const [id, setid] = useState('')



    const [img, setImg] = useState([])
    function handleUpload() {
        let fileInput = document.getElementById("serviceimages");
        let file = fileInput.files[0];

        if (file) {
                let formData = new FormData();
                formData.append("serviceimages", file);
                formData.append("name", name);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("location", location);
                formData.append("rating", rating);
                formData.append("reviewcontent", reviewcontent);
                formData.append("isapproved", isapproved);

            saveServiceData(formData)
                .then((res) => {
                    console.log(res)
                    // if you select file then post will work, see if condition
                    alert("success")
                })
                .catch((res) => {
                    alert(res )
                })

        }

    }
    function handleDownload() {
        getServiceData()
            .then((res) => {
                setImg(res.data)
                console.log(res.data)
                alert("get success")
            })
            .catch((res) => {
                alert(res + " \n" + "user not exist")
            })
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
        let data = {
            id: id,
            name: name,
            description: description,
            price: price,
            location: location,
            rating: rating,
            reviewcontent: reviewcontent
        }

        updateServiceData(data)
            .then((res) => {
                alert("update success")
                clearForm()
                handleDownload()
            })
            .catch((res) => {
                alert(res + " \n" + "user not exist")
            })
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
    }
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    // const base64String1= btoa( String.fromCharCode(...new Uint8Array(img[0].serviceimages.data)))
    // <img src={`data:image/jpeg;base64,${base64String1}`} alt='imgnot'></img> 

    return (
        <>
            <div style={{ zIndex: "1000" }} className='ms-5 mt-5'>

                <div>
                    <input type='text' className='mt-1' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                </div>
                <div>
                    <input type='text' className='mt-1' value={description} onChange={(e) => { setdescription(e.target.value) }}></input>
                </div>
                <div>
                    <input type='text' className='mt-1' value={price} onChange={(e) => { setprice(e.target.value) }}></input>
                </div>
                <div>
                    <input type='text' className='mt-1' value={location} onChange={(e) => { setlocation(e.target.value) }}></input>
                </div>
                <div>
                    <input type='text' className='mt-1' value={rating} onChange={(e) => { setrating(e.target.value) }}></input>
                </div>
                <div>
                    <input type='text' className='mt-1' value={reviewcontent} onChange={(e) => { setreviewcontent(e.target.value) }}></input>
                </div>
                <div className='mt-2'>
                    <input type="file" id="serviceimages" /><br></br>
                    <button onClick={() => { handleEdited() }}>EDited Submit</button>&nbsp;&nbsp;
                    <button onClick={() => { clearForm() }}>clear form</button>&nbsp;&nbsp;

                </div>
                <div className='mt-2'>
                    <button onClick={() => { handleUpload() }} className='btn btn-danger' >post</button> &nbsp;&nbsp;
                    <button onClick={() => { handleDownload() }}>get</button>
                </div>
                <div className='mt-3 d-flex flex-wrap'>

                    {img.map((item, index) => {

                        const base64String = btoa(String.fromCharCode(...new Uint8Array(item.serviceimages.data)))
                        return <>
                            <div className='m-2'>
                                <div>
                                    <span> {item.name} </span><br></br>
                                    <img src={`data:image/jpeg;base64,${item.serviceimages}`} alt='imgnot'></img><br></br>
                                    <button onClick={() => { handleEdit(item) }}>EDit</button>&nbsp;&nbsp;
                                    <button onClick={() => { handleDelete(item.id) }} className='mb-3 me-3'>Delete</button>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </div>

        </>
    )

}