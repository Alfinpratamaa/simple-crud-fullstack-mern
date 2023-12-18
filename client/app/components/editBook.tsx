import axios from "axios";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useSnackbar } from "notistack";
interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}
const EditBook = ({
  book,
  setAddBookSuccess,
}: {
  book: Book;
  setAddBookSuccess: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishYear, setPublishYear] = useState(book.publishYear);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleEdit = async () => {
    try {
      const api = `http://localhost:8001/api/books/${book._id}`;
      const data = {
        title: title,
        author: author,
        publishYear: Number(publishYear),
      };
      await axios.patch(api, data);
      enqueueSnackbar("Success edit book", {
        variant: "success",
      });
      console.log("success edit book");

      // Jika berhasil, kosongkan state dan navigasi ulang
      setTitle("");
      setAuthor("");
      setPublishYear(0);
      setAddBookSuccess(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding book:", error);
      enqueueSnackbar("failed to edit book", { variant: "error" });
      // setAddBookSuccess(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleModal}
        className="btn btn-success btn-sm mb-5 text-white font-semibold"
      >
        <CiEdit />
      </button>
      <div className={isOpen ? "modal modal-open " : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Book</h3>
          <form>
            <div className="form-control w-full">
              <label className="label font-bold">Book Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="input title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Book Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="input Author of book"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Publish year</label>
              <input
                type="number"
                value={publishYear === 0 ? "" : publishYear.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  setPublishYear(value === "" ? 0 : Number(value));
                }}
                placeholder="input publish year"
                className="input input-bordered"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                cancel
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="btn text-white btn-success"
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
