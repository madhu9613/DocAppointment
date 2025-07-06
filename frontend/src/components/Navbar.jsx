import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
const Navbar = () => {
     const navigate = useNavigate();

     const [showMenu, setShowMenu] = useState(false);
     const {token,setToken,userData,img}=useContext(AppContext)
    
     const logout=()=>{
          setToken(false)
          localStorage.removeItem('token')
     }
     return (

          <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
               <img onClick={() => navigate("/")} className='w-63 cursor-pointer font-bold' src={assets.logo1} alt="Logo" />
               <ul className='hidden md:flex items-start gap-5 font-medium'>
                    <NavLink to='/'>
                         <li className='py-1'>Home</li>
                         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto   hidden' />
                    </NavLink>
                    <NavLink to='/doctors'>
                         <li className='py-1'>All Doctors</li>
                         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/about'>
                         <li className='py-1'>About</li>
                         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/contact'>
                         <li className='py-1'>Contect</li>
                         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                    </NavLink>
               </ul>


               <div className='flex items-center gap-4' >
                    {
                         token
                              ?
                              <div className='flex items-center gap-2 cursor-pointer group relative'>
                                   <img className='w-8 rounded-full ' src={img} alt="" />
                                   <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                                   <div className='absolute top-0 right-0 pt-16 text-base font-medium text-gray-500 z-20  hidden group-hover:block'>
                                        <div className='min-w-48 bg-stone-100 flex flex-col gap-4 p-4 '>
                                             <p onClick={() => navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                             <p onClick={() => navigate('/myappointment')} className='hover:text-black cursor-pointer'>My Appointment</p>
                                             <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                        </div>
                                   </div>
                              </div>


                              : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                                   Create Account
                              </button>
                    }
                    <img onClick={() => setShowMenu(true)}
                         className='w-6 md:hidden' src={assets.menu_icon} alt="menu" />
                    {/* --mobile menu  */}
                    <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all  `}>
                         <div className='flex items-center justify-between px-2'>
                              <img className='w-36' src={assets.logo} alt="" />
                              <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                         </div>
                         <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                              <NavLink to='/' onClick={() => setShowMenu(false)}>
                                   <li className='py-1'>Home</li>
                              </NavLink>
                              <NavLink to='/doctors' onClick={() => setShowMenu(false)}>
                                   <li className='py-1'>All Doctors</li>
                              </NavLink>
                              <NavLink to='/about' onClick={() => setShowMenu(false)} >
                                   <li className='py-1'>About</li>
                              </NavLink>
                              <NavLink to='/contact' onClick={() => setShowMenu(false)} >
                                   <li className='py-1'>Contect</li>
                              </NavLink>
                         </ul>
                    </div>
               </div>


          </div>
     )
}

export default Navbar