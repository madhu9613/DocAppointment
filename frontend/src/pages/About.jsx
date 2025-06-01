import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div>
        <p className='text-3xl text-gray-500 text-center'>About < span className='text-gray-700'>Us</span></p>
        <div className='my-10 flex flex-col md:flex-row gap-12'>
          {/* left  */}
          <div>
            <img className='w-full md:min-w-[360px]' src={assets.about_image} alt="" />

          </div>
          {/* right */}
          <div className='flex flex-col text-sm text-gray-500 gap-8 mt-4'>
            <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
  
            <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>
           
            <b className=' text-gray-700 font-semibold'>Our Vision</b>
            <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>

        </div>
      </div>
      <div className='text-xl my-4'>
        <p className='text-gray-500 text-2xl'>Why <span className='text-gray-700 font-semibold'>Choose Us</span></p>
        <div className='flex flex-col md:flex-row mb-20 gap-0'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-gray-500 text-sm hover:bg-primary hover:text-white text-[16px]  transition-all duration-200 hover:scale-[1.02] cursor-pointer'> 
          <b className='text-xl'>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-gray-500 text-sm hover:bg-primary hover:text-white text-[16px] transition-all duration-200 hover:scale-[1.02] cursor-pointer'> 
             <b className='text-2xl'>CONVENIENCE:</b>
             <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-gray-500 text-sm hover:bg-primary hover:text-white text-[16px] transition-all duration-200 hover:scale-[1.02] cursor-pointer '>
          <b className='text-xl'>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default About