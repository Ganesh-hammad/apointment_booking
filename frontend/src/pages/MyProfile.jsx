import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify';
import userModel from '../../../backend/models/userModel.js';
import axios from 'axios';
import { assets } from '../assets/assets.js';

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [image, setImage] = useState(false);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('dob', userData.dob);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData;
        setEdit(false);
        setImage(false);
      } else {
        toast.error(data.error)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const [edit, setEdit] = useState(false)
  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        edit ?
          <label htmlFor="image">
            <div className="inline-block cursor-pointer relative ">
              <img className='w-36 rounded opacity-50' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10  absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
          </label> : <img className='w-36 rounded' src={userData.image} alt="" />
      }
      {
        edit ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} /> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className='font-medium'>Email Id:</p>
          <p className='text-primary'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            edit ? <input className='bg-gray-100 max-w-52 ' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} /> : <p className='text-primary'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            edit ?
              <p>
                <input className='bg-gray-50' type="text" onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                <br />
                <input className='bg-gray-50' type="text" onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div className="">
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className='font-medium '>Gender:</p>
          {
            edit ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select> : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            edit ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} /> : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className="mt-10">
        {
          edit ? <button className='border border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={updateProfile}>Save Information</button> : <button className='border border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setEdit(!edit)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile