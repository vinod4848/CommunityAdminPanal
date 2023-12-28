import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddBlog = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const blogResponse = await axios.post(`${base_url}/blogs`, {
        title: blog.title,
        description: blog.description,
      });

      const blogId = blogResponse.data._id;

      const formData = new FormData();
      formData.append("image", blog.image);

      await axios.post(
        `${base_url}/uploadImage/blogs/${blogId}`,
        formData
      );

      console.log("Blog and image added successfully");

      toast.success("Blog and image added successfully!");

      navigate("/admin/blog-list");
    } catch (error) {
      console.error("Error adding blog:", error);

      toast.error("Error adding blog. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={blog.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={blog.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
