import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { specialityData } from "../assets/assets";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currencySymbol = "$";
    const navigate = useNavigate()
    const [doctors, setDoctors] = useState([])
    const [userData, setUserData] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"): false);

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/doctor/list");
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    }

    const loadUserProfileData = async () =>{
        try {
            const {data} = await axios.get(backendUrl+"/api/user/get-profile",{headers:{token}});
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message); 
        }
    }

    useEffect(()=>{
        getDoctorsData();
    }, [doctors])

    useEffect(()=>{
        if(token){
            loadUserProfileData();
        }else{
            setUserData(false);
        }
    }, [token])

   const value = {
        doctors, specialityData, navigate, currencySymbol, backendUrl, token, setToken, userData, setUserData, loadUserProfileData, getDoctorsData
    }


return(   <AppContext.Provider value={value}>
        {props.children}
   </AppContext.Provider>)
}
export default AppContextProvider;