import React from 'react'
import { assets } from '../assets/assets'


const Header = () => {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap  bg-primary rounded-lg px-6 md:px-8 lg:px-18 '> 
      {/*  Left side  */}
      <div className="md:w-1/2 flex flex-col items-start justify-center  gap-4 py-10 m-auto md:py-[10vw] md:mb-[30px]  ">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">Book Appointment <br />With Trusted Doctors</p>
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 text-white text-sm font-light">
          <img className='w-24' src={assets.group_profiles} alt="" />
          <p className="">Simply browse through our extensive list of trusted, doctors <br className='hidden md:block' />schedule your appointment hassle-free.</p>
        </div>
        <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-sm text-gray-500 md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">Book appointment <img className='w-3' src={assets.arrow_icon} alt="" /></a>
      </div>
      {/* Right side */}
      <div className="md:w-1/2 relative">
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header