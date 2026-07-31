import "./config/env.js";

import express from "express";
import cors from "cors";

import studentRoute from "./routes/studentRoutes.js";
import companyRoute from "./routes/companyRoute.js";
import { connectDB } from "./config/db.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://placement-management-website.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, server-to-server, etc.)
      if (!origin) return callback(null, true);

      // Allow localhost
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow ALL Vercel preview deployments
      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("placement-management-website")
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/student", studentRoute);
app.use("/company", companyRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});