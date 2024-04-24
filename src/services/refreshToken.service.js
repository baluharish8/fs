

import axios from "axios";
import { useEffect, useState } from "react";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "./storages/local.storage";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth,setAuth } = useAuth();

    // let[token,setToken]=useState(auth?.accessToken)
    // let token =auth?.accessToken
  let navigate= useNavigate()
  let token = getLocalStorageItem("token")// it should be in the top
let expiredToken;
    const axiosPrivate = axios.create({
        baseURL: 'http://localhost:4006',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });

    const refresh =  async() => {

        try {
            const response = await axios.get('http://localhost:4006/refresh', { withCredentials: true });
            console.log('from refresh : ' + response.data.accessToken);
            return response.data.accessToken;
          } catch (error) {
            if (error?.response?.status === 403) {
              expiredToken = error.response;
              console.error(error.response.data + ' from BE');
              removeLocalStorageItem("userData");
              removeLocalStorageItem("vendorData");
              removeLocalStorageItem("token");
              navigate('/login');
            } else {
              console.error('An error occurred:', error.message);
            }
          }
          
          }
   
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log(token)
                // if conditon not working 
                // if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${token}`;
                // }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log('new access token : '+newAccessToken)
                    prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;//it is mandatory
                    token=newAccessToken
                    // setAuth({ ...auth, accessToken:newAccessToken });

                    return axiosPrivate(prevRequest);
                
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [ refresh])

    return axiosPrivate;

};

export default useAxiosPrivate;
