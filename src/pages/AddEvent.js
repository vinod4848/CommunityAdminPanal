import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddEvent = () => {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    address: "",
    category: "",
    date: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adResponse = await axios.post(`${base_url}/events`, {
        title: event.title,
        description: event.description,
        address: event.address,
        category: event.category,
        date: event.date,
      });

      const adId = adResponse.data._id;

      const formData = new FormData();
      formData.append("image", event.image);

      await axios.post(`${base_url}/uploadImage/event/${adId}`, formData);

      console.log("Event and image added successfully");

      toast.success("Event and image added successfully!");

      navigate("/admin/event-list");
    } catch (error) {
      console.error("Error adding event:", error);

      toast.error("Error adding event. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={event.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={event.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={event.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={event.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={event.date}
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
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
