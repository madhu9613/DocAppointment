import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const Navbar = () => {

    const { aToken,setaToken } = useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)
    const navigate=useNavigate()

    const logout =()=>{
       navigate('/')
        aToken && setaToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white'>
            <div className='flex items-center gap-1 text-xs'>
                <img src={assets.logo1} className='w-40 sm:w-55 cursor-pointer rounded-full flex items-center justify-center' alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button
            className='bg-primary text-white text-sm px-10 py-2 rounded-full'
            onClick={logout}
            >Logout</button>
        </div>
    )
}

export default Navbar