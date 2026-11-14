import CrudPage from "../components/CrudPage";

const Course = () => {
  return (
    <CrudPage
      title="Course"
      endpoint="course"
      idField="course_id"
      fields={[
        { name: "course_code", label: "Course Code" },
        { name: "title", label: "Course Title" },
        { name: "credits", label: "Credits", type: "number" },
        { name: "teacher_id", label: "Teacher ID", type: "number" },
      ]}
      searchFields={["course_code", "title", "teacher_id"]}
    />
  );
};

export default Course;
