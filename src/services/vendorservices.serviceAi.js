import { getAiData, useGetAiData, UseGetAiData } from "./context.axiosinstance.service";
import { deleteItem, getData, saveData, updateData } from "./context.service";


let grtServicesURL="http://localhost:4006/getservice";
let addServicesURL="http://localhost:4006/addservice/"
let updateServicesURL="http://localhost:4006/updateservice/"
let deleteServicesURL="http://localhost:4006/deleteservice/"
let updateApproveServicesURL="http://localhost:4006/updateapprove/"
let updateVendorServiceDataURL="http://localhost:4006/updatevendorservice/"

let getVendorServicesURL="http://localhost:4006/getvendorservice";

let getVendorProfileURL="http://localhost:4006/getvendorprofile";

  export function useGetVendorServiceDataAi() {
    const aiDataFetcher = useGetAiData();
    // const getAiData = useGetAiData();
    
  
    const getVendorServiceDataAi = async () => {
      try {
        const response = await aiDataFetcher.getAiData(getVendorServicesURL);
        // const response = await getAiData(getVendorServicesURL);

        console.log(response)
        return response;
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        return null;
      }
    };
    const getVendorProfileDataAi = async () => {
      try {
        const response = await aiDataFetcher.getAiData(getVendorProfileURL);
        // const response = await getAiData(getVendorServicesURL);

        console.log(response.data)
        return response;
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        return null;
      }
    };
    return {getVendorServiceDataAi,getVendorProfileDataAi} ; // Return a function to fetch data
  }

// export function getServiceData(){
//     return getData(grtServicesURL)
// }
// export function GetVendorServiceDataAi(){
//     const aiDataFetcher = useGetAiData();
//     return aiDataFetcher.getAiData(getVendorServicesURL)
// }

// export function saveServiceData(data){
//     return saveData(addServicesURL,data)
// }


// export function updateServiceData(data){
//     return updateData(updateServicesURL,data)
// }

// export function deleteServiceData(id){
//     return  deleteItem(deleteServicesURL+id)
// }

// export function updateApproveService(data){
//     return updateData(updateApproveServicesURL,data)
// }
// export function updateVendorServiceData(data){
//     return updateData(updateVendorServiceDataURL,data)
// }

// export function getVendorProfileData(headers){
//     return getData(getVendorProfileURL,headers)
// }