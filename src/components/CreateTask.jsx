import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedUser: '',
    category: '',
    checklist: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks/create', taskData);
      alert('Task Created Successfully');
    } catch (err) {
      console.log('Error creating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={taskData.description}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      />
      {/* Add more form fields for category, assignedUser, etc. */}
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
