import { useState } from "react";
import { AppContext } from "./Context/AppContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Newuser() {
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate()
    const { backendurl } = useContext(AppContext)

    const handleAdd = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;
            if (username && address && email && password) {
                const { data } = await axios.post(backendurl + "/register&adduser", { username, email, address, password })
                if (data.success) {
                    alert("success");
                    setUsername('');
                    setAddress('');
                    setEmail('');
                    setPassword('');
                }
                else {
                    alert(data.message);
                }
            }
            else {
                alert("Please fill in all fields.");
            }
        } catch (error) {
            console.error("Axios request failed:", error);
        }
    }
    return (
        <>
            <button onClick={() => navigate("/SysAdmin")}>Back</button>
            <div className="Adding-Store">
                <p className="">Enter Username</p>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <p className="">Enter Address</p>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                <br />
                <p className="">Enter your Email</p>
                <input className="inputpass" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <p className="">Enter Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


                <button onClick={handleAdd}> + Add Store </button>
            </div>


        </>
    )

};

export default Newuser;