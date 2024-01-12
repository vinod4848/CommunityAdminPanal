import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddAnnouncementCategory = () => {
  const navigate = useNavigate();

  const [announcementCategory, setAnnouncementCategory] = useState({
    announcementCategoryName: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAnnouncementCategory((prevAnnouncementCategory) => ({
      ...prevAnnouncementCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${base_url}/announcement-categories`, {
        announcementCategoryName: announcementCategory.announcementCategoryName,
        date: announcementCategory.date,
      });
      console.log("Announcement category added successfully");
      toast.success("Announcement category added successfully!");
      navigate("/admin/announcementCategoryName-list");
    } catch (error) {
      console.error("Error adding announcement category:", error);
      toast.error("Error adding announcement category. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Announcement Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            name="announcementCategoryName"
            className="form-control"
            value={announcementCategory.announcementCategoryName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={announcementCategory.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add Announcement Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnnouncementCategory;
