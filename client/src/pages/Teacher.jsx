import CrudPage from "../components/CrudPage";

const Teacher = () => {
  return (
    <CrudPage
      title="Teacher"
      endpoint="teacher"
      idField="teacher_id"
      fields={[
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "email", label: "Email", type: "email" },
        { name: "department", label: "Department" },
      ]}
      searchFields={["first_name", "last_name", "email", "department"]}
    />
  );
};

export default Teacher;
