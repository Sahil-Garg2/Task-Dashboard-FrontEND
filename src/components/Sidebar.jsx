import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css'; // We'll create this CSS next

const Sidebar = () => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    const { user } = useAuth();

    const toggleSidebar = () => {
        
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => { console.log(renderKey); }, [renderKey]);
    const handleClick = (path) => () => {
        setRenderKey(prevKey => prevKey + 1);
        navigate(path);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <h3>Logo</h3>
                {/* <button onClick={toggleSidebar} className="toggle-btn">
                    {isCollapsed ? '>' : '<'}
                </button> */}
            </div>
            {user && user.role.name === 'admin' &&
            <ul className="sidebar-menu">
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin")}>Home</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/createuser")}>Create User</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/users")}>User List</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded"  onClick={handleClick("/admin/createcategory")}>Create Category</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded"  onClick={handleClick("/admin/categories")}>Category List</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/createtask")}>Create Task</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/tasks")}>Tasks</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/roles")}>Role List</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/createRole")}>Role Form</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/createCheckList")}>Create CheckList</button>
                </li>
                <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleClick("/admin/checkList")}>CheckList</button>
                </li>
            </ul>
            }
            {
                user && user.role.name === 'user' && <ul className="sidebar-menu">
                    <li>
                        <button type="button" className="btn btn-link btn-sm btn-rounded"  onClick={handleClick("/user/tasks")}>Tasks</button>
                    </li>
                </ul>
            }
        </div>
    );
};

export default Sidebar;
