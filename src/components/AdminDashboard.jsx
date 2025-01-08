import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
