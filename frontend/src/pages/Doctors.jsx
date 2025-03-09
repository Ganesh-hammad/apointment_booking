import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality} = useParams();
  const [fiteredData, setFilterdData] = useState([]);
  const {doctors, navigate} = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false)

  const applyFilter = () => {
    if(speciality){
      setFilterdData(doctors.filter((doc) => doc.speciality === speciality))
    }else{
      setFilterdData(doctors);
    }
  }
  useEffect(()=>{
    applyFilter()
  },[doctors, speciality]);
  return (
    <div>
      <p className='text-gray-600'>Browe through the doctors speciality.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
      {/* left side */}
      <button className={`py-1 px-3 border rounded text-sm transition-all duration-300 sm:hidden ${showFilter ? 'bg-primary text-white': ''}`} onClick={()=>setShowFilter(prev=> !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-primary text-white" : ""}`}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}  className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-primary text-white" : ""}`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-primary text-white" : ""}`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-primary text-white" : ""}`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-primary text-white" : ""}`}>Neurologist </p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-primary text-white" : ""}`}>Gastroenterologist </p>

        </div>
        {/* right side  */}
        <div className="w-full grid grid-cols-auto  gap-4  gap-y-6">
          {
            fiteredData.map((item, index) => (
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
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors