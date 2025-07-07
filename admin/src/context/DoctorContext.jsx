import { createContext, useState } from "react";

export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{
    
    const backendURL = import.meta.env.VITE_BACKEND_URL   
    const [dToken,setDToken]=useState(()=>localStorage.getItem('dToken')|| ' ')
    
    const value={
       backendURL,
       dToken,setDToken
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider; 