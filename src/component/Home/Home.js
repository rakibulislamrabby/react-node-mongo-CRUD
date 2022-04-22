import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/user")
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleUserDelete = (id) => {
        const procced = window.confirm("Are you sure to delete");
        if (procced) {
            console.log('Deleted user id is:', id);
            const url = `http://localhost:5000/user/${id}`;
            fetch(url, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log('Deleted');
                        const remaining = users.filter(user => user._id !== id);
                        setUsers(remaining)
                    }
                })
        }

    }
    return (
        <div>
            <h2>Available Users: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li key={user._id}>Name:{user.name}:: Email:{user.email}
                        <Link to={`/update/${user._id}`}>Update</Link>
                        <button onClick={() => handleUserDelete(user._id)}>X</button>
                    </li>)
                }
            </ul>
            {/* {
                users.map(user=><UserInfo key={user._id}
                user={user}
                ></UserInfo>)
            } */}
        </div>
    );
};

export default Home;