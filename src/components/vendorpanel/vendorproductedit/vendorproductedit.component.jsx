import { useEffect, useState } from "react";
import "./vendorproductedit.component.css"
import { updateVendorServiceData } from "../../../services/vendorservices.service";
import { useNavigate } from "react-router-dom";

export function VendorProductEditComponent(props) {
    const [name, setName] = useState(props.productEditData?.name)
    const [description, setDescription] = useState(props.productEditData?.description)
    const [price, setPrice] = useState(props.productEditData?.price)
    const [location, setLocation] = useState(props.productEditData?.location)
    const [rating, setRating] = useState(props.productEditData?.rating)
    const [reviewcontent, setReviewContent] = useState(props.productEditData?.reviewcontent)
    const [id, setId] = useState(props.productEditData?._id)
    const [userRating, setUserRating] = useState(props.productEditData?.userRating);
    const [errors, setErrors] = useState(false)

let navigate=useNavigate()
useEffect(()=>{
// console.log(props.productEditData)
},[])

    function updateEditedData() {
        setErrors(true)
        let fileInput = document.getElementById("serviceimages");
        let file = fileInput.files[0];

        if (file && name !== '' && description !== '' && price !== '' && location !== '') {
            let formData = new FormData();
            formData.append("serviceimages", file);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("location", location);
            formData.append("rating", rating);
            formData.append("reviewcontent", reviewcontent);
            formData.append("userRating", userRating);
            formData.append("id", id);



            // console.log(formData)
            updateVendorServiceData(formData)
                .then((res) => {
                    console.log(res.data)
                    alert("update success")
                    setErrors(false)
                    props.onMenuItemClick('vendorproducts')
                })
                .catch((res) => {
                    alert(res)
                })

        }


    }

    return (
        <>
            <div className="container-fluid">
                <div className="project_create_parent">

                    <div className="project_create_header row pb-3">
                        <div className=" col-auto col-sm-2">
                            <button className="btn-create" onClick={() => props.onMenuItemClick('vendorproducts')} >Back</button>
                        </div>
                        <div className=" col-auto col-sm-10 d-flex justify-content-end " >
                            <div className="row ">
                                <div className="col-auto col-sm-auto" >
                                    <button className="btn_home margin_minus " onClick={() => props.onMenuItemClick('dashboard')} ><i className="fa-solid fa-house pe-1"></i> Home</button>
                                </div>
                                {/* <div className="col-auto col-sm-auto ">
                                    <button className="btn_home margin_minus" onClick={() => props.childRef.current.navigateProjectAll()} > <i className="fa-solid fa-angle-right project_angle_right pe-1"></i> <i className="fas fa-project-diagram pe-1"></i> Project Manage</button>
                                </div> */}
                                <div className="col-auto col-sm-auto">
                                    <span className="arrowdown_icon_span ps-1 pe-4"> <i className="fa-solid fa-angle-right project_angle_right pe-1"></i> <i className="fas fa-caret-square-down pe-1"></i>Edit</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="project_create p-3">
                        <div>
                            <p className="create_title p-0 m-0">
                                Edit Product
                            </p>
                            {/* <span className="create_sub_title p-0 m-0">
                                Edit Project Manage Information
                            </span> */}
                        </div>
                        <div className="row ps-4 ">
                            <div className="input_container col-12 col-sm-5">
                                <input
                                    className="input_name"
                                    type="text"
                                    id="myInput"
                                    placeholder=" "
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="myInput" className="label_name">Name<span className="text-danger">*</span></label>
                                {
                        errors && name == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                            </div>

                            <div className="input_container col-12 col-sm-7">
                                <input
                                    className="input_name"
                                    type="text"
                                    id="myInput"
                                    placeholder=" "
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label htmlFor="myInput" className="label_name">Description</label>
                                {
                        errors && description == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                            </div>
                            <div className="input_container pt-5 ">
                                <input
                                    className="input_name"
                                    type="textarea"
                                    id="myInput"
                                    placeholder=" "
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <label htmlFor="myInput" className="label_name">Price</label>
                                {
                        errors && price == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                            </div>
                            <div className="input_container pt-5 ">
                                <input
                                    className="input_name"
                                    type="textarea"
                                    id="myInput"
                                    placeholder=" "
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <label htmlFor="myInput" className="label_name">Location</label>
                                {
                        errors && location == "" && <span className="text-danger error_size ">Please Enter Value</span>
                    }
                            </div>
                            <div>
                                <input type="file" id="serviceimages" className="form-control" /><br></br>

                            </div>
                        </div>
                        <div className="ps-4 pt-4 pb-4">
                            <button className="btn-create" onClick={() => (updateEditedData())}>Update</button>
                        </div>




                    </div>
                </div>
            </div>

        </>
    )
}