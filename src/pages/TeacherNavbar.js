// src/pages/TeacherDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/teacher.css';

const TeacherNavbar = () => {
    return (
        <>
            <div className="navbar">
                <h1>Teacher Dashboard</h1>
                <div className="navbar-links">
                    <Link to="/create-assignment" className="navbar-link">Create Assignment</Link>
                    <Link to="/view-submissions" className="navbar-link">View Submissions</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            </div>
        </>
    );
};

export default TeacherNavbar;
