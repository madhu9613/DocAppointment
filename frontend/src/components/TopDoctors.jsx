import  { useContext } from 'react'
import { AppContext } from '../context/AppContext';
// import { doctors } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const TopDoctors = () => {
    const navigate=useNavigate();
    const {doctors}=useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors To Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
  {doctors
  .filter(item => item.availlable)   // ✅ Only include available doctors
  .slice(0, 10)                      // ✅ Take only first 10
  .map((item, index) => (
    <div 
      onClick={() => navigate(`/appointment/${item._id}`)} 
      key={index} 
      className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300'
    >
      <img src={item.image} alt="" className='bg-blue-50' />
      
      <div className='flex items-center gap-2 text-sm text-green-500'>
        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
        <p>Available</p>
      </div>
      
      <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
      <p className='text-gray-500 text-sm'>{item.speciality}</p>
    </div>
))}

</div>

     <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}}
     className='bg-blue-50 text-blue-900 font-sm px-10 py-4 rounded-full'
     >more</button>
    </div>

  )
}

export default TopDoctors