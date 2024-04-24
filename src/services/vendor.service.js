import { getData, saveData } from "./context.service";
import useAxiosPrivate from "./refreshToken.service";
let getVendorDataUrl="http://localhost:4006/getvendordata";
let getServiceDataUrl="http://localhost:4006/getservicedata";
let vendorLoginUrl="http://localhost:4006/vendorlogin";


export function useVendorService() {
    const axiosPrivate = useAxiosPrivate();
  
    const loginVendorAi = async (data) => {
      try {
        const response = await axiosPrivate.post(vendorLoginUrl,data);
        console.log(response.data)

        return response;
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        throw error;
      }
    };

      const getvendordata = async (data) => {
        try {
          const response = await axiosPrivate.get(getVendorDataUrl);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
        
      };
      const getServiceData = async (data) => {
        try {
          const response = await axiosPrivate.get(getServiceDataUrl);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
        
      };
    return  {
      getvendordata,
      getServiceData,
      loginVendorAi
    }; // Return a function to fetch data
  }

