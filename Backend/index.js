import "./config/env.js";

import express from "express";
import cors from "cors";

import studentRoute from "./routes/studentRoutes.js";
import companyRoute from "./routes/companyRoute.js";
import { connectDB } from "./config/db.js";


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use('/student', studentRoute);
app.use('/company', companyRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`);
});