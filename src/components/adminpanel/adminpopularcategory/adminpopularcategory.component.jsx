import React, { useEffect, useState } from 'react'
import { getPopularCategories, getPopularsearches } from '../../../services/analyticsdb.service'

export const AdminPopularCategoryComponent = () => {
    const [popularSearches, setPopularSearches] = useState([])

    useEffect(()=>{
        handlegetPopularViews()
    },[])


    function handlegetPopularViews() {

        getPopularCategories()
            .then((res) => {
                //  alert('success')
                console.log('getPopularsearchesMergedData', res.data)
                setPopularSearches(res.data)
            })
            .catch((error) => {
                // alert(error)
                if (error.response && error.response.status === 400) {
                    // Backend returned a 400 status code

                    if (error.response.data) {
                        // handleAlertMessageFailure()
                        // setFailedMessage(error.response.data.message)
                        alert(error.response.data)

                    } else {
                        console.error(error.response.data); // This will log 'User already exists'
                        // alert(error.response.data)
                    }
                } else {
                    // Other types of errors
                    console.log('An error occurred:', error);
                }
                alert(error + " \n" + "failed")
            })
    }
  return (
    <>
    <div>
    <table className='table table-bordered table-hover' >
                    <thead className="">
                        <tr className="">
                            <th className="text-center">Popular Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            popularSearches.map(
                                (item, index) => {
                                    return <>
                                        <tr key={index} className="">
                                            <td className="text-center">
                                                {item._id}
                                            </td>
                                       
                                            {/* <td>
                                                <div className="d-flex justify-content-center project_btn p-0 m-0">
       */}
                                                    {/* <button className="btn_edit p-1 ps-2 pe-2" onClick={() => (editItem(item), props.onMenuItemClick('projectedit'), props.childRef.current.projectEditSidebarMenuItemsHide())} ><i className="fa-solid fa-pen"></i></button>&nbsp; */}
                                                    {/* <button className="btn_delete p-1 ps-2 pe-2" onClick={() => { handleDeleteItem(item) }} ><i className="fa fa-trash" ></i></button>&nbsp; */}
                                                    {/* <button className="btn_pdf p-1 ps-2 pe-2">  <i className="fa-solid fa-file-pdf"></i></button> */}
                                                {/* </div>

                                            </td> */}

                                        </tr>
                                    </>
                                }
                            )
                        }
                    </tbody>
                </table>
    </div>
    </>

  )
}

