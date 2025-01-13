// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories for assignment
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3010/api/categories');
            setCategories(response.data);
        } catch (err) {
            console.error('Error fetching categories', err);
        }
    };

    // Fetch roles for assignment
    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:3010/api/roles',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setRoles(response.data);
        } catch (err) {
            console.error('Error fetching roles', err);
        }
    };

    const fetchCheckList = async () => {
        try {
            const response = await axios.get('http://localhost:3010/api/checklist', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCheckList(response.data);
        } catch (err) {
            console.error('Error fetching roles', err);
        }
    };

    const createRole = async (data) => {
        try {
            await axios.post('http://localhost:3010/api/roles/create', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return true;
        } catch (err) {
            console.error('Error creating role', err);
            return false;
        }
    }
    const createCheckList = async (data) => {
        try {
            await axios.post('http://localhost:3010/api/checklist/create', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return true;
        } catch (err) {
            console.error('Error creating role', err);
            return false;
        }
    }

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3010/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users', err);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchRoles();
        fetchUsers();
        fetchCheckList();
    }, []);

    return (
        <UserContext.Provider value={{ users, categories, roles, checkList, fetchUsers, createRole, createCheckList }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return React.useContext(UserContext);
};