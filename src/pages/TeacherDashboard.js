import React from 'react';
import '../assets/css/teacher.css';

const TeacherDashboard = () => {
    return (
        <>
        <div className="navbar">
            <h1>Teacher Dashboard</h1>
            <div className="navbar-links">
                <a href="#assignments" className="navbar-link">Create Assignments</a>
                <a href="#submissions" className="navbar-link">View Submissions</a>
                <a href="#grades" className="navbar-link">Grade Assignments</a>
                <a href="/" className="navbar-link">Logout</a>
            </div>
        </div>
        <div className="main-content">
            <h2>Welcome to the teacher dashboard!</h2>
            <p>Here you can create assignments, grade assignments and view students submissions.</p>
        </div>
    </>
    );
};

export default TeacherDashboard;
