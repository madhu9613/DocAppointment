// import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* left side */}
        <div className='md:w-1/2 flex flex-col items-center md:items-start justify-center gap-6 md:gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] ' >
              <p className='text-3xl md:text-3xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight '>
                Book Appointment 
                With Trusted Doctors
              </p>
              <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-semibold'>
                <img src={assets.group_profiles} alt="group" />
                <p className='text-white'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus distinctio aliquid adipisci.
                </p>
                </div>

                <a href="#speciality" className='flex items-center gap-3 bg-white py-4 px-7 rounded-full text-gray-700 transition-all duration-300 hover:scale-105'>
                    Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>

              
        </div>
        {/* right side  */}
        <div className='md:w-1/2 relative'>
           <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header