import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';  // Importing Sortable correctly
import 'bootstrap/dist/css/bootstrap.min.css';

const SortableList = ({ items, selectedItems, setSelectedItems, toggleSelect}) => {


    return (
        <div className="container mt-5 d-flex">
            <div className="mr-2">
                <h2>Check List Items</h2>
                <ul className="list-group mb-3">
                {items.map((item) => (
                     <li
                        key={item.id}
                        className={`list-group-item ${item.selected ? 'selected' : ''}`}
                        onClick={() => toggleSelect(item.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {item.name}
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h2>Select the items and re-order it</h2>
                <ReactSortable 
                    tag="ul"
                    className="list-group"
                    list={selectedItems} setList={setSelectedItems}
                >
                    {selectedItems.map((item, index) => (
                        item.selected && <li key={index} className="list-group-item">
                            {item.name}
                        </li>
                    ))}
                </ReactSortable >
            </div>
        </div>
    );
};


export const SortableListForRole = ({ roles, workflow, setWorkflow, toggleRoleSelect }) => {


    return (
        <div className="container mt-5 d-flex">
            <div className="mr-2">
                <h2>Roles</h2>
                <ul className="list-group mb-3">
                    {roles.map((item) => (
                        <li
                            key={item._id}
                            className={`list-group-item ${item.selected ? 'selected' : ''}`}
                            onClick={() => toggleRoleSelect(item._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Create workflow</h2>
                <ReactSortable
                    tag="ul"
                    className="list-group"
                    list={workflow} setList={setWorkflow}
                >
                    {workflow.map((item, index) => (
                        item.selected && <li key={index} className="list-group-item">
                            {item.name}
                        </li>
                    ))}
                </ReactSortable >
            </div>
        </div>
    );
};

export default SortableList;
