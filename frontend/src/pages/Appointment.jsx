import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from "../context/AppContext.jsx";
import { assets } from '../assets/assets_frontend/assets';
import Relateddoctors from '../components/Relateddoctors.jsx';

const Appointment = () => {
  const { docID } = useParams();
const daysofeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const { doctors, currencySymbol } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);
    const [docslots, setdocslots] = useState([]);
    const [slotindex, setslotindex] = useState(0);
    const [slottime, setslottime] = useState('');

    const getAvailableSlots = async () => {
      setdocslots([]); // Reset slots first
      let today = new Date();
      let allSlots = [];
    
      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
    
        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0); // End time is 9:00 PM
    
        // Setting the initial available time for the day
        if (i === 0) { // If today, start from the next available slot
          let now = new Date();
          currentDate.setHours(now.getHours() >= 10 ? now.getHours() + 1 : 10);
          currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
        } else { // Otherwise, start from 10:00 AM
          currentDate.setHours(10, 0, 0, 0);
        }
    
        let timeSlots = [];
    
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
    
          currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
        }
    
        allSlots.push(timeSlots);
      }
    
      setdocslots(allSlots); // Update state once after all calculations
    };
    
     
    useEffect(()=>{
      console.log(docslots);
      
    },[docslots])
  
    useEffect(()=>{
getAvailableSlots()
    },[docInfo])
    useEffect(() => {
    if (doctors.length > 0) {
      const doc = doctors.find(doc => doc._id === docID);
      setDocInfo(doc);
      console.log("Fetched doctor info:", doc);
    }
  }, [doctors, docID]);

  return docInfo && (
    <div>
     <div className='flex flex-col sm:flex-row gap-4'>
      <div>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="doc" />
      </div>
      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}
        <img className='w-5' src={assets.verified_icon} alt="" />
        </p>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <p>{docInfo.degree}-{docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
        </div>
        {/**doctor about */}
      <div>
        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
        About <img src={assets.info_icon} alt="" />
        </p>
        <p className='text-md text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
      </div>
      <p className='text-gray-600 font-medium mt-4'>
        Appointment fee: <span className='text-gray-700'>{currencySymbol}{docInfo.fees}</span>
      </p>
      </div>

     </div>
     {/* booking slots  */}
     <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
        <p>Booking Slot</p>
         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docslots.length && docslots.map((item,index)=>(
              <div key={index} onClick={()=>setslotindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex===index ? 'bg-green-500 text-white':'border border-stone-300 '}` }>
                <p>{item[0] && daysofeek[item[0].datetime.getDay()]}</p> 
                <p>{item[0] && item[0].datetime.getDate()}</p>

              </div>
            ))
          }
         </div>
         <div className='flex items-center gap-2 w-full overflow-x-scroll mt-4'>
          {
            docslots.length && docslots[slotindex].map((item,index)=>(
              <p onClick={()=>setslottime(item.time)} className={`text-sm font-light flex-shrink-0 px-3 rounded-full cursor-pointer ${item.time===slottime ? 'bg-green-400 text-white font-semibold':'text-gray-600 border border-stone-200'} `} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
         </div>
         <button className='bg-green-500 text-white text-sm font-semibold  px-14 py-3 rounded-full my-6 cursor-pointer'>Book an appointment</button>
        </div>
        <div className='w-2/3 mx-auto'>
        <Relateddoctors speciality={docInfo.speciality} docID={docID}  />
         </div>
    </div>
    
  );
};

export default Appointment;
