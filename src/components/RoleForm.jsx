// components/CreateCategory.js
import React, { useState, useEffect, useId } from 'react';
import { useCategory } from '../context/CategoryContext';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { useUser } from '../context/UserContext';
import { ModalDialog } from './Modal';

const RoleForm = ({ isCheckList}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { createRole, createCheckList } = useUser();
    const modalRef = React.createRef();

    useEffect(() => {
        initMDB({ Input, Ripple });
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (isCheckList) {
            const checkListData = {
                title: name,
                description
            }
            const response = createCheckList(checkListData);
            if(response)
                modalRef.current.show('Success', 'CheckList created successfully');
            else
                modalRef.current.show('Error', 'Error creating CheckList');
        }
        else {
            const roleData = {
                name,
                description
            };
            const response = createRole(roleData);
            if(response)
                modalRef.current.show('Success', 'Role created successfully');
            else
                modalRef.current.show('Error', 'Error creating Role');
        }
    };

    return (
        <div>
            <section className="vh-100 sectiontoremove" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{isCheckList?"Create New CheckList": "Create New Role"}</p>

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
                                                        <label className="form-label" htmlFor="form3Example3c">{!isCheckList?"Name:" : "Title"}</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <textarea
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            rows="4"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                        />
                                                        <label className="form-label" htmlFor="form3Example4c">Description:</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Create Category</button>
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

export default RoleForm;
