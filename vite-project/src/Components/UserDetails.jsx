import { useEffect, useState, useMemo } from "react";
import axios from "axios";

function UserDetails() {
    const [users, setUsers] = useState([])
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(() => {
        const fetchusers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-users');
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchusers();
    }, [])

    const handleFilterChange = (event) => {
        setFilterQuery(event.target.value);
    };


    const filteredUsers = useMemo(() => {
        if (!filterQuery) {
            return users;
        }
        const lowerCaseQuery = filterQuery.toLowerCase();
        return users.filter(user => {
            const nameMatch = user.username.toLowerCase().includes(lowerCaseQuery);
            const emailMatch = user.email.toLowerCase().includes(lowerCaseQuery);
            const addressMatch = String(user.address || '').toLowerCase().includes(lowerCaseQuery);

            return nameMatch || emailMatch || addressMatch;
        });
    }, [users, filterQuery]);

    return (
        <>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by Name, Email, or Address"
                    value={filterQuery}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>

            <div className="user-item">
                {
                    filteredUsers.map(user => ( 
                        <div key={user._id} className="user-card">
                            <h3 className="user-card-h3">{user.username}</h3>
                            <p className="user-card-p">{user.email}</p>
                            <p>Address : {user.address}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default UserDetails;





