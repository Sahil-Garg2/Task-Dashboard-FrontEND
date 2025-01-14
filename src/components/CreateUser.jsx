// components/CreateUser.js
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { ModalDialog } from './Modal';
import axios from 'axios';

const CreateUser = () => {
    const { categories, roles, fetchUsers } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [assignedCategories, setAssignedCategories] = useState([
        { category: '', assignedRole: '' },
    ]);
    const modalRef = React.createRef();

    useEffect(() => { 

        initMDB({ Input, Ripple });
    });
    const handleCategoryRoleChange = (index, field, value) => {
        const updatedCategories = [...assignedCategories];
        updatedCategories[index][field] = value;
        setAssignedCategories(updatedCategories);
    };

    const addCategory = () => {
        setAssignedCategories([...assignedCategories, { category: '', assignedRole: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username:name,
            email,
            role,
            password,
            categories: assignedCategories,
        };

        try {
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/users/create`, userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            modalRef.current.show('Success', 'User created successfully');
            fetchUsers();  // Reload users after creation
        } catch (err) {
            modalRef.current.show('Error', 'User creation failed with error message: ' + err.message);
            //console.error('Error creating user', err);
        }
    };

    return (
        <div>
            <section className="vh-100 sectiontoremove" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px" }}>
                                <div className="card-body p-md-1">
                                    <div className="row justify-content-center">
                                        <div className="col-md-12 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create New User</p>

                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            required
                                                            id="form3Example3c" className="form-control"

                                                        />
                                                        <label className="form-label" htmlFor="form3Example3c">Name:</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                            id="form3Example4c"
                                                            className="form-control"
                                                        />
                                                        <label className="form-label" htmlFor="form3Example4c">Email:</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                            id="form3Exampler"
                                                            className="form-control"
                                                        />

                                                        <label className="form-label" htmlFor="form3Exampler">Password:</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select data-mdb-select-init value={role} className="form-select" onChange={(e) => setRole(e.target.value)} required>
                                                            <option value="">Select Role</option>
                                                            {roles.map((role) => (
                                                                <option key={role._id} value={role._id}>
                                                                    {role.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <h3>Assign Categories and Roles</h3>
                                                {assignedCategories.map((categoryRole, index) => (
                                                    <div className="border rounded p-2 mt-1" key={index}>
                                                        <div className="mb-1">
                                                            <label>Category:</label>
                                                            <select data-mdb-select-init
                                                                value={categoryRole.category}
                                                                className="form-select"
                                                                onChange={(e) => handleCategoryRoleChange(index, 'category', e.target.value)}
                                                                required
                                                            >
                                                                <option value="">Select Category</option>
                                                                {categories.map((category) => (
                                                                    <option key={category._id} value={category._id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-1">
                                                            <label>Assigned Role:</label>
                                                            <select data-mdb-select-init
                                                                className="form-select"
                                                                value={categoryRole.assignedRole}
                                                                onChange={(e) => handleCategoryRoleChange(index, 'assignedRole', e.target.value)}
                                                                required
                                                            >
                                                                <option value="">Select Role</option>
                                                                {roles.map((role) => (
                                                                    <option key={role._id} value={role._id}>
                                                                        {role.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={addCategory}>
                                                    Add Another Category
                                                </button>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Create User</button>
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
            <ModalDialog ref={ modalRef} />
        </div>
        
    );
};

export default CreateUser;
