import React, { useEffect, useState } from "react";
import "../assets/css/viewsubmissions.css";
import TeacherNavbar from "./TeacherNavbar";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [tempGrade, setTempGrade] = useState({}); // Temporary state for storing grades

  useEffect(() => {
    // Fetch submissions from backend (grades included)
    fetch("/api/submissions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }
        return response.json();
      })
      .then((data) => setSubmissions(data)) // Save the fetched data (including grades) to state
      .catch((error) => console.error("Error fetching submissions:", error));
  }, []);

  const handleGradeChange = (submissionId, grade) => {
    // Update the temporary grade state for specific submission
    setTempGrade((prev) => ({
      ...prev,
      [submissionId]: grade,
    }));
  };

  const handleGradeSubmission = (submissionId) => {
    const grade = tempGrade[submissionId];
    if (!grade) {
      alert("Please enter a grade before submitting.");
      return;
    }

    // Submit the grade to the backend
    fetch(`/api/submissions/${submissionId}/grade`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grade }), // Send grade as JSON to backend
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to grade submission");
        }
        return response.json();
      })
      .then((updatedSubmission) => {
        // Once the grade is submitted, update the submission in the state
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub.id === updatedSubmission.id ? updatedSubmission : sub
          )
        );
        // Clear the temporary grade state after submission
        setTempGrade((prev) => {
          const updatedTempGrade = { ...prev };
          delete updatedTempGrade[submissionId]; // Remove the graded submission from temp state
          return updatedTempGrade;
        });
      })
      .catch((error) => console.error("Error grading submission:", error));
  };

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
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => {
            const fileUrl = submission.fileUrl
              ? `http://localhost:8888/uploads/${submission.fileUrl}`
              : "#";
            return (
              <tr key={submission.id} className={submission.grade ? "graded" : ""}>
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
                    "No file available"
                  )}
                </td>
                <td>
                  {submission.grade ? (
                    <span>Graded: {submission.grade}</span> // Display grade with the message
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Grade"
                        value={tempGrade[submission.id] || ""} // Use the temporary grade if not yet submitted
                        onChange={(e) =>
                          handleGradeChange(submission.id, e.target.value)
                        }
                      />
                      <button onClick={() => handleGradeSubmission(submission.id)}>
                        Grade
                      </button>
                    </>
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
