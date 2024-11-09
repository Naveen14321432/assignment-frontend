// src/components/DeleteUser.js
import React, { useState } from 'react';
import { deleteUser } from '../services/UserService';

const DeleteUser = () => {
  const [username, setUsername] = useState('');

  const handleDelete = async () => {
    try {
      await deleteUser(username);
      alert("User deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting user.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteUser;
