import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import axios from "axios"
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setaToken, backendURL } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)
    const navigate = useNavigate();


    const onSubmitHandler = async (event) => {
        event.preventDefault()



        const loginUrl = `${backendURL}/api/${state.toLowerCase()}/login`


        try {
            const { data } = await axios.post(loginUrl, { email, password })

            if (data.success) {
                toast.success(data.message);
                if (state === "Admin") {
                    localStorage.setItem('aToken', data.token);
                    setaToken(data.token);
                    navigate('/admin/dashboard');
                } else {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    navigate('/doctor/dashboard');
                }
            }
            else{
                toast.error(data.message || "Invalid")
            }


        } catch (error) {
            console.log("error occured in login", error);
           toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg  '>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'> {state} </span>Login
                </p>

                <div className='w-full'>
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="email"
                        required
                    />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="password"
                        required
                    />
                </div>

                <button className='bg-primary text-white w-full py-2 rounded text-base'>
                    Login
                </button>

                {
                    state === "Admin" ?
                        <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click Here</span></p> :
                        <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click Here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
