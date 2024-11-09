// src/components/UpdateUser.js
import React, { useState } from 'react';
import { updateUser } from '../services/UserService';

const UpdateUser = () => {
  const [username, setUsername] = useState('');
  const [userDTO, setUserDTO] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
  });

  const handleChange = (e) => {
    setUserDTO({ ...userDTO, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(username, userDTO);
      alert("User updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="department" placeholder="Department" onChange={handleChange} />
      <input name="role" placeholder="Role" onChange={handleChange} />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
