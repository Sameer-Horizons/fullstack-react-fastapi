import axios from "axios";
import { createContext, use, useState } from "react";
axios.defaults.withCredentials = true;
export const AppContext = createContext();
export const AppContextProvider = (props) => {
    const backendurl = "http://localhost:8000";
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null)
    const verifyUser = async () => {
        try {
            // Note: Use a dedicated GET endpoint for verification, not /login
            const { data } = await axios.post(`${backendurl}/api/auth/login`);
            if (data.success) {
                setIsLoggedin(true);
                setUserData(data.user);
            }
        } catch (error) {
            setIsLoggedin(false);
            setUserData(null);
        }
    };
    const value = {
        backendurl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        verifyUser
    }

    /*const getUserData = async () => {
        try {
            const { data } = await axios.post(`${backendurl}/api/auth/login`)

        } catch (error) {

        }
    }*/
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};