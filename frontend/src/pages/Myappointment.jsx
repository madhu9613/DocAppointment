import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom"
const Myappointment = () => {
  const { backendURL, token } = useContext(AppContext);
  const [appointments, setAppointment] = useState([]);
  const [filter, setFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate()


  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('_');
    const date = new Date(`${year}-${month}-${day}`);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/appointments`, {
        headers: { token }
      });

      if (data.success) {
        setAppointment(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancellAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendURL}/api/user/cancel-apointment`, {
        appointmentId
      }, {
        headers: { token }
      });

      if (data.success) {
        toast.warn(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  const deleteCancelledAppointment = async (appointmentId) => {
    const confirm = window.confirm("Are you sure you want to permanently delete this cancelled appointment?");
    if (!confirm) return;

    setDeletingId(appointmentId);

    try {
      const { data } = await axios.post(`${backendURL}/api/user/delete-cancel-appointment`, {
        appointmentId
      }, {
        headers: { token }
      });

      if (data.success) {

        setTimeout(() => {
          setAppointment(prev => prev.filter(item => item._id !== appointmentId));
          setDeletingId(null);
          toast.info(data.message);
        }, 400);
      } else {
        toast.error(data.message || "Could not delete.");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
      setDeletingId(null);
    }
  };


  const filteredAppointments = appointments.filter(item => {
    if (filter === "cancelled") return item.cancelled;
    if (filter === "tobedone") {
      const now = new Date();
      const [day, month, year] = item.slotDate.split('_');
      const appointmentDate = new Date(`${year}-${month}-${day} ${item.slotTime}`);
      return !item.cancelled && appointmentDate >= now;
    }
    if (filter === "success") return item.isPaid === true;
    return true;
  });

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 font-bold text-2xl bg-gray-50 text-center text-zinc-700 border-b'>
        My Appointments
      </p>

      {/* Filter Buttons */}
      <div className='flex flex-wrap gap-2 justify-center my-4'>
        {["all", "tobedone", "cancelled", "success"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-300 ${filter === f
                ? "bg-primary text-white"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {f === "all" ? "All" : f === "tobedone" ? "To Be Done" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
         {
         
         appointments.length!=0
         ?
          <div>
        <AnimatePresence mode='wait' >
          {[...filteredAppointments]
            .sort((a, b) => a.cancelled - b.cancelled)
            .map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-stone-300 ${item.cancelled ? "bg-red-50" : "bg-white"
                  }`}
              >
                <div
                  onClick={() => navigate(`/appointment/${item.docId._id}`)}
                  className="cursor-pointer"
                >
                  <img className='w-32 bg-indigo-50' src={item.docId?.image} alt="" />
                  <p className='text-neutral-800 font-semibold'>{item.docId?.name}</p>
                </div>

                <div className='flex-1 text-sm text-zinc-500'>

                  <p>{item.docId?.speciality}</p>
                  <p className='text-zinc-800 font-medium mt-1'>Address:</p>
                  <p className='text-xs'>{item.docId?.address?.line1}</p>
                  <p className='text-xs'>{item.docId?.address?.line2}</p>
                  <p className='text-xs mt-1'>
                    <span className='text-sm text-neutral-800 font-medium'>Date & Time:</span>
                    {formatDate(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div className='sm:hidden'></div>
                <div className='flex flex-col justify-end-safe gap-2'>
                  {item.cancelled ? (
                    <div className='flex items-center justify-center align-middle m-auto'>
                      <p className='text-red-500 text-md font-bold border-red-400 py-2 px-5 rounded-lg border'>Appointment Cancelled</p>
                      <Trash2
                        size={18}
                        className='text-red-400 hover:text-red-500 cursor-pointer ml-2 rounded-lg h-6 w-6 bg-red-100'
                        onClick={() => deleteCancelledAppointment(item._id)}
                        title="Delete"
                      />
                    </div>
                  ) : (
                    <>
                      <button className='w-[200px] text-sm text-stone-500 text-center sm:min-w-10/12 py-2 px-6 border rounded hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer'>
                        Pay Online
                      </button>
                      <button
                        onClick={() => cancellAppointment(item._id)}
                        className='w-[200px] text-sm text-stone-500 text-center sm:min-w-10/12 py-2 px-6 border rounded hover:bg-red-600 hover:text-white transition-all duration-500 cursor-pointer'>
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
         :
         <>  <p
         className='text-3xl font-bold text-blue-900 text-center mt-10 py-5 '
         >No Appointment Till Now</p>
         <hr className='text-black w-[40vw] mx-auto'/>
         </>
       
         
         }
   
      
    </div>
  );
};

export default Myappointment;
