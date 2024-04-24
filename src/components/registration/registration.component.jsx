import { useForm } from "react-hook-form"
import "./registration.component.css"
import { useNavigate } from "react-router-dom"
import { SaveAdminRegistration, useAdminService } from "../../services/admin.service"
import { setLocalStorageItem } from "../../services/storages/local.storage"
import LoaderComponent from "../loader/loader.component"
import { useState } from "react"
import log from "../../assets/images/Justdiallogo.png"
import axios from "axios"
export function RegistrationComponent() {
    const { registrationAdminAi } = useAdminService()
    const [loading, setLoading] = useState(false)
    const [showAlertMessageFailure, setShowAlertMessageFailure] = useState(false)
    const [showAlertMessageSuccess, setShowAlertMessageSuccess] = useState(false)
    const [failedMessage, setFailedMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    //  variable for useform
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    let navigate = useNavigate()
    axios.defaults.withCredentials = true;

    function sendData(event) {
        let data = {
            adminKey: document.getElementById("adminkey").value,
            email: document.getElementById("email").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            password: document.getElementById("password").value,
        }
        // saveUserData(data)
        // registrationAdminAi(data)
        setLoading(true)
        SaveAdminRegistration(data)
            .then((res) => {
                console.log(res.data.token, 'from registration')
                setLoading(false)
                setLocalStorageItem("user", res.data)
                setLocalStorageItem("token", res.data.token)
                setLocalStorageItem("userData", res.data)
                // alert("Saved successfully")
                clearForm()

                navigate("/adminaccountverify")
            }
            )
            .catch((error) => {
                setLoading(false)
                // alert(error)
                // console.log(res.data)
                if (error.response && error.response.status === 400) {
                    // Backend returned a 400 status code

                    // navigate("/login")
                    // clearForm()
                    if (error.response.data.message === 'User already exists') {
                        // alert(error.response.data.message)
                        setLocalStorageItem("token", error.response.data.token)
                        handleAlertMessageFailure()
                        setFailedMessage(error.response.data.message)
                    } else if (error.response.data.message === 'key not valid') {
                        // alert(error.response.data.message)
                        handleAlertMessageFailure()
                        setFailedMessage(error.response.data.message)
                    } else {
                        console.error(error.response.data.message); // This will log 'User already exists & key not valid'
                        // alert(error.response.data.message)
                    }

                } else {
                    // Other types of errors
                    console.error('An error occurred:', error.message);
                }
            }
            )
        function handleAlertMessageFailure() {
            setShowAlertMessageFailure(true)
            setTimeout(
                () => {
                    setShowAlertMessageFailure(false)
                }, 3000)
        }
        function handleAlertMessageSuccess() {
            setShowAlertMessageSuccess(true)
            setTimeout(
                () => {
                    setShowAlertMessageSuccess(false)
                }, 3000)
        }


        function clearForm() {
            document.getElementById("adminkey").value = ""
            document.getElementById("email").value = ""
            document.getElementById("firstName").value = ""
            document.getElementById("lastName").value = ""
            document.getElementById("password").value = ""
            document.getElementById("password2").value = ""

        }

    }
    return (
        <>

            <div className="registration container-fluid " style={{ position: 'relative' }}>
               <div className="d-flex justify-content-center w-100 h-100">
                <div style={{ position: 'absolute', top: '2rem', width: '300px' }}>
                    {
                        showAlertMessageFailure && <div className='text-center bg-danger p-3 ps-2 pe-2 mt-3 rounded'>
                            <p className='text-white'> {failedMessage}</p>
                        </div>
                    }
                </div>
                <form className="registration_form row m-3 mt-5" onSubmit={handleSubmit((event) => { sendData(event) })} >

                    {/* <img className="img-fluid"
            src="data:image/png;base64,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"
            alt="sff"
          /> */}
                <div>
                <img className="logo-reg" src={log}>
                    </img>
                </div>
                    
                    {/* <button className="btn btn-primary mb-2" onClick={() => { navigate("/") }}>Home</button> */}
                    <h1 className="text-center display-4 mt-1">REGISTER</h1>
                    {/* <div className='pt-2'>
                        <button className='btn btn-secondary' onClick={() => { }}>User Registration</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className='btn btn-primary' onClick={() => { navigate('/vendorregistration') }}>Vendor Registration</button>
                    </div> */}
                    <div className="col-12 col-sm-6   col-md-4 col-lg-4  ms-2">
                        <input type="password" {...register("key", { required: true })} className="input-registration" placeholder="key" id="adminkey"></input>
                        {
                            errors.key && errors.key.type === "required" ? <span className="text-danger bg-light">Please enter Key</span> : ""

                        }
                    </div>
                    <div className="col-12 col-sm-6  col-md-4 col-lg-4 ms-2">
                        <input type="text" {...register("email", {
                            required: true,
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            }
                        })} className="input-registration  " placeholder="Email" id="email"></input>
                        {
                            errors.email && errors.email.type === "required" ? <span className="text-danger bg-light">Please enter Email</span> :

                                errors.email && errors.email.type === "pattern" ? <span className="text-danger bg-light" >{errors.email.message}</span> : ""
                        }
                    </div>
                    <div className="col-12 col-sm-6   col-md-4 col-lg-4  ms-2">
                        <input type="text" {...register("firstName", { required: true, minLength: 3, maxLength: 15 })} className="input-registration" placeholder="FirstName" id="firstName"></input>
                        {
                            errors.firstName && errors.firstName.type === "required" ? <span className="text-danger bg-light">Please enter firstname</span> :
                                errors.firstName && errors.firstName.type === "minLength" ? <span className="text-danger bg-light">Please enter atleast 3 char</span> :
                                    errors.firstName && errors.firstName.type === "maxLength" ? <span className="text-danger bg-light">Please enter max 15 char</span> : ""

                        }
                    </div>
                    <div className="col-12 col-sm-6   col-md-4 col-lg-4  ms-2">
                        <input type="text" {...register("lastName", { required: true, minLength: 3, maxLength: 15 })} className="input-registration" placeholder="LastName" id="lastName"></input>
                        {
                            errors.lastName && errors.lastName.type === "required" ? <span className="text-danger bg-light">Please enter lastname</span> :
                                errors.lastName && errors.lastName.type === "minLength" ? <span className="text-danger bg-light">Please enter atleast 3 char</span> :
                                    errors.lastName && errors.lastName.type === "maxLength" ? <span className="text-danger bg-light">Please enter max 15 char</span> : ""

                        }
                    </div>

                    <div className="col-12 col-sm-6   col-md-4 col-lg-4  ms-2">
                        <input type="password" {...register("passcode", {
                            required: true,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/,  //This password contains at least one uppercase letter, one lowercase letter, one digit, and one special character, and it's 8 characters long
                                message: 'contains at least one uppercase letter, one lowercase letter, one digit, one special character and 8 characters',
                            }
                        })} className="input-registration" placeholder="Password" id="password"  ></input>
                        {
                            errors.passcode && errors.passcode.type === "required" ? <span className="text-danger bg-light">Please enter password</span> :

                                errors.passcode && errors.passcode.type === "pattern" ? <span className="text-danger bg-light">{errors.passcode.message}</span> : ""
                        }
                    </div>

                    <div className="col-12 col-sm-6   col-md-4 col-lg-4  ms-2">
                        <input type="password" {...register("passcode2", {
                            required: true,
                            // pattern: {
                            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/,  //This password contains at least one uppercase letter, one lowercase letter, one digit, and one special character, and it's 8 characters long
                            //     message: 'contains at least one uppercase letter, one lowercase letter, one digit, one special character and 8 characters',
                            // },
                            validate: (val) => {
                                if (watch('passcode') != val) {
                                    return "Your passwords do no match";
                                }
                            },
                        })} className="input-registration  " placeholder="Confirm password" id="password2"  ></input>
                        {
                            errors.passcode2 && errors.passcode2.type === "required" ? <span className="text-danger bg-light">Please enter confirm password</span> :
                                // errors.passcode2 && errors.passcode2.type === "pattern" ? <span className="text-danger">{errors.passcode2.message}</span> : 
                                errors.passcode2 && errors.passcode2.type === "validate" ? <span className="text-danger bg-light">{"Confirm Password Not Matched"}</span> : ""
                        }

                    </div>
                    <div>
                        {/* <p className="tac mt-5">
                            By creating an account, I agree to the company Terms and Conditions and
                            Privacy Statement.
                        </p> */}
                    </div>
                    <div className="col-12 col-sm-6   col-md-4 col-lg-4  ms-2  ms-2  button ">
                        <div className="">
                            <input type="submit" value="Signup" className="btn btn-success" ></input>
                        </div>

                    </div>
                </form>
               </div>

            </div>

            {
                loading && <LoaderComponent loading={loading} />
            }

        </>
    )
}