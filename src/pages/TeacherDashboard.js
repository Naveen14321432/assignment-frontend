// src/pages/TeacherDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/teacher.css';

const TeacherDashboard = () => {
    return (
        <>
            <div className="navbar">
                <h1>Teacher Dashboard</h1>
                <div className="navbar-links">
                    <Link to="/create-assignment" className="navbar-link">Create Assignment</Link>
                    <Link to="/grade" className="navbar-link">Give Grade</Link>
                    <Link to="/view-submissions" className="navbar-link">View Submissions</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            </div>
            <div className="main-content">
                <h2>Welcome to the Teacher Dashboard!</h2>
                <p>Here you can create assignments, manage submissions, and grade students' work.</p>
            </div>
        </>
    );
};

export default TeacherDashboard;
