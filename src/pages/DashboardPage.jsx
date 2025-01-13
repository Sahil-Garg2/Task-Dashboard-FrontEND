import React from 'react';
import { useAuth } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { UserProvider } from '../context/UserContext';

const DashboardPage = () => {
  const { user } = useAuth();

  if (user && user.role.name !== 'user') {
    return <h1>You are not authorized to view this page.</h1>;
  }

  return (
    <>
      <div className="row">
        <div className="col-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-9">
          {/* Task Data */}
          <TaskProvider>
            <UserProvider>
              <Routes>
              <Route path="tasks" element={<TaskList isUser={ true} />} />
              </Routes>
            </UserProvider>
          </TaskProvider>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
