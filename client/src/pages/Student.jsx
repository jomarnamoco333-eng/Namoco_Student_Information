import CrudPage from "../components/CrudPage";

const Student = () => {
  return (
    <CrudPage
      title="Student"
      endpoint="student"
      idField="student_id"
      fields={[
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "email", label: "Email", type: "email" },
        {
          name: "enrollment_date",
          label: "Enrollment Date",
          type: "date",
        },
      ]}
      searchFields={["first_name", "last_name", "email"]}
    />
  );
};

export default Student;
