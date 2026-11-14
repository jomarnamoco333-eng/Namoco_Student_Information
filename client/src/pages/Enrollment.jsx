import CrudPage from "../components/CrudPage";

const Enrollment = () => {
  return (
    <CrudPage
      title="Enrollment"
      endpoint="enrollment"
      idField="enrollment_id"
      fields={[
        { name: "student_id", label: "Student ID", type: "number" },
        { name: "course_id", label: "Course ID", type: "number" },
        { name: "semester", label: "Semester" },
        { name: "year", label: "Year", type: "number" },
      ]}
      searchFields={["student_id", "course_id", "semester", "year"]}
    />
  );
};

export default Enrollment;
