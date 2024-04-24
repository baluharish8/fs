import axios from "axios";
import useAxiosPrivate from "./refreshToken.service";

// export function getAiData(url){
//     // return axios.get(url)
//     return axiosPrivate.get(url)

// }

// export function saveAiData(url,data){
//     return axiosPrivate.post(url,data)
// }

// export function updateAiData(url,data){
//     return axiosPrivate.put(url,data)
// }

// export function deleteAiItem(url){
//     return axiosPrivate.delete(url)
// }
export function useGetAiData() {
    const axiosPrivate = useAxiosPrivate();
  
    const getAiData = async (url) => {
      try {
        const response = await axiosPrivate.get(url);
        console.log(response.data)

        return response;
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        return null;
      }
    };
  
    return  {getAiData }; // Return a function to fetch data
  }