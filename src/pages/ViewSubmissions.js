import React, { useEffect, useState } from "react";
import "../assets/css/viewsubmissions.css";
import TeacherNavbar from "./TeacherNavbar";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [tempGrade, setTempGrade] = useState({});

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

  const handleGradeChange = (submissionId, grade) => {
    // Restrict the grade input to A, B, C, D, F only
    if (["A", "B", "C", "D", "F"].includes(grade.toUpperCase())) {
      setTempGrade((prev) => ({
        ...prev,
        [submissionId]: grade.toUpperCase(),
      }));
    }
  };

  const handleGradeSubmission = (submissionId) => {
    const grade = tempGrade[submissionId];
    if (!grade) {
      alert("Please enter a grade before submitting.");
      return;
    }

    fetch(`/api/submissions/${submissionId}/grade`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grade }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to grade submission");
        }
        return response.json();
      })
      .then((updatedSubmission) => {
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub.id === updatedSubmission.id ? updatedSubmission : sub
          )
        );
        setTempGrade((prev) => {
          const updatedTempGrade = { ...prev };
          delete updatedTempGrade[submissionId]; // Remove the graded submission from temp state
          return updatedTempGrade;
        });
      })
      .catch((error) => console.error("Error grading submission:", error));
  };

  const getGradeClass = (grade) => {
    switch (grade) {
      case "A":
      case "B":
        return "grade-green"; // Green for A and B
      case "C":
      case "D":
        return "grade-yellow"; // Yellow for C and D
      case "F":
        return "grade-red"; // Red for F
      default:
        return "";
    }
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
              <tr
                key={submission.id}
                className={getGradeClass(submission.grade)}
              >
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
                    <span>Graded: {submission.grade}</span>
                  ) : (
                    <div className="grade-input-container">
                      <input
                        type="text"
                        placeholder="Grade"
                        value={tempGrade[submission.id] || ""}
                        onChange={(e) =>
                          handleGradeChange(submission.id, e.target.value)
                        }
                      />
                      <button
                        className="grade-button"
                        onClick={() => handleGradeSubmission(submission.id)}
                      >
                        Grade
                      </button>
                    </div>
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
