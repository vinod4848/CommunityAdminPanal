import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddNews = () => {
  const navigate = useNavigate();
  const [news, setJob] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({ ...prevJob, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/news`, news);
      console.log("Job added successfully:", response.data);
      toast.success("Job added successfully!");
      navigate("/admin/news-list");
    } catch (error) {
      console.error("Error adding news:", error);

      toast.error("Error adding news. Please try again.");
    }
  };
  <ToastContainer position="top-center" autoClose={3000} hideProgressBar />;
  return (
    <div className="container mt-5">
      <h1>Add News</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={news.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={news.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={news.tags}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Content:</label>
          <textarea
            name="content"
            className="form-control"
            value={news.content}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            value={news.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-success border-0 rounde-3 my-5 form-control"
          >
            Add News
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNews;
