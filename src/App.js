import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateAssignment from './pages/CreateAssignment';  
import SubmitAssignment from './pages/SubmitAssignment';
import AssignmentList from './pages/AssignmentList';
import ViewSubmissions from './pages/ViewSubmissions';
import MySubmissions from './pages/MySubmissions';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/create-assignment" element={<CreateAssignment />} />
        <Route path="/submit-assignment" element={<SubmitAssignment />} /> 
        <Route path="/submit-assignment/:assignmentId" element={<SubmitAssignment />} />
        <Route path="/view-assignments" element={<AssignmentList />} />
        <Route path="/view-submissions" element={<ViewSubmissions/>} />
        <Route path="/my-grades" element={<MySubmissions />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
