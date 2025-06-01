import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Speacialitymenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-6 text-gray-600' >
            <h1 className='text-3xl font-semibold'>Find By Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm'
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, veritatis harum a maiores eveniet, laboriosam consequuntur nulla ut libero velit debitis odit minus!</p>

              <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item, index) => (
                <Link onClick={()=>scrollTo(0,0)} key={index} to={`/doctors/${item.speciality}`} className='flex flex-col items-center text-xs cursor-pointer flex-shrink hover:translate-y-[-10px] transition-all duration-500 '  >
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                    <p>{item.speciality}</p>
                </Link>
            ))}
            </div>
 
        </div>
    )
}

export default Speacialitymenu