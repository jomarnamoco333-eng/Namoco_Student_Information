import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import api from "../api/axiosConfig";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teacher");
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to load teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Teacher Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher.teacher_id}>
            <td>{teacher.teacher_id}</td>
            <td>
              {teacher.first_name} {teacher.last_name}
            </td>
            <td>{teacher.email}</td>
            <td>{teacher.department}</td>
            <td>
              <Button variant="outline-primary" size="sm">
                <MdEdit />
              </Button>
            </td>
          </tr>
        ))}

        {teachers.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center">
              No teachers found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TeacherTable;
