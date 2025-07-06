import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* left part  */} 
      <div>
        <img className='mb-5 w-70' src={assets.logo1} alt="" />
        <p className='w-full md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo in quos nam impedit delectus unde magnam voluptatibus. Pariatur assumenda, consequatur culpa aperiam saepe quis rem atque expedita quia voluptatem maiores?</p>


    </div>
            {/* center part  */}
    <div>

             <p className='text-xl font-medium mb-5'>Company</p>
             <ul className="flex flex-col items-center gap-2 text-gray-700">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/privacy-policy" 
            className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}
          >
            Privacy Policy
          </NavLink>
        </li>
      </ul>

    </div>
      {/* right part  */}
      <div>
        <p className='text-xl font-medium mb-5'>Get In Touch</p>
        <ul className='flex flex-col gap-2 text-gray-700 '>
            <li>+91 123 456 3452</li>
            <li>rajkhowamadhujya0@gmail.com</li>
        </ul>
        
      </div>
  
      </div>
      <div>
        <hr />
         <p className='py-5 text-sm text-center'>@copy madhu9613 pvt ltd</p>
      </div>
    </div>
  )
}

export default Footer