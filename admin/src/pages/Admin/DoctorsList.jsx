import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors,changeAvilibility } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto scroll-smooth">
      <p className="text-2xl font-semibold mb-4 text-primary">All Doctors</p>

       <div className='w-full flex flex-wrap gap-4  gap-y-2 px-3 sm:px-0 '>
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border group border-blue-200 rounded-xl max-w-56 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 p-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full  bg-blue-50 rounded"
            />

            <div className="flex items-center gap-2 text-sm mt-2">
              <div className={`w-2 h-2 rounded-full ${item.availlable ? 'bg-green-500' : 'bg-red-400'}`}></div>
              <p className={item.availlable ? 'text-green-500' : 'text-red-500'}>
                {item.availlable ? 'Available' : 'Unavailable'}
              </p>
                <input
                type="checkbox"
                checked={item.availlable}
                onChange={()=>changeAvilibility(item._id)}
                className="accent-primary ml-auto"
              />
            </div>

            <p className="text-gray-900 text-base font-bold  mt-1">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
