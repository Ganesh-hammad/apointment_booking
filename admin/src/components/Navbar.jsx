import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const {aToken, setAToken, navigate} = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);
    const logout = () => {
        navigate('/')
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken('');
        dToken && localStorage.removeItem('dToken')
    }
    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white ">
            <div className='flex items-center gap-2 text-xs '>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border border-gray-600 rounded-full px-2.5 py-0.5 '>{aToken ? 'Admin': 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-parimary text-white text-sm px-8 py-2 rounded-full'>Logout</button>
        </div>
    )
}

export default Navbar