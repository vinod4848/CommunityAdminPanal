import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";
const AddAdvertisement = () => {
  const navigate = useNavigate();

  const [advertisement, setAdvertisement] = useState({
    clientName: "",
    companyName: "",
    image: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvertisement((prevAd) => ({ ...prevAd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${base_url}/advertisements`,
        advertisement
      );
      console.log("Advertisement added successfully:", response.data);

      toast.success("Advertisement added successfully!");

      navigate("/admin/advertising-list");
    } catch (error) {
      console.error("Error adding advertisement:", error);

      toast.error("Error adding advertisement. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Advertisement</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            className="form-control"
            value={advertisement.clientName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Campaign Name:</label>
          <input
            type="text"
            name="companyName"
            className="form-control"
            value={advertisement.companyName}
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
            Add Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertisement;
