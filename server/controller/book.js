import { Book } from "../models/BookModels.js";
const createBook = async (req, res) => {
  try {
    if (req.body.title && req.body.author && req.body.publishYear) {
      // Menambahkan satu buku
      const data = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      const book = await Book.create(data);

      return res
        .status(201)
        .json({ message: "Book added successfully", bookData: book });
    } else if (req.body.books && Array.isArray(req.body.books)) {
      // Menambahkan beberapa buku sekaligus
      const booksData = req.body.books.map((book) => ({
        title: book.title,
        author: book.author,
        publishYear: book.publishYear,
      }));

      const insertedBooks = await Book.insertMany(booksData);

      return res.status(201).json({
        message: "Books added successfully",
        booksData: insertedBooks,
      });
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllbook = async (_, res) => {
  try {
    const books = await Book.find();

    return res
      .status(200)
      .json({ message: `All books`, count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: `get a book`, data: book });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const { id } = req.params;
    const bookUpdate = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!bookUpdate) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully", data: bookUpdate });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookDelete = await Book.findByIdAndDelete(id);

    if (!bookDelete) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book deleted successfully", data: bookDelete });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export { createBook, getAllbook, getBookById, deleteBook, updateBook };
