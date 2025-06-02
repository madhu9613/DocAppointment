import React, { useContext } from 'react'
import {AppContext} from "../context/AppContext.jsx"
const Myappointment = () => {
  const {doctors}=useContext(AppContext);
  return (
    <div>
      <p className='pb-3 mt-12 font-bold text-2xl bg-gray-50 text-center text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          doctors.slice(0,3).map((item,index)=>(
            <div 
            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-stone-300'
            key={index}>
                <div>
                  <img className='w-32 bg-indigo-50' src={item.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-500'>
                  <p className='text-neutral-800 font-semibold'>{item.name}</p>
                  <p>{item.speciality}</p>
                  <p className='text-zinc-800 font-medium mt-1'>Address:</p>
                  <p className='text-xs'>{item.address.line1}</p>
                  <p className='text-xs'>{item.address.line2}</p>
                  <p className='text-xs mt-1'><span className='text-sm text-neutral-800 font-medium'>Date & Time:</span>25,july,2024 |8.30 </p>
                </div>
                <div className='sm:hidden'></div>
                <div className='flex flex-col justify-end-safe gap-2'>
                  
                  <button className='w-[200px]  text-sm text-stone-500 text-center sm:min-w-10/12 py-2 px-6 border rounded hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer   '>Pay Online</button>
                  <button className='w-[200px]  text-sm text-stone-500 text-center sm:min-w-10/12 py-2 px-6 border rounded hover:bg-red-600 hover:text-white transition-all duration-500 cursor-pointer'>Cancel Appointment</button>
                </div>


            </div>
          ) )
        }

      </div>

    </div>
  )
}

export default Myappointment