import { getLocalStorageItem } from "./storages/local.storage";
import { Navigate } from "react-router-dom";
export function AuthRouteAdmin(props) {

    // let uservalid = false;
    // uservalid = getLocalStorageItem("user")
    // if (uservalid) {
    //     return props.children
    // }
    // else {
    //     return <Navigate to="/login"></Navigate>
    // }

    let uservalid = false;
    uservalid = getLocalStorageItem("admintoken")
    if (uservalid) {
        return props.children
    }
    else {
        return <Navigate to="/login"></Navigate>
    }
}