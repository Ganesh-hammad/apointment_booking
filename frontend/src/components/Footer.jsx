import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Footer = () => {
  const {navigate} =useContext(AppContext);
  return (
    <>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div className="">
          <img onClick={()=>navigate('/')} src={assets.logo} alt="" className="w-32 mb-5 cursor-pointer" />
          <p className="w-full md:w-2/3 text-gray-600">To become your favorite online shopping destination by offering unparalleled quality, convenience, and value. We aim to create a seamless shopping journey that keeps you coming back for more. <br /><br />Thank you for choosing FOREVER. We’re here to make your life easier, one order at a time.</p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 ">COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
            <li onClick={()=>navigate('/')}>Home</li>
            <li onClick={()=>navigate('/about')}>About us</li>
            <li onClick={()=>navigate('/contact')}>Contact us</li>
            <li onClick={()=>navigate('/')}>Privacy Policy</li>
          </ul>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5 ">COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className="">+91- 969-144-0772</li>
            <li className="">ganeshhammad837@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="">
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024@ forever.com - All Right reserved</p>
      </div>
    </>
  )
}

export default Footer