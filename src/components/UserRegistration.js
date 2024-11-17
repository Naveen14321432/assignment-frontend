import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { registerUser } from '../services/UserService';
import './UserRegistration.css';

const UserRegistration = () => {
  const [userDTO, setUserDTO] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    department: '',
    role: '',
  });

  const departments = [
    { value: 'cse', label: 'CSE' },
    { value: 'csit', label: 'CSIT' },
    { value: 'ece', label: 'ECE' },
    { value: 'aids', label: 'AIDS' },
    { value: 'eee', label: 'EEE' },
    { value: 'civil', label: 'Civil' },
    { value: 'mech', label: 'Mech' },
  ];

  const roles = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
  ];

  const handleChange = (e) => {
    setUserDTO({ ...userDTO, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userDTO);
      if (response && typeof response === 'object' && response.status === 201) {
        alert('User registered successfully!');
      } else if (typeof response === 'string') {
        alert(response);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert('Username or Email already exists. Please choose another.');
        } else {
          alert('Error registering user.');
        }
      } else {
        alert('Error registering user.');
      }
    }
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-link">Logout</Link>
      </nav>

      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input name="password" placeholder="Password" onChange={handleChange} type="password" required />

          <div className="radio-group">
            <label>Department:</label>
            <select name="department" onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option value={dept.value} key={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          <div className="radio-group">
            <label>Role:</label>
            <select name="role" onChange={handleChange}>
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option value={role.value} key={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
