// components/CreateCategory.js
import React, { useState, useEffect, useId } from 'react';
import { useCategory } from '../context/CategoryContext';
import { Input, Ripple, initMDB, Button , Collapse} from "mdb-ui-kit";
import SortableList, { SortableListForRole} from './Sortable';
import { useUser } from '../context/UserContext';
import { ModalDialog } from './Modal';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parent, setParent] = useState('');
    const { categories, createCategory } = useCategory();
    const sectionid = useId();
    const { checkList } = useUser();
    const [selectedItems, setSelectedItems] = useState([]);  
    const [item, setItems] = useState([]);
    const { roles } = useUser();
    const [workflow, setWorkflow] = useState([]);
    const [role, setRoles] = useState([]);
    const modalRef = React.createRef();
    useEffect(() => {
        initMDB({ Input, Ripple });
    }, [sectionid]);
    
    useEffect(() => {
        setItems(checkList.map((item) => ({ id: item._id, name: item.title, selected: false })));
    }, [checkList]);

    useEffect(() => { 
        setRoles(roles);
    }, [roles]);

    const toggleRoleSelect = (id) => {
        setRoles((prevRoles) => {
            if (!prevRoles) return [];
            const updatedRoles = prevRoles.map((role) =>
                role._id === id ? { ...role, selected: !role.selected } : role);
            setWorkflow(updatedRoles.filter((role) => role.selected));
            return updatedRoles
        });
    };
    
    const toggleSelect = (id) => {
        setItems((prevItems) => {
            if (!prevItems) return [];
            const updatedItems = prevItems.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item);
            setSelectedItems(updatedItems.filter((item) => item.selected));
            return updatedItems;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryData = {
            name,
            description,
            parent,
            selectedItems,
            dependency: workflow
        };

        const response = createCategory(categoryData);
        if (response) {
            modalRef.current.show('Success', 'Category created successfully');
        }
        else {
            modalRef.current.show('Error', 'Error creating category');
        }
        setName('');
        setDescription('');
        setParent('');
    };

    return (
        <div>
            <section className="vh-100 sectiontoremove" style={{ backgroundColor: "#eee" }} id={sectionid}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px" }}>
                                <div className="card-body p-md-1">
                                    <div className="row justify-content-center">
                                        <div className="col-md-12 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create New Category</p>

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
                                                        <label className="form-label" htmlFor="form3Example3c">Category Name:</label>
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

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select data-mdb-select-init
                                                            value={parent}
                                                            onChange={(e) => setParent(e.target.value)}
                                                            id="form3Exsdfasample4c"
                                                            className="form-select"
                                                        >
                                                            <option value="">None (Root Category)</option>
                                                            {categories
                                                                .map((category) => (
                                                                    <option key={category._id} value={category._id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>                                                  

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <SortableList items={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} toggleSelect={toggleSelect}/>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <SortableListForRole roles={role} workflow={workflow} setWorkflow={setWorkflow} toggleRoleSelect={toggleRoleSelect} />
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

export default CreateCategory;
