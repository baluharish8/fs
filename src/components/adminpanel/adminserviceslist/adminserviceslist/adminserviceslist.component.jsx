import "./adminserviceslist.component.css"
import { useEffect, useRef, useState } from "react"
import { deleteServiceData, getServiceData, updateApproveService } from "../../../../services/vendorservices.service"
import { useNavigate } from "react-router-dom"

export function AdminServicesListComponent(props) {
    let projectAllGridRef=useRef(null)
   let navigate= useNavigate()
    const [projectGridBodyData, setProjectGridBodyData] = useState([])
    const [showSelectActionItems, setShowSelectActionItems] = useState(false)
    const [selectAction,setSelectAction]=useState('Select Action')
  
function handleSelectAction(value){
    setSelectAction(value)
    setShowSelectActionItems(false)
}
    function handleGetProjectData() {
        getServiceData()
            .then((res) => { setProjectGridBodyData(res.data) })
    }

    useEffect(() => {
        handleGetProjectData()
    }, [])

function selectActionApply(){
if(selectAction==='Permanently Delete'){
    projectAllGridRef.current.handleMultipleDelete()
}else{
    alert("Please select desired option")
}
}

// grid code
const [isChecked, setIsChecked] = useState([
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false

])
const [isCheckedIds, setIsCheckedIds] = useState([])
const [selectAllChecked, setSelectAllChecked] = useState(false)

// useEffect(() => {
//     console.log(isCheckedIds)

// }, [isCheckedIds])


function editItem(item) {
    // props.handleProjectEditData(item)
}

    // single item delete 
    function handleDeleteItem(item) {
        let confirmDelete = window.confirm("Are you sure do you want to delete")
        if (confirmDelete) {
            deleteServiceData(item._id)
                .then((res) => {
                    alert("data deleted")
                    handleGetProjectData()
                    // props.handleAlertMessage('delete')

                })
                .catch((res) => {
                    alert(res)
                })
        }
    }
    projectAllGridRef.current = {
        handleMultipleDelete: handleMultipleDelete,
    }
    // delete array of items 
    function handleMultipleDelete() {
        let confirmDelete = window.confirm("Are you sure do you want to delete")
        if (confirmDelete) {
            const newArray = isCheckedIds.map(async (id) => {
                const response = await
                    deleteServiceData(id)
                        .then((res) => {
                            handleGetProjectData()
                            // props.handleAlertMessage('delete')
                            setIsCheckedFalse()
                        })
                        .catch((res) => {
                            alert(res)
                        })
            })
        }
    }
    function setIsCheckedTrue(indexToUpdate, updateValue) {
        const newArray = isChecked.map((value, index) =>
            value = true
        );
        setIsChecked(newArray)
    }
    function setIsCheckedFalse(indexToUpdate, updateValue) {
        const newArray = isChecked.map((value, index) =>
            value = false
        );
        setIsChecked(newArray)
    }

    function showCheckboxs(indexToUpdate, updateValue) {
        const newArray = isChecked.map((value, index) =>
            index === indexToUpdate ? !value : value
        );
        setIsChecked(newArray)
    }

    // for all check boxes th
    function handleAllChecks(e) {
        setSelectAllChecked(!selectAllChecked)
        setIsCheckedIds([]);
        if (e.target.checked) {
            projectGridBodyData.forEach((item) => {
                setIsCheckedIds((prevIds) => [...prevIds, item._id]);
            });
            setIsCheckedTrue()
        } else {
            setIsCheckedFalse()
            setIsCheckedIds([]);
        }
        console.log(isCheckedIds)
    }
    // for single checkbox td
    function handleChecked(e, index) {
        setSelectAllChecked(false)

        showCheckboxs(index)
        const { value, checked } = e.target;

        if (checked) {
            setIsCheckedIds([...isCheckedIds, value])
            console.log("checked true")
            console.log(isCheckedIds)


        } else {
            setIsCheckedIds(isCheckedIds.filter((e) => e != value))
            console.log("checked false")
            console.log(isCheckedIds)
        }

    }

    function handleGiveApproval(id){
        let data={
            id:id
        }
        updateApproveService(data)
        .then((res) => {
            handleGetProjectData()
            // props.handleAlertMessage('delete')
            alert("success")
        })
        .catch((res) => {
            alert(res)
        })
    }



    return (
        <>
            <div className="container-fluid">
                <div className="project_all_header row pb-3">
                    <div className=" col-auto col-sm-2">
                        {/* <button className="btn-create" onClick={() => props.childRef.current.navigateProjectCreate()}>Create</button> */}
                    </div>
                    <div className=" col-auto col-sm-10 d-flex justify-content-end " >
                        <div className="row ">
                            <div className="col-auto col-sm-auto" >
                                <button className="btn_home margin_minus" onClick={() => navigate('/')} ><i className="fa-solid fa-house pe-1"></i> Home</button>
                            </div>
                            {/* <div className="col-auto col-sm-auto ">
                                <button className="btn_home margin_minus" onClick={() => props.childRef.current.navigateProjectAll()}> <i className="fa-solid fa-angle-right project_angle_right pe-1"></i> <i className="fas fa-project-diagram pe-1"></i> Project Manage</button>
                            </div> */}
                            <div className="col-auto col-sm-auto">
                                <span className="arrowdown_icon_span ps-1 pe-4"> <i className="fa-solid fa-angle-right project_angle_right pe-1"></i> <i className="fas fa-caret-square-down pe-1"></i>All</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="project_all pb-5">
                    <div className="quick_header1 row ">
                        <div className="col-auto col-sm-5 col-md-8 col-lg-9 ">
                            <button className="btn-all">All({projectGridBodyData.length})</button>&nbsp;
                            {/* <button className="btn-trash">Trash(21)</button> */}
                        </div>
                        <div className="col-auto col-sm-6 col-md-2 col-lg-2 ">
                            {/* <div className="input_searc"> */}
                            <input type="text" placeholder="Search" className="form-control input_search "></input>
                            {/* </div> */}
                        </div>
                    </div>

                    {/* select action  */}
                    <div className="d-flex p-3 pt-2">
                        <div className="" style={{ position: 'relative' }}>
                            <div className="select_action p-3 d-flex justify-content-between" onClick={() => { setShowSelectActionItems(true) }} ><span>{selectAction}</span><span><i className="fa-solid fa-caret-down text-end ps-1 pe-1"></i></span> </div>
                            {showSelectActionItems && (
                                <ul className="select_action_items  text-start pb-0 mb-0 ">
                                    <li className="" onClick={() => { handleSelectAction('Select Action') }}>  <span>Select Action</span></li>
                                    <li className="" onClick={() => { handleSelectAction('Move to trash') }}> <span>Move to trash</span></li>
                                    <li className="" onClick={() => { handleSelectAction('Permanently Delete')}}> <span>Permanently Delete</span></li>

                                </ul>
                            )}

                        </div>
                        <div className="pt-3">
                            <button className="btn-create" onClick={()=>{selectActionApply()}}>Apply</button>
                        </div>
                    </div>
{/* grid data  start*/}
                    <div className="p-3 pt-2">
                    <div className="project_all_grid ">
                {/* <h3> {props.title} </h3> */}
                <table className='table table-bordered table-hover' >
                    <thead className="">
                        <tr className="">
                            <th className="text-center ckeckbox_table_th"> <input type="checkbox" checked={selectAllChecked} onChange={(e) => handleAllChecks(e)} style={{}} className="checkbox_styles pt-3 ps-3"></input> </th>
                            <th className="">Service Name</th>
                            <th className="">Location</th>
                            <th className="project_description">Description</th>
                            <th className="text-center ">Options</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projectGridBodyData.map(
                                (item, index) => {
                                    return <>
                                        <tr key={item.id} className="">
                                            <td className="text-center ckeckbox_table"> <input type="checkbox" value={item._id} checked={isChecked[index]} onChange={(e) => handleChecked(e, index)} style={{}} className="checkbox_styles pt-3 ps-3"></input> </td>
                                            <td className="">
                                                {item.name}
                                            </td>
                                            <td className="">
                                                {item.location}
                                            </td>
                                            <td className="" >
                                                {item.description}
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center project_btn p-0 m-0">
                                              {
                                                item.isapproved === 'true' && <button className="btn btn-success">Approved</button>
                                              }&nbsp;&nbsp;
                                                 {
                                                item.isapproved === null  && <button className="btn btn-warning" onClick={()=>{handleGiveApproval(item._id)}}>Give Approval</button>
                                              }
                                                 {
                                                item.isapproved === 'false' && <button className="btn btn-warning" onClick={()=>{handleGiveApproval(item._id)}}>Give Approval</button>
                                              }&nbsp;&nbsp;

                                                    {/* <button className="btn_edit p-1 ps-2 pe-2" onClick={() => (editItem(item), props.onMenuItemClick('projectedit'), props.childRef.current.projectEditSidebarMenuItemsHide())} ><i className="fa-solid fa-pen"></i></button>&nbsp; */}
                                                    <button className="btn_delete p-1 ps-2 pe-2" onClick={() => { handleDeleteItem(item) }} ><i className="fa fa-trash" ></i></button>&nbsp;
                                                    {/* <button className="btn_pdf p-1 ps-2 pe-2">  <i className="fa-solid fa-file-pdf"></i></button> */}
                                                </div>

                                            </td>

                                        </tr>
                                    </>
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
                    </div>
{/* grid data  end*/}

                    <div className="d-flex p-3 pt-2">
                        <div className="" style={{ position: 'relative' }}>
                            <div className="select_action p-3 d-flex justify-content-between" onClick={() => { setShowSelectActionItems(true) }} ><span>{selectAction}</span><span><i className="fa-solid fa-caret-down text-end ps-1 pe-1"></i></span> </div>
                            {showSelectActionItems && (
                                <ul className="select_action_items  text-start pb-0 mb-0 ">
                                    <li className="" onClick={() => { handleSelectAction('Select Action') }}>  <span>Select Action</span></li>
                                    <li className="" onClick={() => { handleSelectAction('Move to trash') }}> <span>Move to trash</span></li>
                                    <li className="" onClick={() => { handleSelectAction('Permanently Delete')}}> <span>Permanently Delete</span></li>

                                </ul>
                            )}

                        </div>
                        <div className="pt-3">
                            <button className="btn-create" onClick={()=>{selectActionApply()}}>Apply</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}