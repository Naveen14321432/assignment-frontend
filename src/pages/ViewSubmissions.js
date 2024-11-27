import React, { useEffect, useState } from "react";
import "../assets/css/viewsubmissions.css";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  // Fetch submissions from the backend
  useEffect(() => {
    fetch("/api/submissions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }
        return response.json();
      })
      .then((data) => setSubmissions(data))
      .catch((error) => console.error("Error fetching submissions:", error));
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1>View Submissions</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Submission ID</th>
            <th>Assignment ID</th>
            <th>Student Username</th>
            <th>Submission Date</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
        {submissions.map((submission) => {
  const fileUrl = submission.fileUrl ? `http://localhost:8888/uploads/${submission.fileUrl}` : '#';
  return (
    <tr key={submission.id}>
      <td>{submission.id}</td>
      <td>{submission.assignmentId}</td>
      <td>{submission.studentUsername}</td>
      <td>{new Date(submission.submissionDate).toLocaleString()}</td>
      <td>
        {submission.fileUrl ? (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        ) : (
          'No file available'
        )}
      </td>
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSubmissions;