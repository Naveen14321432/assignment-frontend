// src/pages/StudentDashboard.js
import React from 'react';
import '../assets/css/student.css';

const StudentDashboard = () => {
    return (
        <>
        <div className="navbar">
            <h1>Student Dashboard</h1>
            <div className="navbar-links">
                <a href="#assignments" className="navbar-link">View Assignments</a>
                <a href="#submissions" className="navbar-link">My Submissions</a>
                <a href="#grades" className="navbar-link">My Grades</a>
                <a href="/" className="navbar-link">Logout</a>
            </div>
        </div>
        <div className="main-content">
            <h2>Welcome to the student dashboard!</h2>
            <p>Here you can view assignments, submit your work, and check grades.</p>
        </div>
    </>
    );
};

export default StudentDashboard;
