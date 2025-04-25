import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext();

const AdminContextProvider = (props) =>{
    const navigate = useNavigate();

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken'):'');
    const backendUrl = "https://apointment-booking-backend.onrender.com";
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([]);
    const [dashBoardData, setDashBoardData] = useState(false);


    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl+"/api/admin/all-doctors" ,{}, {headers: {aToken}});
            if(data.success){
                setDoctors(data.doctors);
                console.log(data.doctors);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }
    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl+ "/api/admin/change-availability", {docId}, {headers: {aToken}});
            if(data.success){
              toast.success(data.message);
              getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }

    }
    const getAllAppointments = async (req, res) => {
        try {
            const {data} = await axios.get(backendUrl+"/api/admin/appointments", {headers: {aToken}});
            if(data.success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }
        const cancelAppointment = async (appointmentId) => {
            try {
                const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointments', {appointmentId}, {headers: {aToken}});
                if(data.success){
                    toast.success(data.message);
                    getAllAppointments()
                }else{
                    toast.error(data.message)
                }
    
            } catch (error) {
                toast.error(error.message);
                console.log(error)
            }
        }

        const completeAppointment = async (appointmentId) =>{
            try {
                const {data} = await axios.post(backendUrl+"/api/admin/complete-appointment", {appointmentId}, {headers:{aToken}});
                if(data.success){
                    toast.success(data.message);
                    getAllAppointments();
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message); 
            }
        }

        const getDashData = async () => {
            try {
                const {data} = await axios.get(backendUrl+"/api/admin/dashboard", {headers:{aToken}});
                if(data.success){
                    setDashBoardData(data.dashData)
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message);
                console.log(error) 
            }
        }

    const value = {
        aToken, setAToken, backendUrl, navigate, doctors, getAllDoctors, changeAvailability, getAllAppointments, appointments, cancelAppointment, completeAppointment, getDashData, dashBoardData
    }
    return (
    <AdminContext.Provider value={value}>
          {props.children}
    </AdminContext.Provider>)

}

export default AdminContextProvider;
