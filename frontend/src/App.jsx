import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Doctors from './pages/Doctors.jsx'
import About from './pages/About.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import MyAppointments from './pages/MyApointments.jsx'
import Appointment from './pages/Appointment.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop.jsx'

const  App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]" >
      <ScrollToTop/>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
      </Routes>
      <Footer/>
    </div>

  )
}
export default App;