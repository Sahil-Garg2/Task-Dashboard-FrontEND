// components/UserList.js
import React, { useRef} from 'react';
import axios from 'axios'
import { useTask } from '../context/TaskContext';
import { ModalDialog } from './Modal';
import { useAuth } from '../context/AuthContext';

const TaskList = ({isUser=false}) => {
    const { tasks } = useTask();
    const { user } = useAuth();
    const categories = user?.categories??[];
    const modalRef = useRef();
    const checkAllCheckListISCompleted = (checklist) => { 
        return checklist.every(item=>item.status == 'completed');
    }
    const MarkTaskAsCompleted = async (taskId) => {
        if (!checkAllCheckListISCompleted(tasks.filter(item => item._id == taskId)[0].checklist)) {
            console.log('Please complete all the subtasks before marking the task as completed');
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.patch(`${import.meta.env.VITE_APP_API_URL}/api/tasks/update/` + taskId, { status: isUser ? 'in-progress' : 'completed' } ,{
                    headers: { Authorization: `Bearer ${token}` },
                });
                modalRef.current.show('success', 'Task marked as completed sucessfully');
                console.log('Task marked as completed', response.data);
            } catch (err) {
                modalRef.current.show('Error', 'Task marked as completed failed');
                console.error('Error fetching categories', err);
            }
        }

    }

    const MarkSubTaskAsCompleted = async (taskId, subTaskId) => { 
        let checklist = tasks.filter(item => item._id == taskId)[0].checklist;
        checklist = checklist.map(item => {
            if (item.id._id == subTaskId) {
                item.status = 'completed';
            }
            return item;
        });
        console.log(checklist);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.patch(`${import.meta.env.VITE_APP_API_URL}/api/tasks/subtask/update/` + taskId, { checklist: checklist }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Sub Task marked as completed', response.data);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        }
    }

    return (
        <div>
            <h2>Task List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">CheckList</th>
                        <th scope="col">Assigned To User</th>
                        <th scope='col'>Role</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((item) => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.checklist?.map(nestedItem=>{ 
                                return <span key={nestedItem.id._id}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={nestedItem.status == 'completed'} onChange={() => { MarkSubTaskAsCompleted(item._id, nestedItem.id._id) }} />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">{nestedItem.id.title}</label>
                                    </div>
                                    <span className='badge badge-success rounded-pill d-inline'>{nestedItem.status}</span></span>
                            })}</td>
                            <td>{item.assignedUser.username}</td>
                            <td>{item.assignedRole.name}</td>
                            <td>{item.category.name}</td>
                            <td>
                                {item.dependency && item.dependency.length <= item.currentDependencyNo ? 'Completed' : 'Pending With' +item.status?.name}
                                </td>
                            {item.dependency && item.dependency.length > item.currentDependencyNo && categories.some((category)=> category.category.name==item.category.name && category.assignedRole._id == item.status?._id) && <td><button type="button" className="btn btn-link btn-sm btn-rounded" onClick={() => { MarkTaskAsCompleted(item._id) }}>Mark as completed</button></td>}
                        </tr>
                    ))}
                    
                </tbody>
            </table>

            <ModalDialog ref={ modalRef} />
        </div>
    );
};

export default TaskList;
