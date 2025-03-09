import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';


const Banner = () => {
    const {navigate} = useContext(AppContext);
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap  bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 '> 
      {/*  Left side  */}
      <div className="flex-1   py-8 sm:py-10  md:py-16 lg:py-24 md:mb-[30px] pl-5 ">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold">
        <p className=" ">Book Appointment </p>
        <p className="mt-4">With 100+ Trusted Doctors </p>
        </div>
        <button onClick={() => navigate('/login')} className=' bg-white px-8 py-3 rounded-full text-sm sm:text-base text-gray-500 mt-6 hover:scale-105 transition-all duration-300'>Create account </button>
      </div>
      {/* Right side */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner