import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/userLogin.css';

const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888';

const UserLogin = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_API_URL}/api/users/login`, loginData);

      alert(response.data.message);

      if (response.data.role === 'admin') {
        navigate('/register');
      } else if (response.data.role === 'student') {
        sessionStorage.setItem('studentId', response.data.studentId);
        console.log("Stored studentId:", sessionStorage.getItem('studentId'));
        navigate('/student-dashboard');
      } else if (response.data.role === 'teacher') {
        navigate('/teacher-dashboard');
      }

      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      alert("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="username"
          className="login-input"
          placeholder="Username"
          onChange={handleChange}
          value={loginData.username}
        />
        <input
          name="password"
          className="login-input"
          placeholder="Password"
          onChange={handleChange}
          value={loginData.password}
          type="password"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
