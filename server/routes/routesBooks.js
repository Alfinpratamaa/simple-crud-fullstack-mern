import express from "express";
import {
  createBook,
  deleteBook,
  getAllbook,
  getBookById,
  updateBook,
} from "../controller/book.js";

const router = express.Router();

// create new data book
router.post("/", createBook);

// get all books data
router.get("/", getAllbook);
// get single book data by id
router.get("/:id", getBookById);

router.patch("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
