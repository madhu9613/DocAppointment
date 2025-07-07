import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import { AllAppointment } from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import { DoctorDashboard } from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken, setaToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  useEffect(() => {
    const storedAdminToken = localStorage.getItem('aToken');
    const storedDoctorToken = localStorage.getItem('dToken');
    if (storedAdminToken) setaToken(storedAdminToken);
    if (storedDoctorToken) setDToken(storedDoctorToken);
  }, []);

  if (aToken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </div>
      </div>
    );

  }
  else if (dToken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path='/doctor/appointment' element={<DoctorAppointment />} />
            <Route path='/doctor/profile' element={<DoctorProfile />} />
            <Route path="*" element={<Navigate to="/doctor/dashboard" />} />
          </Routes>

        </div>
      </div>
    );
  }

  else {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }
};

export default App;