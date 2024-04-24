import React, { useState } from 'react'
import { useAdminService } from '../../../services/admin.service'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoaderComponent from '../../loader/loader.component'
import { set } from 'react-hook-form'
import { removeLocalStorage, removeLocalStorageItem } from '../../../services/storages/local.storage'

const AdminForgetPasswordOtpCheck = () => {
    const [otp, setOtp] = useState('')
    const [showAdmin, setShowAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlertMessageFailure, setShowAlertMessageFailure] = useState(false)
    const [showAlertMessageSuccess, setShowAlertMessageSuccess] = useState(false)
    const [failedMessage, setFailedMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    let navigate = useNavigate()
    const { otpVerifyAi, sendOtpAi } = useAdminService()
    function otpVerify() {
        setLoading(true)
        let data = {
            otp: otp,
        }
        otpVerifyAi(data)
            .then((res) => {
                setLoading(false)

                // alert("success")
                setOtp('')
                setShowAdmin(true)
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

    function handleLogout(){
       removeLocalStorage()
        navigate('/');
    }
    return (
        <>
            {
                loading && <LoaderComponent loading={loading} />
            }
            {
                !showAdmin && <div className='d-flex justify-content-center mt-5 pt-5'>
                    <div style={{ width: "300px" }}>
                        <div className=''>
                            <input type='text' className='form-control' value={otp} onChange={(e) => { setOtp(e.target.value) }}></input>
                            <div className='d-flex justify-content-between mt-4'>
                            <button className='btn btn-primary' onClick={() => { }} >Generate OTP</button>
                            <button className='btn btn-primary' onClick={() => {  }} >Verify OTP</button>
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

            }

            {showAdmin && <div className='d-flex justify-content-center mt-5 pt-5'>
                <div>
                    <div>
                        <h1>Admin Login Success</h1>

                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={() => { handleLogout() }} >Logout</button>
                    </div>
                </div>

            </div>

            }
        </>



    )
}

export default AdminForgetPasswordOtpCheck
