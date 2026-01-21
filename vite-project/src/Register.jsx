import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext.jsx";
function Register() {

    const [name, setName] = useState("");
    const [address, setaddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { backendurl, setUserData } = useContext(AppContext)
    const navigate = useNavigate();
    const handleregister = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true
            if (name && email && address && password) {
                const { data } = await axios.post(backendurl + "/api/auth/register", { name, email, address, password })
                if (data.success) {
                    setUserData(true)
                    navigate('/login')
                }
                else {
                    alert(data.message)
                }
            }
        } catch (error) {
            alert(data.message)
        }

    }

    return (
        <>
            <button onClick={() => navigate("/")}>Back</button>
            <div className="Authbox">
                <p className="">Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <p className="">Address</p>
                <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} />
                <br />
                <p className="">Email</p>
                <input className="inputpass" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                
                <p className="">Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleregister} className="signbutton" >Sign Up</button>
                <p>Already have a account?</p>
                <span onClick={() => navigate("/login")}> login</span>
            </div>
        </>
    )
}

export default Register;