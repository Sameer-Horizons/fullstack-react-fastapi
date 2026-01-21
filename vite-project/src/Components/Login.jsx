import { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
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
            if ( email && password) {
                const { data } = await axios.post(backendurl + '/login', {  email, password })
                if (data.success) {
                    setIsLoggedin(true)
                    navigate('/SysAdmin')
                }
                else {
                    alert(data.message)
                }
                
            }else{
                 alert('details required');
            }
        }
        catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <nav className="Nav" autoComplete="off">
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
            <form className="Authbox" onSubmit={handleClick} autoComplete="off" >
                <br />
                <br />
                <h2>Logging as Admin</h2>
                <p className="emaillogo">Email</p>
                <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}  autoComplete="off"  />
                <br />
                <p className="password">Password</p>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  autoComplete="off" />
                <br />
                <button type="submit" className="login-button1" style={{ listStyle: 'none', border: 'none', cursor: 'pointer' }}>
                Login
            </button>
            </form>
            <div>
            </div>

        </>
    )
}

export default Login;