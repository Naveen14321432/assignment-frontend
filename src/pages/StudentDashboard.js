// src/pages/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/student.css';

const StudentDashboard = () => {
    return (
        <>
            <div className="navbar">
                <h1>Student Dashboard</h1>
                <div className="navbar-links">
                    <Link to="/view-assignments" className="navbar-link">View Assignments</Link>
                    <Link to="/view-submissions" className="navbar-link">My Submissions</Link>
                    <Link to="/my-grades" className="navbar-link">View Grades</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            </div>
            <div className="main-content">
                <h2>Welcome to the Student Dashboard!</h2>
                <p>Here you can view assignments, submit your work, and check your grades.</p>
            </div>
        </>
    );
};

export default StudentDashboard;
