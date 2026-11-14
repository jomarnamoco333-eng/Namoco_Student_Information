import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import api from "../api/axiosConfig";

const EnrollmentTable = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.get("/enrollment");
        setEnrollments(response.data);
      } catch (error) {
        console.error("Failed to load enrollments:", error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Student ID</th>
          <th>Course ID</th>
          <th>Semester</th>
          <th>Year</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {enrollments.map((enrollment) => (
          <tr key={enrollment.enrollment_id}>
            <td>{enrollment.enrollment_id}</td>
            <td>{enrollment.student_id}</td>
            <td>{enrollment.course_id}</td>
            <td>{enrollment.semester}</td>
            <td>{enrollment.year}</td>
            <td>
              <Button variant="outline-primary" size="sm">
                <MdEdit />
              </Button>
            </td>
          </tr>
        ))}

        {enrollments.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center">
              No enrollments found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default EnrollmentTable;
