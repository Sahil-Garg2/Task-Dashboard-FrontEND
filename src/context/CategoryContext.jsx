// context/CategoryContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all categories (Admin view)
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/categories`);
            setCategories(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching categories', err);
        }
    };

    // Create a new category
    const createCategory = async (categoryData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/categories/create`, categoryData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setCategories([...categories, response.data]);
            return true;
        } catch (err) {
            //modalRef.current.show('Error', `Error creating category: ${err.message}`);
            console.error('Error creating category', err);
            return false;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, createCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    return React.useContext(CategoryContext);
};
