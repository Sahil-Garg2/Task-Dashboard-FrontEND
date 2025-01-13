import React from 'react';
import { useAuth } from '../context/AuthContext';
import CreateCategory from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';
import { CategoryProvider } from '../context/CategoryContext';
import CreateUser from '../components/CreateUser';
import { UserProvider } from '../context/UserContext';
import { TaskProvider } from '../context/TaskContext';
import CreateTask from '../components/CreateTask';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import UserList from '../components/UserList';
import RoleList from '../components/RoleList';
import RoleForm from '../components/RoleForm';
import TaskList from '../components/TaskList';
import SortableList from '../components/Sortable';

const AdminPage = () => {
  const { user } = useAuth();

  if (user && user.role.name !== 'admin') {
    return <h1>You are not authorized to view this page.</h1>;
  }

  return (
    <>
      <div className="row">
        <div className="col-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-9">
          {/* User Data */}
          <UserProvider>
            <Routes>
              <Route path="/" element={<h2>You are on the admin dashboard</h2>} />
              <Route path="createuser" element={<CreateUser />} />
              <Route path="users" element={<UserList></UserList>} />
              <Route path="roles" element={<RoleList/>} />
              <Route path="createrole" element={<RoleForm />} />
              <Route path="checkList" element={<RoleList isCheckList={true} />} />
              <Route path="createCheckList" element={<RoleForm isCheckList={true} />} />
              <Route path="sortable" element={<SortableList />} />
            </Routes>
          </UserProvider>
          {/* Category Data */}
          <UserProvider>
            <CategoryProvider>
                <Routes>
                  <Route path="createcategory" element={<CreateCategory />} />
                  <Route path="categories" element={<CategoryList />} />
                </Routes>
              </CategoryProvider>
          </UserProvider>
          {/* Task Data */}
          <TaskProvider>
            <UserProvider>
              <Routes>
                <Route path="createtask" element={<CreateTask />} />
                <Route path="tasks" element={<TaskList />} />
              </Routes>
            </UserProvider>
          </TaskProvider>
        </div>
      </div>
      </>
  );
};

export default AdminPage;
