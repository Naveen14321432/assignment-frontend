// src/components/UserLogin.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', loginData);
      alert(response.data.message);
      if (response.data.role === 'admin') {
        navigate('/register');
      } else if (response.data.role === 'student') {
        navigate('/student-dashboard');
      } else if (response.data.role === 'teacher') {
        navigate('/teacher-dashboard');
      }
      
      // Store user data in localStorage for authentication
      localStorage.setItem('user', JSON.stringify(response.data));

    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
