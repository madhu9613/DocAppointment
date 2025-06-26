import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import {toast} from "react-toastify"
import { assets } from "../assets/assets_frontend/assets";


export const AppContext=createContext()




const AppContextProvider=(props)=>{
    const currencySymbol='$'
    const backendURL=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [token, setToken] = useState(() => localStorage.getItem('token') || '')
    const [userData,setUserData]=useState(false)

     const img = userData?.image || assets.profile_pic;


    const getDoctorsData=async()=>{
        try {
            
            const {data}=await axios.get(backendURL+'/api/doctor/list')
            if(data.success)
            {
                
               setDoctors(data.doctors)
            }else{
                console.log(data.message);
                toast.error(data.message)
            }
           
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
//when the web page will load it will call the getalldoctors function


//load profile data

const loadUserProfileData=async()=>{
    try {
        const {data}=await axios.get(backendURL +'/api/user/get-profile',{
            headers:{token}
        })

        if(data.success)
        {
            setUserData(data.userData)
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
}
 
    useEffect(()=>{
 getDoctorsData()
    },[])

    useEffect(()=>{
        if(token)
        {
       loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    },[token])


    const value={
        doctors,
        currencySymbol,
        token,setToken,
        backendURL,
        userData,setUserData,
        loadUserProfileData,img,
        getDoctorsData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider; 