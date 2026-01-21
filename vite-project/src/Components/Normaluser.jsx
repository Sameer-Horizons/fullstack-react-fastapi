import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../Context/AppContext.jsx";
import myimg from '../assets/Screenshot_2025-removebg-preview.png'

function Normaluser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { backendurl, setIsLoggedin } = useContext(AppContext)
    axios.defaults.withCredentials = true
    const handleClick = async (e) => {
        
        try {
            e.preventDefault();
            if (email && password) {
                
                const { data } = await axios.post(`${backendurl}/loginuser`, { email, password })
                if (data.success) {
                    setIsLoggedin(true)
                    navigate('/ListofStores')
                }
                else {
                    alert(data.message)
                }
            }
        } catch (err) {
            console.log(err)
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
            <header className="page">Normal Login page</header>
            <br /><br />
            <div className="form-container1" autoComplete="off">
                <br />
                <p className="emaillogo">Email</p>
                <input className="input" type="text"  value={email} 
                   autoComplete="off"  onChange={(e) => setEmail(e.target.value)} />
                <br />
                <p className="password">Password</p>
                <input className="input" type="password" value={password} 
                autoComplete="off"  onChange={(e) => setPassword(e.target.value)} />
                <br />
            </div>
            <div>
                <ul >
                    <li onClick={handleClick} className="login-button" >Login</li>
                </ul>
                <p className="P1">New User create Account ? </p>
                <button onClick={() => navigate("/NUserRegitr")} className="R-button"> Register </button>
            </div>
        </>
    )
}

export default Normaluser;