import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/student-dashboard" element={<StudentDashboard />}/>
          <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
