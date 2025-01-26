import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Hello from server!");
});
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
