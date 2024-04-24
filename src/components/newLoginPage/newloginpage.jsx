import './newloginpage.css';

import React, { useState } from 'react'
import log from "../../assets/images/finddubailogo.png"

export const Newloginpage = () => {
    // useState()
    return (
        <>
            <div className='d-flex'>
                <div className='w-50 '>
                    <img className=" mb-4 ms-5 me-0 pe-0" src={log}>
                    </img>
                </div>
                <div>
                    <h1 className='fw-bold text-center mt-5'>Welcome back !</h1>

                    <div className='input_div '>
                        <label className='fw-bold mt-5 ps-1 label_style'>Email <span className='text-danger'>*</span></label>
                        <input type='text' className='inp_style' placeholder='Enter your Email address' ></input>
                    </div>
                    <div className='input_div'>
                        <label className='fw-bold mt-4 ps-1 label_style'>Password <span className='text-danger'>*</span></label>
                        <input type='text' className='inp_style' placeholder='Enter Password' ></input>
                    </div>
                    <div className='input_div mt-3'>
                     <button className='login_button mt-5'>LOGIN</button>
                    </div>
                </div>

            </div>
        </>

    )
}


