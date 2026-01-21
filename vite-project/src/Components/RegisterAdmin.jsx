import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../Context/AppContext.jsx";
import myimg from '../assets/Screenshot_2025-removebg-preview.png'

function Login() {
    const [AdminId, setAdminId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { backendurl, setIsLoggedin } = useContext(AppContext)
    const handleClick = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true
            if (AdminId && email && password) {
                const { data } = await axios.post(backendurl + '/api/auth/Adminregister', { AdminId, email, password })
                if (data.success) {
                    setIsLoggedin(true)
                    alert('saved')
                }
                else {
                    alert(data.message); 
                }
            }else{
                 alert('details required');
            }
        }   
        catch (err) {
            alert(err.response?.data?.message || "An error occurred");
        }
    }
    return (
        <>
            <nav className="Nav">
                <div >
                    <img className="logoimg" src={myimg} />
                </div>
                <ul className="Navlist">
                    <li onClick={() => { navigate("/") }}>Home </li>
                    <li>Contact Us </li>
                    <li>About </li>
                </ul>
            </nav>
            <button onClick={() => navigate("/")}>Back</button>
            <br /><br />
            <div className="Authbox">
                <br />
                <br />
                <p className="emaillogo">AdminID</p>
                <input className="input" type="text" value={AdminId} onChange={(e) => setAdminId(e.target.value)} />
                <p className="emaillogo">Email</p>
                <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <p className="password">Password</p>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <li onClick={handleClick}className="login-button1" >Login</li>
            </div>
            <div>
            </div>

        </>
    )
}

export default Login;