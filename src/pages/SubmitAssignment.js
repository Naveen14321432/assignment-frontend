import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function SubmitAssignment() {
    const { assignmentId } = useParams(); // Fetch assignmentId from URL
    const [studentUsername, setStudentUsername] = useState('');
    const [file, setFile] = useState(null); // Store the file object

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file to submit.');
            return;
        }

        const formData = new FormData();
        formData.append('assignmentId', assignmentId);
        formData.append('studentUsername', studentUsername);
        formData.append('file', file); // Append the file to the form data

        try {
            const response = await axios.post('http://localhost:8888/api/submissions/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set correct content type for file upload
                },
            });
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
                    <Link to="/view-assignments" className="navbar-link">View Assignments</Link>
                    <Link to="/submit-assignment" className="navbar-link">My Submissions</Link>
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
                        value={assignmentId || ''}
                        disabled // Prevent editing assignmentId
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
                    <label>File</label>
                    <input
                        type="file"
                        onChange={handleFileChange} // Handle file selection
                        required
                    />
                </div>

                <button type="submit">Submit Assignment</button>
            </form>
        </div>
    );
}

export default SubmitAssignment;
