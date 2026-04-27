import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());   // parse JSON data
app.use(cors());           // allow frontend requests


// Routes-------------------------------
import UserRoutes from "./routes/user.routes.js"



// API routes
app.use("/api/v1/users", UserRoutes);




// Test route
app.get("/", (req, res) => {
  res.send("HireHub API running 🚀");
});

export default app;