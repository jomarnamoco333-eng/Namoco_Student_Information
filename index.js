const express = require("express");
const db = require("./server/models");
const app = express();
const port = 3007;

// Middleware
app.use(express.json());

// Routes
const courseRoutes = require("./server/routes/course");
const enrollmentRoutes = require("./server/routes/enrollment");
const studentRoutes = require("./server/routes/students");
const teacherRoutes = require("./server/routes/teacher");

// Test route
app.get("/", (req, res) => {
  res.send("Student Information System API is running!");
});

// API endpoints
app.use("/api/course", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

// Connect to database and start server
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established.");

    await db.sequelize.sync();

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exitCode = 1;
  }
}

startServer();
