import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });

  // Fetch users (admin only)
  useEffect(() => {
    if (user && user.role === 'admin') {
      axios
        .get('http://localhost:5000/api/users')
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  // Create a new user
  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/create', newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers([...users, newUser]);
      setNewUser({ username: '', email: '', role: '' }); // Clear the form
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  if (user && user.role !== 'admin') {
    return <h1>You are not authorized to view this page.</h1>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Create New User</h2>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleCreateUser}>Create User</button>

      <h2>Existing Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
