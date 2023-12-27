import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddDirectory = () => {
  const navigate = useNavigate();
  const [directorydata, setDirectory] = useState({
    userId: "657949178e2b5917b09975cb",
    name: "",
    firstName: "",
    lastName: "",
    address: "",
    description: "",
    companyName: "",
    establishedDate: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDirectory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setDirectory((prevData) => ({
      ...prevData,
      socialMediaLinks: {
        ...prevData.socialMediaLinks,
        [platform]: value,
      },
    }));
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    setDirectory((prevData) => ({
      ...prevData,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${base_url}/directories`,
        directorydata
      );
      console.log("Directory added successfully:", response.data);

      toast.success("Directory added successfully!");

      navigate("/admin/directory-list");
    } catch (error) {
      console.error("Error adding directory:", error);

      toast.error("Error adding directory. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Dateirectory</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label> Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={directorydata.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> First Name:</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={directorydata.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={directorydata.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Address: </label>

          <input
            type="text"
            name="address"
            className="form-control"
            value={directorydata.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Description:</label>

          <textarea
            name="description"
            className="form-control"
            value={directorydata.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Company Name:</label>

          <input
            type="text"
            name="companyName"
            className="form-control"
            value={directorydata.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Tags </label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={directorydata.tags.join(",")}
            onChange={handleTagsChange}
          />
        </div>
        <div className="mb-3">
          <label> Established Date: </label>

          <input
            type="date"
            name="establishedDate"
            className="form-control"
            value={directorydata.establishedDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Facebook: </label>

          <input
            type="text"
            name="facebook"
            className="form-control"
            value={directorydata.socialMediaLinks.facebook}
            onChange={(e) =>
              handleSocialMediaChange("facebook", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label> Twitter:</label>

          <input
            type="text"
            name="twitter"
            className="form-control"
            value={directorydata.socialMediaLinks.twitter}
            onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label> LinkedIn:</label>

          <input
            type="text"
            name="linkedin"
            className="form-control"
            value={directorydata.socialMediaLinks.linkedin}
            onChange={(e) =>
              handleSocialMediaChange("linkedin", e.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add Directory
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDirectory;
