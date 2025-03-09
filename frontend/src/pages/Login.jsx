import React, { useContext, useEffect, useState } from 'react'
// import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

const Login = () => {
    const [state, setState] = useState("Sign Up");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const {token, setToken, backendUrl, navigate} = useContext(AppContext);

    const onSubmitHandler = async (event) => {
     event.preventDefault();
     try {
        if(state === "Sign Up"){
            const {data} = await axios.post(`${backendUrl}/api/user/register`, {name, email, password });
            if(data.success){
                toast.success("Registration successful!", {
                    position: "top-right",
                    autoClose: 1000, // Closes after 3 seconds
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                setToken(data.token);
                localStorage.setItem("token", data.token);
                setState("Login");
            }else{
                toast.error(data.message);
            }
         }else{
            const {data} = await axios.post(`${backendUrl}/api/user/login`, {email, password });
            if(data.success){
                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 1000, // Closes after 3 seconds
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  
                navigate('/')
                setToken(data.token);
                localStorage.setItem("token", data.token)
            }else{
                toast.error(data.message);
            }
         } 
     } catch (error) {
        console.log(error);
        toast.error(error.message);
     }
     }
    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center ' >
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[360px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
                <p className='text-2xl font-semibold m-auto'>{state=== 'Sign Up' ? 'Create Account': 'Login'}</p>
                <p>Please {state=== 'Sign Up' ? 'Sign Up': 'Login'} to book appointment</p>
                {state === "Sign Up" && <div className="w-full">
                    <p>Full Name</p>
                    <input onChange={(e) =>setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required/>
                </div>}
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) =>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required/>
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) =>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
                </div>
                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state=== 'Sign Up' ? 'Create Account': 'Login'}</button>
                {
                    state === "Sign Up" ? <p>Already have an account?<span className='text-parimary underline cursor-pointer' onClick={() => setState("Login")}>Login here</span></p> :<p>Create a new Account <span className='text-primary underline cursor-pointer' onClick={() => setState("Sign Up")}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login