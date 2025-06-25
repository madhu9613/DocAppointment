import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  const navItems = [
    { to: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { to: '/all-appointments', icon: assets.appointment_icon, label: 'Appointment' },
    { to: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { to: '/doctor-list', icon: assets.people_icon, label: 'Doctors List' },
  ]

  return (
    <div className="min-h-screen min-w-50  bg-white border-r border-gray-300 px-2 py-5">
      {aToken && (
        <ul className="text-[#515151] space-y-1">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 font-bold rounded-lg transition duration-150 ease-in-out
                ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
              }
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              <p className="font-medium">{item.label}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Sidebar
