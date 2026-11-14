const express = require("express");
const router = express.Router();
const { Student } = require("../models");

// POST: Create a student
router.post("/new", async (req, res) => {
  try {
    const { first_name, last_name, email, enrollment_date } = req.body;

    const student = await Student.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      enrollment_date: enrollment_date,
    });

    res.status(201).json({
      message: "Student created successfully.",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve students." });
  }
});

// GET: Retrieve a student by student_id
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve student." });
  }
});

// PUT: Update a student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const { first_name, last_name, email, enrollment_date } = req.body;

    await student.update({
      first_name: first_name,
      last_name: last_name,
      email: email,
      enrollment_date: enrollment_date,
    });

    res.status(200).json({
      message: "Student updated successfully.",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a student

// DELETE: Delete a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    const { Enrollment } = require("../models");

    const enrollmentCount = await Enrollment.count({
      where: { student_id: student.student_id },
    });

    if (enrollmentCount > 0) {
      return res.status(400).json({
        message:
          "Cannot delete this student because they have existing enrollments. Delete their enrollments first.",
      });
    }

    await student.destroy();

    return res.status(200).json({
      message: "Student deleted successfully.",
    });
  } catch (error) {
    console.error("Delete student error:", error);

    return res.status(500).json({
      message: "Failed to delete student.",
    });
  }
});

module.exports = router;
