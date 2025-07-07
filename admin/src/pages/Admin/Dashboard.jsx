import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'; 
import { AdminContext } from '../../context/AdminContext';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets_admin/assets';

const Dashboard = () => {
  const { aToken, backendURL } = useContext(AdminContext);
  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/admin/dashboard`, {
          headers: { aToken },
        });
        if (data.success) {
          const sortedAppointments = data.dashData.latestAppointments.sort((a, b) => {
            const dateA = new Date(`${a.slotDate.split('_').reverse().join('-')} ${a.slotTime}`);
            const dateB = new Date(`${b.slotDate.split('_').reverse().join('-')} ${b.slotTime}`);
            return dateB - dateA;
          });
          setDashData({ ...data.dashData, latestAppointments: sortedAppointments });
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    if (aToken) fetchData();
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto scroll-smooth">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
      </div>

      {dashData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center shadow hover:shadow-md transition border-l-4 border-blue-500">
           
           <div className='flex items-center '>

               <img src={assets.doctor_icon} alt="" />
                 <p className="text-gray-500 text-xl font-bold">Total Doctors</p>
           </div>
           
           
             <h3 className="text-3xl font-bold text-blue-700">{dashData.doctors}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center shadow hover:shadow-md transition border-l-4 border-amber-500">
           
           <div className='flex items-center '>

               <img src={assets.appointments_icon} alt="" />
                 <p className="text-gray-500 text-xl font-bold">Total Appointments</p>
           </div>
           
           
             <h3 className="text-3xl font-bold text-amber-700">{dashData.appointment}</h3>
          </div>
         <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center shadow hover:shadow-md transition border-l-4 border-purple-500">
           
           <div className='flex items-center '>

               <img src={assets.doctor_icon} alt="" />
                 <p className="text-gray-500 text-xl font-bold">Total paitents</p>
           </div>
           
           
             <h3 className="text-3xl font-bold text-purple-700">{dashData.patients}</h3>
          </div>
        </div>
      ) : (
        <p>Loading dashboard...</p>
      )}

      {dashData?.latestAppointments?.length > 0 && (
        <div className='border border-stone-200 rounded-lg bg-indigo-50 px-3 md:px-5 py-3 md:py-7'>
          <div className='flex gap-2 items-center justify-center mb-2 '>
            <img src={assets.appointments_icon} className='w-16 bg-white' alt="" />
            <h3 className="text-3xl  font-semibold mb-4 text-gray-500 ">Recent Appointments</h3>
          </div>
            
            <hr className='w-[50vw] mx-auto' />
          <div className="space-y-4">
            {dashData.latestAppointments.map((appt) => (
              <div
                key={appt._id}
                className={`flex items-center gap-0 justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition ${appt.cancelled ? 'opacity-70' : ''
                  }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={appt.userId?.image || '/default.webp'}
                    alt="patient"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <Link to={`/admin/user/${appt.userId?._id}`} className="font-semibold text-blue-700 hover:underline">
                      {appt.userId?.username || 'Unknown User'}
                    </Link>
                    <p className="text-xs text-gray-500">{appt.userId?.email || '-'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={appt.docId?.image || '/default.webp'}
                    alt="doctor"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <Link to={`/admin/doctor/${appt.docId?._id}`} className="font-semibold text-green-700 hover:underline">
                      {appt.docId?.name || 'Unknown'}
                    </Link>
                    <p className="text-xs text-gray-500">{appt.docId?.specialization || '-'}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {appt.slotDate?.split('_').join('/')} | {appt.slotTime}
                  </p>
                  <span
                    className={`text-xs font-semibold rounded px-2 py-1 inline-block mt-1 ${appt.cancelled
                        ? 'bg-red-100 text-red-700'
                        : appt.isCompleted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {appt.cancelled ? 'Cancelled' : appt.isCompleted ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
