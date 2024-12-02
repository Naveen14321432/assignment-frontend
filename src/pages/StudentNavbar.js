// src/pages/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/student.css';

const StudentNavbar = () => {
    return (
        <>
            <div className="navbar">
                <h1>Student Dashboard</h1>
                <div className="navbar-links">
                    <Link to="/view-assignments" className="navbar-link">View Assignments</Link>
                    <Link to="/my-grades" className="navbar-link">View Grades</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            </div>
        </>
    );
};

export default StudentNavbar;
