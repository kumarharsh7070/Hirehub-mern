import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());   // parse JSON data
app.use(cors());           // allow frontend requests


// Routes-------------------------------
import UserRoutes from "./routes/user.routes.js"
import JobRoutes from "./routes/job.routes.js"
import applicationRoutes from "./routes/application.routes.js";
import savedjobRoutes  from "./routes/savedjob.routes.js"
// API routes
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/jobs", JobRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/saved-jobs", savedjobRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("HireHub API running 🚀");
});

export default app;