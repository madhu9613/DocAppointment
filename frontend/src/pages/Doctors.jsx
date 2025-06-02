import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  console.log(speciality);
  
  const { doctors } = useContext(AppContext);
  const [Filterdoc, SetFilterdoc] = useState([]);
  const navigate = useNavigate();
  const [showFilter,setShowFilter]=useState(false);
  const applyfilter = () => {
    if (speciality) {
      SetFilterdoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      SetFilterdoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [doctors, speciality]);

  return (
    <div> 
      <p className='text-gray-600'>Browse Through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
       <button onClick={()=>setShowFilter(prev=>!prev)}
        className={`py-1 px-3 border rounded text-sm transition-all sm:hiddenoutline-none sm:hidden ${showFilter ? ' bg-primary text-white' :''}`}
        >Filters</button>
      <div className={`${showFilter ?'flex':'hidden sm:flex'} flex-col gap-3 sm:gap-4 text-sm text-gray-700 font-medium`}>
  {[
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ].map((item) => (
    <p
      key={item}
      onClick={() =>
        speciality === item ? navigate("/doctors") : navigate(`/doctors/${item}`)
      }
      className={`w-full sm:w-[180px] flex justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer transition-all 
        ${
          speciality !== item
            ? "bg-gray-100 text-gray-800 hover:bg-green-200 hover:text-gray-900"
            : "bg-green-500 text-white shadow-md hover:bg-green-600"
        }`}
    >
      {item}
    </p>
  ))}
</div>

        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4  gap-y-2 px-3 sm:px-0 '>
          {
           Filterdoc.map((item, index) => (
            <div onClick={()=>(navigate(`/appointment/${item._id}`))} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300' >
        
              <img src={item.image} alt="" className='bg-blue-50' />
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-500 text-sm'>{item.speciality}</p>
            </div>
          ))
          }
        </div>
      </div>

    </div>
  )
}

export default Doctors