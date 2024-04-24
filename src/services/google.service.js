import { deleteItem, getData, saveData, updateData } from "./context.service";


let googleAuthURL="http://localhost:4006/auth/google"

export function googleAuth(){
    return getData(googleAuthURL)
}