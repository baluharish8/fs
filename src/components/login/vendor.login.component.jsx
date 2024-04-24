import './login.component.css'
import React, { useState } from 'react'
import { getLocalStorageItem, removeLocalStorage, removeLocalStorageItem, setLocalStorageItem } from '../../services/storages/local.storage';
// import store from '../../services/storages/redux.storage';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import store from '../../services/storages/redux.storage';
import googleLogo from '../../assets/images/googlelogo.png'
import axios from 'axios';
import { getAdminProfile, sendForgetPasswordLink, useAdminService } from '../../services/admin.service';
import LoaderComponent from '../loader/loader.component';
import log from "../../assets/images/finddubailogo.png"
import { useVendorService } from '../../services/vendor.service';
import useAuth from '../../services/useAuth';

export function VendorLoginComponent(props) {
    const { auth, setAuth } = useAuth();

    const { loginVendorAi } = useVendorService()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [adminEmail, setAdminEmail] = useState('admin@email.com')
    const [showAdmimVerify, setShowAdmimVerify] = useState(false)
    const [errors, setErrors] = useState(false)
    const [emailvalid, setEmailvalid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlertMessageFailure, setShowAlertMessageFailure] = useState(false)
    const [showAlertMessageSuccess, setShowAlertMessageSuccess] = useState(false)
    const [failedMessage, setFailedMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')





    axios.defaults.withCredentials = true;
    let navigate = useNavigate()
    // useEffect(() => {

    //     store.dispatch({type:"userData", data:null})
    // }, [])

    useEffect(() => {
        // store.dispatch({type:"userData", data:null})
        // removeLocalStorage()

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const existedUser = urlParams.get('existedUser');


        if (token) {
            let headers = {
                "Authorization": `Bearer ${token}`
            };

            // Store the token in local storage
            setLocalStorageItem("token", token);
            // console.log('from params existeduser',existedUser.firstName)
            store.dispatch({ type: "userData", data: existedUser })
            // getVendorProfileDataAi()
            getAdminProfile({ headers })
                .then((res) => {
                    store.dispatch({ type: "userData", data: res.data })
                    navigate("/")
                    console.log('from login user profile', res.data)
                })
                .catch((error) => {
                    alert(error)
                    // if (error.response && error.response.status === 400) {
                    //     console.error(error.response.data);
                    //     alert(error.response.data + "msg from BE")
                    // } else {
                    //     console.error('An error occurred:', error.message);
                    // }
                    // if (error.response && error.response.status === 500) {
                    //     console.error(error.response.data);
                    //     alert(error.response.data + "msg from")
                    //     removeLocalStorageItem("vendortoken")
                    //     navigate('/login')
                    // } else {
                    //     console.error('An error occurred:', error.message + "at else");
                    // }
                })

            // navigate("/")

        }
    }, []);

    // function emailOnchange(){
    let emailValidationCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailvalid1 = emailValidationCheck.test(email)
    //    console.log(emailvalid)
    //    setEmailvalid(emailvalid)
    // }
    // function passwordOnchange(){
    let passwordValidationCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/;
    let passwordValid1 = passwordValidationCheck.test(password)
    // console.log(passwordValid)
    // setPasswordValid(passwordValid)
    // }
    function validCheck() {
        setErrors(true)

    }
    function getRegisteredUser() {
        setErrors(true)
        if (email !== '' && password !== '' && emailvalid1 && passwordValid1) {
            let data = {
                email: email,
                password: password
            }
            console.log(password, 'signin password')
            setLoading(true)
            // saveUserTokenData(data)
            loginVendorAi(data)
                .then((res) => {
                    setLoading(false)
                    console.log(res.data.token)
                    console.log(res.data)
                    setLocalStorageItem("user", res.data)
                    setLocalStorageItem("sessionStart", Date.now())
                    setLocalStorageItem("token", res.data.token)
                    setLocalStorageItem("userData", res.data)
                    // setAuth(prev => {
                    //     console.log(JSON.stringify(prev));
                    //     console.log(res.data.accessToken);
                    //     return { ...prev, accessToken: res.data.token }
                    // });
                    setAuth({ ...auth, accessToken: res.data.token });
                    // alert("admin check success")

                    store.dispatch({ type: "userData", data: res.data.checked })
                    navigate("/vendordashboard")
                })
                .catch((error) => {
                    setLoading(false)
                    // alert(error)
                    if (error.response && error.response.status === 400) {
                        // Backend returned a 400 status code

                        if (error.response.data.message === 'User Not verified') {
                            // alert(error.response.data.message)
                            setLocalStorageItem("token", error.response.data.token)
                            setShowAdmimVerify(true)
                            handleAlertMessageFailure()
                            setFailedMessage(error.response.data.message)
                        } else if (error.response.data) {
                            handleAlertMessageFailure()
                            setFailedMessage(error.response.data)
                        } else {
                            console.error(error.response.data); // This will log 'User already exists'
                            alert(error.response.data)
                        }
                    } else {
                        // Other types of errors
                        console.log('An error occurred:', error);
                    }
                    // alert(res + " \n" + "user not exist")
                })
        } else {
            // alert("please enter email and password")
        }

    }
    // let handleVerify = () => {
    //     // setLoading(true)
    //     sendAdminVerifyAi()
    //         .then((res) => {
    //             // setLoading(false)
    //             handleAlertMessageSuccess()
    //             setSuccessMessage('Verification link send to email')
    //             // alert("success")
    //             //email send success response
    //         })
    //         .catch((error) => {
    //             // setLoading(false)

    //             if (error.response && error.response.status === 400) {
    //                 alert(error.response.data)
    //             } else {
    //                 alert(error)
    //             }
    //         })
    // }
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


    function handleGoogleSignIn() {
        window.open("http://localhost:4006/auth/google", "_self")
    }

    // testingRefreshToken 
    const refresh = async () => {
        const response = await axios.get('http://localhost:4006/refresh', {
            withCredentials: true
        });
        console.log("from tesing refresh token" + response.data)
    }

    const sendOtp = async () => {
        let data = {
            email: email
        }
        const response = await axios.post('http://localhost:4006/otpsend', data, { withCredentials: true });
        console.log("from tesing refresh token" + response.data)
    }
    function handleSendForgetPasswordLink() {
        let data = {
            email: email
        }
        console.log('forgetpassword')
        sendForgetPasswordLink(data)
            .then((res) => {
                setLoading(false)
                console.log(res.data.token)
                console.log(res.data)
                setLocalStorageItem("user", res.data)

                setLocalStorageItem("token", res.data.token)
                setLocalStorageItem("userData", res.data)

                // alert("admin check success")
                handleAlertMessageSuccess()
                setSuccessMessage(' link send to email')
                store.dispatch({ type: "userData", data: res.data.checked })
                // navigate("/adminotpcheck")
            })
            .catch((error) => {
                setLoading(false)
                // alert(error)
                if (error.response && error.response.status === 400) {
                    // Backend returned a 400 status code

                    if (error.response.data.message === 'User Not verified') {
                        // alert(error.response.data.message)
                        setLocalStorageItem("token", error.response.data.token)
                        setShowAdmimVerify(true)
                        handleAlertMessageFailure()
                        setFailedMessage(error.response.data.message)
                    } else if (error.response.data) {
                        handleAlertMessageFailure()
                        setFailedMessage(error.response.data)
                    } else {
                        console.error(error.response.data); // This will log 'User already exists'
                        // alert(error.response.data)
                    }
                } else {
                    // Other types of errors
                    console.log('An error occurred:', error);
                }
                // alert(res + " \n" + "user not exist")
            })
    }

    return (
        <>




            {
                loading && <LoaderComponent loading={loading} />
            }
            <div className='login d-flex justify-content-center'>


                <div className='login-form m-3 mt-5'>
                    {/* <img className="logo-reg mb-4" src={log}>
          </img> */}
                    <h4 style={{ textAlign: "center" }}>Log in</h4>

                    <div className='form-group mt-3'>
                        <input type='email' className='input-tags' placeholder='Email address' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} ></input>
                        {
                            errors && email == "" ? <span className="text-danger error_size ">Please Enter Email</span> : errors && !emailvalid1 ? <span className="text-danger error_size ">Please Enter Valid Email</span> : ""
                        }

                    </div>
                    <div className='form-group mt-3'>
                        <input type='password' className='input-tags' placeholder='password' id='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        {
                            errors && password == "" ? <span className="text-danger error_size ">Please Enter Password</span> : errors && !passwordValid1 ? <span className="text-danger error_size ">contains at least one uppercase letter, one lowercase letter, one digit, one special character and 8 characters</span> : ""
                        }

                    </div>
                    {/* <div className='mt-4'>
                    <input type="radio" value="true" id="radio-sign" className='me-2' />
                    <label htmlFor="radio-sign"> Keep me signed in</label>
                </div> */}
                    <div className='mt-4 text-end'>
                        <p className='text-primary fw-bold forget-password' onClick={() => { handleSendForgetPasswordLink() }}>Forget Password</p>
                    </div>
                    <div className='mt-4 signin_btn'>
                        {
                            !showAdmimVerify && <button className=' btn btn-primary' onClick={() => { getRegisteredUser() }}>Signin</button>
                        }
                        {
                            showAdmimVerify && <button className=' btn btn-success w-100' onClick={() => { }}>Verify Account</button>
                        }
                        {
                            showAlertMessageFailure && <div className='text-center bg-danger p-3 ps-2 pe-2 mt-3 rounded'>
                                <p className='text-white'> {failedMessage}</p>
                            </div>
                        }
                        {
                            showAlertMessageSuccess && <div className='text-center bg-success p-3 ps-2 pe-2 mt-3 rounded'>
                                <p className='text-white'> {successMessage}</p>
                            </div>
                        }
                    </div>

                    {/* <div className='d-flex  align-items-center justify-content-center google-logo-div  rounded-pill mt-2 mb-2 w-100'>
                    <div className='p-2'>
                        <img src={googleLogo} className='google-logo'></img>
                        <button className='google-logo-button' onClick={() => { handleGoogleSignIn() }}> Sign in with Google </button>
                    </div>
                </div> */}
                    {/* <button className='btn btn-primary' onClick={() => { sendOtp() }}> sendOtp </button> */}

                </div>

            </div>
            {/* new loging page start  */}
            <div className='w-100'>

            <div className='d-flex'>
                <div>
                    <img className="logo-reg mb-4" src={log}>
                    </img>
                </div>
                <div>
                    <div className='form-group mt-3'>
                        <input type='email' className='newinput-tags' placeholder='Email address' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} ></input>
                        {
                            errors && email == "" ? <span className="text-danger error_size ">Please Enter Email</span> : errors && !emailvalid1 ? <span className="text-danger error_size ">Please Enter Valid Email</span> : ""
                        }

                    </div>
                    <div className='w-100 mt-3'>
                        <input type='password' className='newinput-tags' placeholder='password' id='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        {
                            errors && password == "" ? <span className="text-danger error_size ">Please Enter Password</span> : errors && !passwordValid1 ? <span className="text-danger error_size ">contains at least one uppercase letter, one lowercase letter, one digit, one special character and 8 characters</span> : ""
                        }

                    </div>
                </div>
            </div>
            </div>

        </>
    )


}