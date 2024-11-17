import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AssignmentList() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:8888/api/assignments/sorted');
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error.response ? error.response.data : error.message);
            }
        };
    
        fetchAssignments();
    }, []);    

    return (
        <div>
            <div className="navbar-links">
                    <Link to="/create-assignment" className="navbar-link">Create Assignment</Link>
                    <Link to="/grade" className="navbar-link">Give Grade</Link>
                    <Link to="/view-assignments" className="navbar-link">View Assignments</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            <h2>Assignments</h2>
            <ul className="assignment-list">
                {assignments.map((assignment) => (
                    <li key={assignment.id}>
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                        <p><strong>Assigned By:</strong> {assignment.teacherUsername}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AssignmentList;
