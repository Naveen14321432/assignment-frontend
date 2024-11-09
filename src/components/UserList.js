// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
