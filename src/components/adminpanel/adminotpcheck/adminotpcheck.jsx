import React, { useState } from 'react'
import { useAdminService } from '../../../services/admin.service'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoaderComponent from '../../loader/loader.component'
import { set } from 'react-hook-form'
import { removeLocalStorage, removeLocalStorageItem } from '../../../services/storages/local.storage'
import './adminotpcheck.css'
const AdminOtpCheck = () => {
    const [otp, setOtp] = useState('')
    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const [showAdmin, setShowAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlertMessageFailure, setShowAlertMessageFailure] = useState(false)
    const [showAlertMessageSuccess, setShowAlertMessageSuccess] = useState(false)
    const [failedMessage, setFailedMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    let navigate = useNavigate()
    const { otpVerifyAi, sendOtpAi, sendMobileOtpAi } = useAdminService()
    function otpVerify() {
        setLoading(true)
        let data = {
            otp: digits.join(''),
        }
        otpVerifyAi(data)
            .then((res) => {
                setLoading(false)

                // alert("success")
                setOtp('')
                // setShowAdmin(true)
                navigate('/admindashboard')
            })
            .catch((error) => {
                // alert(error)
                setLoading(false)

                if (error.response && error.response.status === 404) {
                    console.log('OTP verification failed:', error.response.data.message);
                    // alert(error.response.data.message)
                    handleAlertMessageFailure()
                    setFailedMessage(error.response.data.message)
                    setOtp('')

                } else if (error.response && error.response.status === 500) {
                    console.log('Internal server error:', error.response.data.message);
                } else {
                    console.log('Error:', error.message);
                }
            })
    }
    const resendOtp = async () => {
        setLoading(true)
        // const response = await axios.post('http://localhost:4006/otpsend', { withCredentials: true });
        // console.log("from tesing resnd otp" + response.data.message)
        sendOtpAi()
            // sendMobileOtpAi()
            .then((res) => {
                setLoading(false)
                // alert(res.data.message)
                //email send success response
                handleAlertMessageSuccess()
                setSuccessMessage(res.data.message)
            })
            .catch((error) => {
                setLoading(false)
                if (error.response && error.response.status === 404) {
                    // alert(error.response.data.message)
                    handleAlertMessageFailure()
                    setFailedMessage(error.response.data.message)
                } else {
                    alert(error)
                }
            })
    }
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

    function handleLogout() {
        removeLocalStorage()
        navigate('/');
    }


    const handleDigitChange = (index, value) => {
        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);
    };

    const handleInputChange = (event, index) => {
        const value = event.target.value;
        // Ensure only single-digit numbers are allowed
        if (/^\d{0,1}$/.test(value)) {
            handleDigitChange(index, value);
            // Move focus to the next input field automatically
            if (value !== '' && index < 5) {
                document.getElementById(`digit${index + 1}`).focus();
            }
        }
    };
    return (
        <>
            {
                loading && <LoaderComponent loading={loading} />
            }
            {/* {
                !showAdmin && <div className='d-flex justify-content-center mt-5 pt-5'>
                    <div style={{ width: "300px" }}>
                        <div className=''>
                            <input type='text' className='form-control' value={otp} onChange={(e) => { setOtp(e.target.value) }}></input>
                            <div className='d-flex justify-content-between mt-4'>
                                <button className='btn btn-primary' onClick={() => { resendOtp() }} >resend OTP</button>
                                <button className='btn btn-primary' onClick={() => { otpVerify() }} >Verify OTP</button>
                            </div>

                        </div>
                        <div className='d-flex justify-content-center w-100'>
                            {
                                showAlertMessageFailure && <div className='text-center bg-danger p-3 ps-4 pe-4 mt-3  rounded'>
                                    <p className='text-white'> {failedMessage}</p>
                                </div>
                            }
                            {
                                showAlertMessageSuccess && <div className='text-center bg-success p-3 ps-4 pe-4 mt-3 rounded'>
                                    <p className='text-white'> {successMessage}</p>
                                </div>
                            }
                        </div>
                    </div>


                </div>

            } */}
            <div className='d-flex justify-content-center mt-5'>

                <div >
                    <h2 className='mb-5 mt-5'>Enter Verification Code</h2>
                    {digits.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            id={`digit${index}`}
                            maxLength={1} // Limit input to one character
                            value={digit}
                            onChange={(event) => handleInputChange(event, index)}
                            style={{ border: "none", outline: 'none', backgroundColor: "#F5F4F3", width: "50px", height: "50px", borderRadius: "10px" }}
                            className='ms-2 me-2 mt-5 text-center'
                            autoComplete="off"
                        />
                    ))}
                    <div className=' mt-5 fw-bold '>
                        <span style={{ fontSize: "13px" }} >Didn't receive the OTP ? </span>
                        <p className=' register_button' onClick={() => { resendOtp() }} style={{ fontSize: "13px" }}>Resend the code</p>

                    </div>
                    <div className='mt-5 text-center'>
                        <button className='otpverify_button' onClick={() => { otpVerify() }} >Verify OTP</button>

                    </div>
                    <div className='d-flex justify-content-center w-100'>
                    {
                        showAlertMessageFailure && <div className='text-center bg-danger p-3 ps-4 pe-4 mt-3  rounded'>
                            <p className='text-white'> {failedMessage}</p>
                        </div>
                    }
                    {
                        showAlertMessageSuccess && <div className='text-center bg-success p-3 ps-4 pe-4 mt-3 rounded'>
                            <p className='text-white'> {successMessage}</p>
                        </div>
                    }
                </div>
                </div>

          

            </div>


        </>



    )
}

export default AdminOtpCheck
