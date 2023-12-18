"use client";

import axios from "axios";
import { useSnackbar } from "notistack";
import { useState, SyntheticEvent } from "react";

type SetBook = {
  setAddBookSuccess: (value: boolean) => void;
};
const AddBook = ({ setAddBookSuccess }: SetBook) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  //

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const api = "http://localhost:8001/api/books";
      const data = {
        title: title,
        author: author,
        publishYear: Number(publishYear),
      };
      await axios.post(api, data);
      enqueueSnackbar("success add book", { variant: "success" });
      console.log("success add book");

      // Jika berhasil, kosongkan state dan navigasi ulang
      setTitle("");
      setAuthor("");
      setPublishYear(0);
      setAddBookSuccess(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding book:", error);
      enqueueSnackbar("failed to add book", { variant: "error" });
    }
  };

  return (
    <div>
      <button
        onClick={handleModal}
        className="btn btn-neutral mb-5 text-white font-semibold"
      >
        Add Book
      </button>
      <div className={isOpen ? "modal modal-open " : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Book</h3>
          <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn text-white btn-success">
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
