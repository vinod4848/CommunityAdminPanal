import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddUser = () => {
  const navigate = useNavigate();

  const [userdata, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}user/signup`, userdata);
      console.log("User Added Successfully:", response.data);

      toast.success("User Added Successfully!");

      navigate("/admin/customers");
    } catch (error) {
      console.error("Error Adding User:", error);

      toast.error("Error Adding User. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={userdata.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label> Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={userdata.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label> Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={userdata.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            className="form-control"
            value={userdata.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
