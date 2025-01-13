// components/CategoryList.js
import React from 'react';
import { useCategory } from '../context/CategoryContext';

const CategoryList = () => {
    const { categories } = useCategory();

    const renderCategoryHierarchy = (parentId) => {
        return categories
            .filter((category) => category.parent && category.parent._id === parentId)
            .map((category) => (
                <li key={category._id}>
                    <strong>{category.name}</strong>
                    {category.description && <p>{category.description}</p>}
                    <ul>{renderCategoryHierarchy(category._id)}</ul>
                </li>
            ));
    };

    return (
        <div>
            <h2>Category List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>

                    {categories
                        .map((category) => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                {category.description && <td>{category.description}</td>}
                                {/* <ul>{renderCategoryHierarchy(category._id)}</ul> */}
                            </tr>
                        ))}

                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
