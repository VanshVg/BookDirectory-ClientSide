import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/addbook.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";

export const Editbook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    genre: [],
    pages: "",
    isbn: "",
    price: "",
    image: null,
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://book-directory-api-tkvh.onrender.com/api/showbook/${id}`)
      .then((resp) => {
        const book = resp.data.book;
        setBookData({
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          pages: book.pages,
          isbn: book.isbn,
          price: book.price,
          image: null,
        });
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const genres = value.split(",").map((genre) => genre.trim());

      setBookData({ ...bookData, [name]: genres });
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    setBookData({ ...bookData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    formData.append("description", bookData.description);
    formData.append("pages", bookData.pages);
    formData.append("isbn", bookData.isbn);
    formData.append("price", bookData.price);
    formData.append("image", bookData.image);

    bookData.genre.forEach((genre, index) => {
      formData.append(`genre[${index}]`, genre);
    });

    try {
      await axios.put(
        `https://book-directory-api-tkvh.onrender.com/api/updatebook/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Book updated successfully!");
      toast.success("Book updated successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        className: "toast-message",
      });
    } catch (error) {
      console.log("Error updating book:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-book-container">
        <h1>Edit Book</h1>
        <form
          className="add-book-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={bookData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              value={bookData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={bookData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="genre">
              Genre (Separate multiple genres with commas)
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              value={
                bookData.genre ? Object.values(bookData.genre).join(", ") : ""
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pages">Pages</label>
            <input
              type="number"
              name="pages"
              id="pages"
              value={bookData.pages}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              name="isbn"
              id="isbn"
              value={bookData.isbn}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={bookData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <button type="submit" className="custom-button">
            Edit Book
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};
