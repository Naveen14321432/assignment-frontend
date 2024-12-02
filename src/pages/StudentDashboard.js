// src/pages/StudentDashboard.js
import React from 'react';
import '../assets/css/student.css';
import StudentNavbar from './StudentNavbar';

const StudentDashboard = () => {
    return (
        <>
            <StudentNavbar />
            <div className="main-content">
                <h2>Welcome to the Student Dashboard!</h2>
                <p>Here you can view assignments, submit your work, and check your grades.</p>
            </div>
        </>
    );
};

export default StudentDashboard;
