// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();

    // Fetch categories for assignment
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/categories`);
            setCategories(response.data);
        } catch (err) {
            console.error('Error fetching categories', err);
        }
    };

    // Fetch roles for assignment
    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/roles`,{
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
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL }/api/checklist`, {
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
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/roles/create`, data, {
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
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/checklist/create`, data, {
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
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/users`, {
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
        
        fetchRoles();
        if (localStorage.getItem('token') && user && user.role.name === 'admin') {
            fetchUsers();
            fetchCheckList();
            fetchCategories();
        }
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
