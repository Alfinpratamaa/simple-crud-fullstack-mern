import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSnackbar } from "notistack";
interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

const DeleteBook = ({
  book,
  setAddBookSuccess,
}: {
  book: Book;
  setAddBookSuccess: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async (id: string) => {
    try {
      const api = `http://localhost:8001/api/books/${id}`;
      await axios.delete(api);
      enqueueSnackbar("Success Deleted A book", { variant: "success" });
      console.log("success delete book");
      setAddBookSuccess(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Error delete book:", error);
      enqueueSnackbar("failed to delete a book", { variant: "error" });
    }
  };

  return (
    <div>
      <button
        onClick={handleModal}
        className="btn btn-error btn-sm mb-5 text-white font-semibold"
      >
        <RiDeleteBin6Line />
      </button>
      <div className={isOpen ? "modal modal-open " : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            are you sure to delete {book.title}
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete(book._id);
              }}
              className="btn text-white btn-success"
            >
              yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
