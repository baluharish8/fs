import { deleteItem, getData, saveData, updateData } from "./context.service";


let orderURL="http://localhost:4006/api/payment/orders"
let verifyURL="http://localhost:4006/api/payment/verify"

export function orderPayment(data){
    return saveData(orderURL,data)
}

export function verifyPayment(data){
    return saveData(verifyURL,data)
}