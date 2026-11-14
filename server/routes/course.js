const express = require("express");
const router = express.Router();
const { Course, Teacher } = require("../models");

// POST: Create a course
router.post("/new", async (req, res) => {
  try {
    const { course_code, title, credits, teacher_id } = req.body;

    const course = await Course.create({
      course_code: course_code,
      title: title,
      credits: credits,
      teacher_id: teacher_id,
    });

    res.status(201).json({
      message: "New course created successfully.",
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: Teacher,
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve courses." });
  }
});

// PUT: Update a course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const { course_code, title, credits, teacher_id } = req.body;

    await course.update({
      course_code: course_code,
      title: title,
      credits: credits,
      teacher_id: teacher_id,
    });

    res.status(200).json({
      message: "Course updated successfully.",
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }

    await course.destroy();

    res.status(200).json({
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
