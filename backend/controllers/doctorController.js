import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

// changed availablity

const changeAvailablity = async (req, res) => {
    try {
         const {docId} = req.body;
         const docdata = await doctorModel.findById(docId);

         await doctorModel.findByIdAndUpdate(docId, {available: !docdata.available});
         res.json({success: true, message: 'Availablity changed'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }

}
// all doctors list
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// api for doctor login
const loginDoctor = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email});
        if(!doctor){
            res.json({success:false, message:"Invalid Credencial"})
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET);
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Password"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// api to get doctor appointment for doctor panel
const appointmentsDoctor = async (req, res) =>{
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});

        res.json({success:true, appointments});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// api to mark appointment comleted for doctor panel

const appointmentComplete = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;
        const appointmentData =  await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
            return res.json({success:true, message:"Appointment Completed"})
        }else{
            return res.json({success:false, message:"Mark Failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// api to mark appointment Cancelled for doctor panel

const appointmentCancelled = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;
        const appointmentData =  await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
            return res.json({success:true, message:"Appointment Cancelled"})
        }else{
            return res.json({success:false, message:"cancellation Failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// api to mark appointment Cancelled for doctor panel

const doctorDashboard = async (req, res) => {
    try {
        const {docId} = req.body;
        const appointments =  await appointmentModel.find({docId})

        let earnings = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = [];
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        return res.json({success:true, dashData})
        

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}
// api to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const {docId} = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');

        res.json({success:true, profileData})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// api to get doctor profile for doctor panel
const updatedoctorProfile = async (req, res) => {
    try {
        const {docId, fees, address, available} = req.body;
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available}).select('-password');

        res.json({success:true, message: "Profile Updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}
export  {changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancelled, doctorDashboard, doctorProfile, updatedoctorProfile};