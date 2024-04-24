
import { configureStore } from "@reduxjs/toolkit";

const  reducer =(state, action)=>{
    switch(action.type){
case "userData":
    return{
        ...state,userData: action.data
    }
case "vendorData":
    return{
        ...state,vendorData: action.data
    }
default:
     console.log("Redux Default Case");
     return state;
    }
}

const store=configureStore({reducer:reducer})

export default store;