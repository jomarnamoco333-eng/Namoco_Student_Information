const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());

// Import routes
const courseRoutes = require("./routes/course");
const enrollmentRoutes = require("./routes/enrollment");
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teacher");

// Home route
app.get("/", (req, res) => {
  res.send("Student Information System API is running!");
});

// API routes
app.use("/api/course", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

// Connect to MySQL and start server
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("MySQL connected successfully.");

    await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();