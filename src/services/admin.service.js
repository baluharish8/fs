import { getData, saveData } from "./context.service";
import useAxiosPrivate from "./refreshToken.service";
let adminRegistrationUrl="http://localhost:4006/registration1/";
let adminLoginUrl="http://localhost:4006/login";
let getAdminProfileUrl="http://localhost:4006/getadminprofile";
let otpVerifyUrl="http://localhost:4006/otpverify";
let sendOtpUrl="http://localhost:4006/otpsend";
let sendMobileOtpUrl="http://localhost:4006/mobileotpsend";
let adminVerifyUrl="http://localhost:4006/sendverification";
let forgetpasswordlinkUrl="http://localhost:4006/forgetpasswordlink";
let getActiveUsersUrl="http://localhost:4006/activeuserscount";



export function useAdminService() {
    const axiosPrivate = useAxiosPrivate();
  
    // const getAdminProfile = async () => {
    //   try {
    //     const response = await axiosPrivate.get(getAdminProfileUrl);
    //     console.log(response.data)

    //     return response;
    //   } catch (error) {
    //     // Handle errors if needed
    //     console.error('Error fetching data:', error);
    //     return null;
    //   }
    // };
    const loginAdminAi = async (data) => {
        try {
          const response = await axiosPrivate.post(adminLoginUrl,data);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
      };
      const registrationAdminAi = async (data) => {
        try {
          const response = await axiosPrivate.post(adminRegistrationUrl,data);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
      };

      const otpVerifyAi = async (data) => {
        try {
          const response = await axiosPrivate.post(otpVerifyUrl,data);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
        
      };
      const sendOtpAi = async (data) => {
        try {
          const response = await axiosPrivate.post(sendOtpUrl,data);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
        
      };
      const sendMobileOtpAi = async (data) => {
        try {
          const response = await axiosPrivate.post(sendMobileOtpUrl,data);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
        
      };
      const sendAdminVerifyAi = async (data) => {
        try {
          const response = await axiosPrivate.post(adminVerifyUrl);
          console.log(response.data)
  
          return response;
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          throw error;
        }
        
      };
          const getActiveUsers = async () => {
      try {
        const response = await axiosPrivate.get(getActiveUsersUrl);
        console.log(response.data)

        return response;
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        throw error;

      }
    };
    return  {getActiveUsers,getAdminProfile,loginAdminAi,registrationAdminAi,otpVerifyAi,sendAdminVerifyAi,sendOtpAi,sendMobileOtpAi }; // Return a function to fetch data
  }

  export function getAdminProfile(headers){
    return getData(getAdminProfileUrl,headers)
}
export function getActiveUsersHeaders(headers){
  return getData(getAdminProfileUrl,headers)
}
export function SaveAdminRegistration(data){
  return saveData(adminRegistrationUrl,data)
}
export function sendForgetPasswordLink(data){
  return saveData(forgetpasswordlinkUrl,data)
}