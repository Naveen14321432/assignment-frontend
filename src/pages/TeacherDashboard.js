// src/pages/TeacherDashboard.js
import React from 'react';
import '../assets/css/teacher.css';
import TeacherNavbar from './TeacherNavbar';

const TeacherDashboard = () => {
    return (
        <>
           <TeacherNavbar />
            <div className="main-content">
                <h2>Welcome to the Teacher Dashboard!</h2>
                <p>Here you can create assignments, manage submissions, and grade students' work.</p>
            </div>
        </>
    );
};

export default TeacherDashboard;
