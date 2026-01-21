import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myimg from '../src/assets/Screenshot_2025-removebg-preview.png'
import { AppContext } from "./Context/AppContext.jsx";
import MetricCard from "./Metric.jsx";
import MetricCard2 from "./Metric2.jsx";

function SystemAdmin() {

    const { backendurl, setIsLoggedin } = useContext(AppContext)
    const [stores, setStores] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    const handleClick = async (e) => {
         e.preventDefault();
    try {
        await axios.post(`${backendurl}/logout`);
        // 1. Clear local storage/cookies
        localStorage.removeItem('token'); 
        // 2. Redirect user
        window.location.href = '/login'; 
    } catch (err) {
        console.error("Logout failed", err);
    }
    }

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get(`${backendurl}/get-store`);
                setStores(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchStores();
    }, [])

    useEffect(() => {
        const fetchusers = async () => {
            try {
                const response = await axios.get(`${backendurl}/get-users`);
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchusers();
    }, [])

    return (
        <>
            <nav className="Nav">
                <div >
                    <img className="logoimg" src={myimg} />
                </div>
                <ul className="Navlist">
                    
                    <li>Contact Us </li>
                    <li onClick={handleClick} >Log out</li>
                </ul>
            </nav>

            <h1 className="H1">Analytics Dashboard</h1>
            <div className="metrics-grid">
                <MetricCard
                    title="Total Users"
                    className="users"
                    value={users.length}
                />
                <MetricCard2
                    title="Total Stores"
                    className="stores"
                    value={stores.length}
                />
                <MetricCard
                    title="Submitted Ratings"
                    className="ratings"

                />
            </div>
            <br />
            <br />
            <div className="AddingBox">
                <button className="FirstDiv" onClick={() => navigate("/Addingstore")} >Add New Stores</button>
                <button className="FirstDiv" onClick={() => navigate("/AddingUser")}> Add Normal Users</button>
                <button className="FirstDiv" onClick={() => navigate("/AddingAdmin")}>Add Admins</button>
            </div>
        </>
    )
}
export default SystemAdmin;