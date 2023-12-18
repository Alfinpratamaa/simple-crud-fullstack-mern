import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import router from "./routes/routesBooks.js";
import { Book } from "./models/BookModels.js";

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
app.delete("/deleteAll", async (req, res) => {
  try {
    // Tahun-tahun yang ingin dihapus
    const deleteResult = await Book.deleteMany({
      publishYear: { $gte: 1813 },
    });

    return res.status(200).json({
      message: "Books deleted successfully",
      deleteResult,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error woi" });
  }
});

app.listen(PORT, () => console.log(`Server running😁😁😁😁`));
connectDB(DB_URL);
