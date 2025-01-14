// components/CreateTask.js
import React, { useEffect, useState } from 'react';
import { useTask } from '../context/TaskContext';
import axios from 'axios';
import { Input, Ripple,  initMDB } from "mdb-ui-kit";
import { useUser } from '../context/UserContext';
import { ModalDialog } from './Modal';

const CreateTask = () => {
  const { categories, fetchTasks } = useTask();
  const {roles, users} = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const modalRef = React.createRef();

  useEffect(() => {
    initMDB({ Input, Ripple });
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      categoryId,
      userId,
      role
    };

    

    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/tasks/create`, taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks();  // Reload tasks after creation
      modalRef.current.show('Success', 'Task created successfully');
    } catch (err) {
      console.error('Error creating task', err);
      modalRef.current.show('Error', 'Error creating task');
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ "borderRadius": "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create Task</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              id="form3Example3c" className="form-control"
                              required
                            />
                            <label className="form-label" htmlFor="form3Example3c">Title:</label>                          
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                              rows="4"
                              id="form3Example4c"
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="form3Example4c">Description:</label>
                          </div>
                        </div>
                        
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <select data-mdb-select-init
                              value={categoryId}
                              onChange={(e) => setCategoryId(e.target.value)}
                              required
                              id="form3Exsdfasample4c"
                              className="form-select"
                            >
                              <option value="">Select Category</option>
                              {categories?.map((category) => (
                                <option key={category._id} value={category._id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                         <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <select data-mdb-select-init
                              value={userId}
                              onChange={(e) => setUserId(e.target.value)}
                              required
                              id="ert"
                              className="form-select"
                            >
                              <option value="">Select User</option>
                              {users?.map((user) => (
                                <option key={user._id} value={user._id}>
                                  {user.username}
                                </option>
                              ))}
                            </select>

                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <select data-mdb-select-init
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              required
                              id="ert"
                              className="form-select"
                            >
                              <option value="">Select Role</option>
                              {roles?.map((role) => (
                                <option key={role._id} value={role._id}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div> 

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Create Task</button>
                        </div>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalDialog ref={modalRef} />
    </div>
  );
};

export default CreateTask;
