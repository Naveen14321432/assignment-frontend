import React, { useEffect, useState } from "react";
import "../assets/css/viewsubmissions.css";
import TeacherNavbar from "./TeacherNavbar";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

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
  }, []); 

  return (
    <div>
      <TeacherNavbar />
      <center>
      <h1>View Submissions</h1>
      </center>
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
