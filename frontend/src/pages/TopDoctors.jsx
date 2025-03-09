import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-2/4 text-center text-sm '>Simply browse through our extensive list of trusted doctors.</p>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 ">
                {doctors.slice(0, 8).map((item, index) => (
                    <div  key={index} onClick={()=>navigate(`/appointment/${item._id}`)} className="rounded-xl border border-blue-200 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                        <img className='bg-primary' src={item.image} alt="" />
                        <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
                            <p className={`w-2 h-2  rounded-full ${item.available ? "bg-green-500" : "bg-slate-500"}`}></p><p>{item.available ? "Available" : "Not Available"}</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm '>{item.speciality}</p>
                    </div>
                    </div>
                ))}
            </div>
            <button onClick={() => {navigate('/doctors')}} className=' bg-primary text-white font-medium rounded-full px-12 py-3' type="">More</button>
        </div>
    )
}

export default TopDoctors