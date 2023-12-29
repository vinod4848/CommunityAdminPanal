import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { base_url } from "../utils/base_url";

const AddBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

  const initialBlogState = {
    title: "",
    description: EditorState.createEmpty(),
    category: "",
    image: "", 
  };

  const [blog, setBlog] = useState(initialBlogState);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (blogId) {
          const response = await axios.get(`${base_url}/blogs/${blogId}`);
          const blogData = response.data;

          setBlog({
            title: blogData.title,
            description: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(blogData.description)
              )
            ),
            category: blogData.category,
            image: blogData.image || "", 
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (editorState) => {
    setBlog((prevBlog) => ({ ...prevBlog, description: editorState }));
  };

  const handleFormReset = () => {
    setBlog(initialBlogState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contentState = blog.description.getCurrentContent();
      const rawContentState = convertToRaw(contentState);

      if (blogId) {
        await axios.put(`${base_url}/blogs/${blogId}`, {
          title: blog.title,
          description: draftToHtml(rawContentState),
          category: blog.category,
          image: blog.image,
        });

        console.log("Blog updated successfully");
        toast.success("Blog updated successfully!");
      } else {
        const blogResponse = await axios.post(`${base_url}/blogs`, {
          title: blog.title,
          description: draftToHtml(rawContentState),
          category: blog.category,
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
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <Editor
            editorState={blog.description}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor custom-editor-class" 
            onEditorStateChange={handleChange}
            editorStyle={{
              backgroundColor: "white", 
              height: "130px", 
              border:"2px",
              // eslint-disable-next-line no-dupe-keys
              border: "1px solid #ccc",
            }}
          />
          </div>
        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={blog.category}
            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={(e) => setBlog({ ...blog, image: e.target.files[0] })}
          />
        </div>
        {blogId && blog.image !== null && (
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
