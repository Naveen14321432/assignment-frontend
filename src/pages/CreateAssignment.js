import React, { useState } from 'react';
import axios from 'axios';
import TeacherNavbar from './TeacherNavbar';

function CreateAssignment() {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [teacherUsername, setTeacherUsername] = useState('');
    const [file, setFile] = useState(null); // New state for file

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('dueDate', dueDate);
        formData.append('teacherUsername', teacherUsername);
        if (file) formData.append('file', file); // Append the file

        try {
            const response = await axios.post('http://localhost:8888/api/assignments', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file upload
                },
            });
            alert("Assignment created successfully!!");
            console.log('Assignment created:', response.data);
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    return (
        <div>
            <TeacherNavbar />
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
                <div>
                    <label>Upload File</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit">Create Assignment</button>
            </form>
        </div>
    );
}

export default CreateAssignment;
