import React, { useState } from 'react'
import { useAdminService } from '../../../services/admin.service'
import './adminaccountverify.css'
const AdminAccountVerify = () => {
  const { sendAdminVerifyAi } = useAdminService()
  const [showAlertMessageFailure, setShowAlertMessageFailure] = useState(false)
  const [showAlertMessageSuccess, setShowAlertMessageSuccess] = useState(false)
  const [failedMessage, setFailedMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  let handleVerify = () => {
    sendAdminVerifyAi()
      .then((res) => {
        // alert("success")
        handleAlertMessageSuccess()
        setSuccessMessage('Verification link send to email')
      })
      .catch((error) => {
        alert(error)
      })
  }
  function handleAlertMessageSuccess() {
    setShowAlertMessageSuccess(true)
    setTimeout(
      () => {
        setShowAlertMessageSuccess(false)
      }, 3000)
  }

  return (
    <>
    <div className='d-flex justify-content-center'>

      <div className='message-style'>
        <div className='d-flex justify-content-center mt-5 verify-button'>
          <button className='btn btn-success' onClick={() => { handleVerify() }}>Verify your account</button>
        </div>
        <div className='d-flex justify-content-center' >
          {
            showAlertMessageSuccess && <div className='d-flex justify-content-center bg-success pt-3 pb-2 ps-3 pe-3 mt-3 rounded message-style'>
              <p className='text-white'> {successMessage}</p>
            </div>
          }
        </div>

      </div>
      </div>

    </>

  )
}

export default AdminAccountVerify
