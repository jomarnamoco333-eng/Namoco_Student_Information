const express = require("express");
const router = express.Router();
const { Enrollment } = require("../models");

// POST: Create an enrollment
router.post("/new", async (req, res) => {
  try {
    const { student_id, course_id, semester, year } = req.body;

    const enrollment = await Enrollment.create({
      student_id: student_id,
      course_id: course_id,
      semester: semester,
      year: year,
    });

    res.status(201).json({
      message: "Enrollment created successfully.",
      enrollment,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all enrollments
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: require("../models").Student,
          attributes: ["first_name", "last_name"],
        },
        {
          model: require("../models").Course,
          attributes: ["title"],
        },
      ],
    });

    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve enrollments." });
  }
});

// GET: Retrieve an enrollment by enrollment_id
router.get("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found.",
      });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve enrollment." });
  }
});

// PUT: Update an enrollment
router.put("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found.",
      });
    }

    const { student_id, course_id, semester, year } = req.body;

    await enrollment.update({
      student_id: student_id,
      course_id: course_id,
      semester: semester,
      year: year,
    });

    res.status(200).json({
      message: "Enrollment updated successfully.",
      enrollment,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete an enrollment
router.delete("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found.",
      });
    }

    await enrollment.destroy();

    res.status(200).json({
      message: "Enrollment deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
