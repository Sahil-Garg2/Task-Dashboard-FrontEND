// components/UserList.js
import React from 'react';
import { useUser } from '../context/UserContext';

const UserList = () => {
    const { users } = useUser();

    return (
        <div>
            <h2>User List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            {user.email && <td>{user.email}</td>}
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
