import { useState } from "react";
import { AppContext } from "./Context/AppContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddingAdmin() {
    const [AdminId, setAdminId] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { backendurl } = useContext(AppContext)

    const handleAdd = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;
            if (AdminId && role && email && password) {
                const { data } = await axios.post(backendurl + "/register-admin", { AdminId, role, email, password })
                if (data.success) {
                    alert("success");
                    setAdminId('');
                    setRole('');
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
                <p className="">Enter Admin Id</p>
                <input type="text" value={AdminId} onChange={(e) => setAdminId(e.target.value)} />
                <br />
                <p className="">Enter Admin Role</p>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                <br />
                <p className="">Enter your Email</p>
                <input className="inputpass" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <p className="">Enter Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleAdd}> Submit </button>
            </div>
        </>
    )
}

export default AddingAdmin;