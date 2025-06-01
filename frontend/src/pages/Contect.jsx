import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contect = () => {
  return (
    <div>
      <p className='text-2xl font-semibold text-gray-500 text-center mt-10'>Contect <span className='text-gray-700'>US</span></p>
      <div className='my-10 flex flex-col justify-center md:flex-row mb-20 text-sm gap-10'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="img" />
        <div className='flex flex-col justify-items-start gap-6 text-gray-600 mt-10'>
          <p className='text-gray-700 text-2xl'> OUR OFFICE
          </p>
          <p>00000 Willms Station
            <br />
            Suite 000, Washington, USA</p>
          <p>
            Tel: (000) 000-9613
            <br />
            Email: rajkhowamadhujya@gmail.com</p>
          <p className='text-gray-700 text-xl font-semibold'>CAREERS AT PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <button
          className='border border-stone-300 px-8 py-6 text-sm w-2/3 hover:bg-primary hover:text-white cursor-pointer rounded-lg 
          transation-all duration-500'
          >Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contect