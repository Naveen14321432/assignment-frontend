import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SubmitAssignment() {
    const [assignmentId, setAssignmentId] = useState('');
    const [studentUsername, setStudentUsername] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submissionData = {
            assignmentId,
            studentUsername,
            fileUrl, 
        };

        try {
            const response = await axios.post('http://localhost:8888/api/submissions', submissionData);
            console.log('Assignment submitted:', response.data);
            alert('Assignment submitted successfully!');
        } catch (error) {
            console.error('Error submitting assignment:', error);
            alert('Failed to submit the assignment. Please try again.');
        }
    };

    return (
        <div>
            <div className="navbar">
                <h1>Student Dashboard</h1>
                <div className="navbar-links">
                    <Link to="/submit-assignment" className="navbar-link">Submit Assignment</Link>
                    <Link to="/view-grades" className="navbar-link">View Grades</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            </div>
            <h2>Submit Assignment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Assignment ID</label>
                    <input
                        type="text"
                        value={assignmentId}
                        onChange={(e) => setAssignmentId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Student Username</label>
                    <input
                        type="text"
                        value={studentUsername}
                        onChange={(e) => setStudentUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>File URL</label>
                    <input
                        type="text"
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Submit Assignment</button>
            </form>
        </div>
    );
}

export default SubmitAssignment;
