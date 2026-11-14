import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import api from "../api/axiosConfig";

const CourseTable = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/course");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Course Code</th>
          <th>Course Title</th>
          <th>Credits</th>
          <th>Teacher</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {courses.map((course) => (
          <tr key={course.course_id}>
            <td>{course.course_id}</td>
            <td>{course.course_code}</td>
            <td>{course.title}</td>
            <td>{course.credits}</td>
            <td>{course.teacher_id}</td>
            <td>
              <Button variant="outline-primary" size="sm">
                <MdEdit />
              </Button>
            </td>
          </tr>
        ))}

        {courses.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center">
              No courses found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CourseTable;
