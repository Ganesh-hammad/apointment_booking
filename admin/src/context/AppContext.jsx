import { createContext } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currency = "$"
    
    const calculateAge = (dob) => {
        const today = new Date();
        const birthdate = new Date(dob);

        let age = today.getFullYear() - birthdate.getFullYear();

        return age;
    }
    const months = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }



    const value = {
        calculateAge, slotDateFormat, currency

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>)

}

export default AppContextProvider;