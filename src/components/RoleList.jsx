// components/UserList.js
import React from 'react';
import { useUser } from '../context/UserContext';

const RoleList = ({ isCheckList }) => {
    let data = [];
    if (isCheckList) {
        const { checkList } = useUser();
        data = checkList;
    }
    else {
        const { roles } = useUser();
        data = roles;
    }
    


    return (
        <div>
            <h2>{isCheckList ? "CheckList Data" : "Role List"}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">{isCheckList ? "Title" : "Role"}</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key={item._id}>
                            <td>{isCheckList? item.title: item.name}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    );
};

export default RoleList;
