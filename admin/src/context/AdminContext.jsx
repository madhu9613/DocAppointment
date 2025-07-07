import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify"
export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setaToken] = useState(() => localStorage.getItem('aToken') || '');

    const [doctors, setDoctors] = useState([])
    const [appoinments,setAppointments]=useState([])
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {



            const { data } = await axios.post(backendURL + '/api/admin/all-doctors', {},
                {
                    headers: { aToken }
                }
            )




            if (data.success) {


                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {

            toast.error(error.message)

        }
    }

    const changeAvilibility = async (docID) => {
        try {
            const { data } = await axios.post(backendURL + '/api/admin/change-availability', { docID }, {
                headers: { aToken }
            })

            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }
            else {

                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllAppointments = async () => {
        try {

           const { data } = await axios.post(backendURL + '/api/admin/all-appoinments', {},
                {
                    headers: { aToken }
                }
            )

            if (data.success) {


                setAppointments(data.appoinments)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {

            toast.error(error.message)

        }
    }

    const value = {
        aToken, setaToken,
        backendURL,
        doctors,
        getAllDoctors,
        changeAvilibility,
        getAllAppointments,
        appoinments
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider; 