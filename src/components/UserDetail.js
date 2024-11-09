// src/components/UserDetail.js
import React, { useState } from 'react';
import { getUserByUsername } from '../services/UserService';

const UserDetail = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await getUserByUsername(username);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert("User not found.");
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
      <button onClick={handleSearch}>Search</button>
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Department: {user.department}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
