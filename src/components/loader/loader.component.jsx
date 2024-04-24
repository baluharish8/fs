import React from 'react'
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./loader.component.css"
import { FadeLoader } from 'react-spinners';
const LoaderComponent = (props) => {
  // const override = {
  //   display: "block",
  //   margin: "0 auto",
  //   // borderColor: "red",
  //   borderWidth: "6px",
  // };
  
  return (
    <>
  
      <div className='popup-overlay'>
          <div className="popup-content">
            <FadeLoader
              color={'#00FFA1'}
              loading={props.loading}
              // cssOverride={override}
              // size={300}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {/* <FadeLoader color="#36d7b7" /> */}
        </div>

      </div>
    </>

  )
}

export default LoaderComponent
