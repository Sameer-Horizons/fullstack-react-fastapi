import { useEffect, useState, useMemo ,useContext} from "react";
import axios from "axios";
import myimg from '../assets/Screenshot_2025-removebg-preview.png'
import { AppContext } from "../Context/AppContext.jsx";

function StoreDetails() {
    const [stores, setStores] = useState([])
    const { backendurl, setIsLoggedin } = useContext(AppContext)
    const [filterQuery, setFilterQuery] = useState('');
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
                const response = await axios.get('http://localhost:8000/get-store');
                setStores(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchStores();
    }, [])
    const handleFilterChange = (event) => {
        setFilterQuery(event.target.value);
    };

    const filteredUsers = useMemo(() => {
        if (!filterQuery) {
            return stores;
        }

        const lowerCaseQuery = filterQuery.toLowerCase();
        return stores.filter(store => {
            const nameMatch = store.storename.toLowerCase().includes(lowerCaseQuery);
            const emailMatch = store.email.toLowerCase().includes(lowerCaseQuery);
            const addressMatch = String(store.address || '').toLowerCase().includes(lowerCaseQuery);

            return nameMatch || emailMatch || addressMatch;
        });
    }, [stores, filterQuery]);

    return (
        <>
            <nav className="Nav">
                <div >
                    <img className="logoimg" src={myimg} />
                </div>
                <ul className="Navlist">
                    
                    <li>Contact Us </li>
                    <li onClick={handleClick}  >Log out</li>
                </ul>
            </nav>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by Name, Email, or Address"
                    value={filterQuery}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>
            <h2 className="H2">List of stores</h2>

            <div className="user-item">
                {
                    filteredUsers.map(store => (
                        <div key={store._id} className="user-card">
                            <h3 className="user-card-h3">{store.storename}</h3>
                            <p className="user-card-p">{store.email}</p>
                            <p>Address : {store.address}</p>
                        </div>
                    ))
                }
            </div>

            <div>
                
            </div>
        </>
    )

}


export default StoreDetails;





