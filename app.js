import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./utils/errorHandler.util.js";
import startServer from "./config/server.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", routes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Server is up and running!");
});

// Global Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
startServer();

export default app;
