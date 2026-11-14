import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import api from "../api/axiosConfig";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await api.get("/student");
      setStudents(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load students. Check your server connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Email</th>
          <th>Enrollment Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.student_id}>
            <td>{student.student_id}</td>
            <td>
              {student.first_name} {student.last_name}
            </td>
            <td>{student.email}</td>
            <td>{new Date(student.enrollment_date).toLocaleDateString()}</td>
            <td>
              <Button variant="outline-primary" size="sm">
                <MdEdit />
              </Button>
            </td>
          </tr>
        ))}

        {students.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center">
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default StudentTable;
