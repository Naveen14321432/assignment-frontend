import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateAssignment() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [teacherUsername, setTeacherUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const assignmentData = {
            title,
            description,
            dueDate,
            teacherUsername, 
        };

        try {
            const response = await axios.post('http://localhost:8888/api/assignments', assignmentData);
            alert("Assignment created successfully!!");
            console.log('Assignment created:', response.data); 
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    return (
        <div>
            <div className="navbar">
                <h1>Teacher Dashboard</h1>
                <div className="navbar-links">
                    <Link to="/create-assignment" className="navbar-link">Create Assignment</Link>
                    <Link to="/grade" className="navbar-link">Give Grade</Link>
                    <Link to="/submissions-by-assignment" className="navbar-link">View Submissions</Link>
                    <Link to="/" className="navbar-link">Logout</Link>
                </div>
            </div>
            <h2>Create Assignment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Teacher Username</label>
                    <input
                        type="text"
                        value={teacherUsername}
                        onChange={(e) => setTeacherUsername(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Create Assignment</button>
            </form>
        </div>
    );
}

export default CreateAssignment;
