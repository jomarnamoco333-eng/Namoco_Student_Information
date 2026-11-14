import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import TopNavigation from "./components/TopNavigation";
import Course from "./pages/Course";
import Student from "./pages/Student";
import Enrollment from "./pages/Enrollment";
import Teacher from "./pages/Teacher";

function App() {
  return (
    <BrowserRouter>
      <TopNavigation />

      <Routes>
        <Route path="/" element={<Navigate to="/Students" />} />
        <Route path="/Students" element={<Student />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Teacher" element={<Teacher />} />
        <Route path="/Enrollment" element={<Enrollment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
