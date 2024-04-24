import axios from "axios";


export function getData(url,headers){
    // return axios.get(url)
    return axios.get(url,headers)

}

export function saveData(url,data){
    return axios.post(url,data)
}

export function updateData(url,data){
    return axios.put(url,data)
}

export function deleteItem(url){
    return axios.delete(url)
}