// Final Enhanced Appointment.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext.jsx";
import { assets } from '../assets/assets_frontend/assets';
import Relateddoctors from '../components/Relateddoctors.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docID } = useParams();
  const { doctors, currencySymbol, backendURL, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docslots, setDocslots] = useState([]);
  const [slotindex, setSlotindex] = useState(0);
  const [slottime, setSlottime] = useState('');
  const navigate = useNavigate();

  const daysofeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getAvailableSlots = async () => {
    setDocslots([]);
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        let now = new Date();
        if (now.getHours() >= 21) continue;
        currentDate.setHours(now.getHours() >= 10 ? now.getHours() + 1 : 10);
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isBooked = docInfo?.slots_booked?.[slotDate]?.includes(slotTime);
        const isAvailable = docInfo?.availlable && !isBooked;

        if (isAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocslots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment');
      return navigate('/login');
    }

    try {
      const date = docslots[slotindex][0].datetime;
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(`${backendURL}/api/user/book-appointment`, {
        docId: docID,
        slotTime: slottime,
        slotDate
      }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        const updatedDoc = doctors.find(doc => doc._id === docID);
        setDocInfo(updatedDoc);
        getAvailableSlots();
        return navigate('/myappointment');
      }

      if (data.alreadyBooked) {
        const confirmProceed = window.confirm("You already have an appointment at this time. Do you want to proceed anyway?");
        if (confirmProceed) {
          const retry = await axios.post(`${backendURL}/api/user/book-appointment`, {
            docId: docID,
            slotTime: slottime,
            slotDate,
            override: true
          }, {
            headers: { token }
          });

          if (retry.data.success) {
            toast.success(retry.data.message);
            await getDoctorsData();
            const updatedDoc = doctors.find(doc => doc._id === docID);
            setDocInfo(updatedDoc);
            getAvailableSlots();
            return navigate('/myappointment');
          } else {
            toast.error(retry.data.message || "Failed to book.");
          }
        } else {
          toast.info("Booking cancelled.");
        }
      } else {
        toast.error(data.message || "Booking failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      const doc = doctors.find(doc => doc._id === docID);
      setDocInfo(doc);
    }
  }, [doctors, docID]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

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
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-md text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-700'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {docInfo.availlable ? (
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slot</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {docslots.length && docslots.map((item, index) => (
              <div key={index} onClick={() => setSlotindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? 'bg-green-500 text-white' : 'border border-stone-300'}`}>
                <p>{item[0] && daysofeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 w-full overflow-x-scroll mt-4'>
            {docslots.length && docslots[slotindex].map((item, index) => (
              <p onClick={() => setSlottime(item.time)} className={`text-sm font-light flex-shrink-0 px-3 rounded-full cursor-pointer ${item.time === slottime ? 'bg-green-400 text-white font-semibold' : 'text-gray-600 border border-stone-200'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className='bg-green-500 text-white text-sm font-semibold px-14 py-3 rounded-full my-6 cursor-pointer'>Book an appointment</button>
        </div>
      ) : (
        <>
          <p className='text-red-500 text-4xl font-bold text-center mt-10'>Doctor Is Not Available</p>
          <hr className='text-red-400 w-[50vw] mx-auto mt-5' />
        </>
      )}

      <div className='w-2/3 mx-auto'>
        <Relateddoctors speciality={docInfo.speciality} docID={docID} />
      </div>
    </div>
  );
};

export default Appointment;