import { deleteItem, getData, saveData, updateData } from "./context.service";


let grtServicesURL="http://localhost:4006/getservice";
let addServicesURL="http://localhost:4006/addservice/"
let updateServicesURL="http://localhost:4006/updateservice/"
let deleteServicesURL="http://localhost:4006/deleteservice/"
let updateApproveServicesURL="http://localhost:4006/updateapprove/"
let updateVendorServiceDataURL="http://localhost:4006/updatevendorservice/"

let getVendorServicesURL="http://localhost:4006/getvendorservice";

let getVendorProfileURL="http://localhost:4006/getvendorprofile";

let vendorRegistrationURL="http://localhost:4006/vendorregistration/";
let vendorLoginURL="http://localhost:4006/vendorlogin";

export function saveVendorData(data){
    return saveData(vendorRegistrationURL,data)
}
export function saveVendorLogin(data){
    return saveData(vendorLoginURL,data)
}

export function getServiceData(){
    return getData(grtServicesURL)
}
export function getVendorServiceData(headers){
    return getData(getVendorServicesURL,headers)
}

export function saveServiceData(data){
    return saveData(addServicesURL,data)
}


export function updateServiceData(data){
    return updateData(updateServicesURL,data)
}

export function deleteServiceData(id){
    return  deleteItem(deleteServicesURL+id)
}

export function updateApproveService(data){
    return updateData(updateApproveServicesURL,data)
}
export function updateVendorServiceData(data){
    return updateData(updateVendorServiceDataURL,data)
}

export function getVendorProfileData(headers){
    return getData(getVendorProfileURL,headers)
}