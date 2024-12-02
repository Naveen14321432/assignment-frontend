import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/asslist.css';

function AssignmentList() {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:8888/api/assignments');
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error.response ? error.response.data : error.message);
            }
        };

        fetchAssignments();
    }, []);

    // Function to navigate to the submission page
    const handleSubmitClick = (assignmentId) => {
        navigate(`/submit-assignment/${assignmentId}`);
    };

    return (
        <div>
            <div className="navbar">
                <h1>Assignments</h1>
                <div className="navbar-links">
                    <Link to="/view-assignments" className="navbar-link">View Assignments</Link>
                    <Link to="/my-grades" className="navbar-link">View Grades</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            </div>
            <h2>All Assignments</h2>
            {assignments.length > 0 ? (
                <ul className="assignment-list">
                    {assignments.map((assignment) => {
                        const isExpired = new Date(assignment.dueDate) < new Date(); // Check if due date has passed
                        const fileUrl = `http://localhost:8888/uploads/${assignment.description}`; // Construct file URL

                        return (
                            <li key={assignment.id}>
                                <h3>{assignment.title}</h3>
                                <p>{assignment.description}</p>
                                <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                                <p><strong>Assigned By:</strong> {assignment.teacherUsername}</p>
                                <p>
                                    <strong>File:</strong>{' '}
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                        {assignment.description}
                                    </a>
                                </p>
                                {!isExpired && (
                                    <button
                                        className="submit-btn"
                                        onClick={() => handleSubmitClick(assignment.id)}
                                    >
                                        Submit
                                    </button>
                                )}
                                {isExpired && <p style={{ color: 'red' }}>Submission closed</p>}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No assignments found.</p>
            )}
        </div>
    );
}

export default AssignmentList;
