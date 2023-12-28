import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

  const initialBlogState = {
    title: "",
    description: "",
    image: null,
  };

  const [blog, setBlog] = useState(initialBlogState);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (blogId) {
          const response = await axios.get(`${base_url}/blogs/${blogId}`);
          setBlog(response.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleFormReset = () => {
    setBlog(initialBlogState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (blogId) {
        await axios.put(`${base_url}/blogs/${blogId}`, {
          title: blog.title,
          description: blog.description,
          image: blog.image,
        });

        console.log("Blog updated successfully");
        toast.success("Blog updated successfully!");
      } else {
        const blogResponse = await axios.post(`${base_url}/blogs`, {
          title: blog.title,
          description: blog.description,
        });

        const newBlogId = blogResponse.data._id;

        const formData = new FormData();
        formData.append("image", blog.image);

        await axios.post(
          `${base_url}/uploadImage/blogs/${newBlogId}`,
          formData
        );

        console.log("New blog and image added successfully");
        toast.success("New blog and image added successfully!");
      }
      handleFormReset();

      navigate("/admin/blog-list");
    } catch (error) {
      console.error("Error adding/updating blog:", error);
      toast.error("Error adding/updating blog. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>{blogId ? "Edit Blog" : "Add Blog"}</h1>
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
        {blogId && blog.image && (
          <div>
            <label>Current Blog Image:</label>
            <img
              src={blog.image}
              alt="Current Blog"
              style={{ maxWidth: "100px" }}
            />
          </div>
        )}

        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            {blogId ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
