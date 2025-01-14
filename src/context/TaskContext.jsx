// context/TaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch categories and users
    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/categories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        }
    };

    // Fetch tasks
    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/tasks`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks', err);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, categories, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    return React.useContext(TaskContext);
};
