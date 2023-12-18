"use client";
import Spinner from "./components/spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import AddBook from "./components/addBook";
import DeleteBook from "./components/deleteBook";
import EditBook from "./components/editBook";
import { SnackbarProvider } from "notistack";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addBookSuccess, setAddBookSuccess] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:8001/api/books")
      .then((response) => {
        setBooks(response.data.data);
        setIsLoading(false);
        console.log(response.data);
        setAddBookSuccess(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  }, [addBookSuccess]);

  return (
    <SnackbarProvider>
      <main className={`relative ${isLoading ? "backdrop-blur-10" : ""}`}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-full px-20 py-10">
            <AddBook setAddBookSuccess={setAddBookSuccess} />
            <div className="overflow-x-auto">
              <table className="table">
                {/* tablehead */}
                <thead className="bg-gray-200 text-black">
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publish Year</th>
                    <th className="flex justify-center">Action</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {books.map((book, index) => (
                    <tr key={book._id}>
                      <td>{index + 1}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publishYear}</td>
                      <td className="flex justify-center gap-3">
                        <EditBook
                          book={book}
                          setAddBookSuccess={setAddBookSuccess}
                        />
                        <DeleteBook
                          book={book}
                          setAddBookSuccess={setAddBookSuccess}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </SnackbarProvider>
  );
}
