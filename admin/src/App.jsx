
import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Admin/Dashboard';
import AllApointments from './Admin/AllApointments';
import AddDoctor from './Admin/AddDoctor';
import DoctorsList from './Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './Doctor/DoctorDashboard';
import DoctorAppointments from './Doctor/DoctorAppointments';
import DoctorProfile from './Doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllApointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/* Doctor Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointment' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  )
    : (
      <div>
        <Login />
        <ToastContainer />
      </div>
    )
}

export default App