const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");

// POST: Create a teacher
router.post("/new", async (req, res) => {
  try {
    const { first_name, last_name, email, department } = req.body;

    const teacher = await Teacher.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      department: department,
    });

    res.status(201).json({
      message: "Teacher created successfully.",
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve teachers." });
  }
});

// GET: Retrieve a teacher by teacher_id
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve teacher." });
  }
});

// PUT: Update a teacher
router.put("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    const { first_name, last_name, email, department } = req.body;

    await teacher.update({
      first_name: first_name,
      last_name: last_name,
      email: email,
      department: department,
    });

    res.status(200).json({
      message: "Teacher updated successfully.",
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a teacher
router.delete("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found.",
      });
    }

    await teacher.destroy();

    res.status(200).json({
      message: "Teacher deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
