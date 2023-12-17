import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import router from "./routes/routesBooks.js";

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", router);

app.get("/test", (_, res) => {
  res.json({ message: "all good 😁" });
});

app.listen(PORT, () => console.log(`Server running😁😁😁😁`));
connectDB(DB_URL);
