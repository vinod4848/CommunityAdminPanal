import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    address: "",
    category: "",
    date: "",
    image: null,
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (eventId) {
          const response = await axios.get(`${base_url}/events/${eventId}`);
          const { title, description, address, category, date } = response.data;
          setEvent({
            title,
            description,
            address,
            category,
            date: new Date(date).toISOString().split("T")[0],
            image: null,
          });
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

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
      let response;

      if (eventId) {
        response = await axios.put(`${base_url}/events/${eventId}`, {
          title: event.title,
          description: event.description,
          address: event.address,
          category: event.category,
          date: event.date,
        });

        console.log("Event updated successfully");
        toast.success("Event updated successfully!");
      } else {

        response = await axios.post(`${base_url}/events`, {
          title: event.title,
          description: event.description,
          address: event.address,
          category: event.category,
          date: event.date,
        });

        console.log("Event added successfully");
        toast.success("Event added successfully!");
      }
      if (response.data._id && event.image) {
        const formData = new FormData();
        formData.append("image", event.image);

        await axios.post(
          `${base_url}/uploadImage/event/${response.data._id}`,
          formData
        );
      }

      navigate("/admin/event-list");
    } catch (error) {
      console.error("Error adding/updating event:", error);
      toast.error("Error adding/updating event. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>{eventId ? "Edit Event" : "Add Event"}</h1>
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
