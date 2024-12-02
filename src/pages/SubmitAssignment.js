import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';

function SubmitAssignment() {
    const { assignmentId } = useParams(); // Fetch assignmentId from URL
    const [studentUsername, setStudentUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [file, setFile] = useState(null); // Store the file object
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const validateUsername = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8888/api/users/${username}`);
            if (response.status === 200) {
                setIsUsernameValid(true);
            } else {
                setIsUsernameValid(false);
            }
        } catch (error) {
            setIsUsernameValid(false);
        }
    };

    const handleUsernameChange = (e) => {
        const username = e.target.value;
        setStudentUsername(username);
        setIsUsernameValid(null); // Reset validity during typing

        if (username) {
            validateUsername(username);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file to submit.');
            return;
        }

        setIsSubmitting(true);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <StudentNavbar />
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
                        onChange={handleUsernameChange}
                        required
                    />
                    {isUsernameValid === false && (
                        <p style={{ color: 'red' }}>Username is invalid or does not exist.</p>
                    )}
                    {isUsernameValid === true && (
                        <p style={{ color: 'green' }}>Username is valid.</p>
                    )}
                </div>
                <div>
                    <label>File</label>
                    <input
                        type="file"
                        onChange={handleFileChange} // Handle file selection
                        required
                    />
                </div>

                <button type="submit" disabled={!isUsernameValid || isSubmitting}>
                    Submit Assignment
                </button>
            </form>
        </div>
    );
}

export default SubmitAssignment;
