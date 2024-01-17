import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${base_url}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/properties/${propertyToDelete}`
      );
      if (response.status === 200) {
        message.success("Property deleted successfully");
        // Update the property list after deletion
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyToDelete
        );
        setProperties(updatedProperties);
        setDeleteModalVisible(false);
        setPropertyToDelete(null);
      } else {
        message.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      message.error("Failed to delete property");
    }
  };

  const showDeleteModal = (propertyId) => {
    setDeleteModalVisible(true);
    setPropertyToDelete(propertyId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPropertyToDelete(null);
  };

  const columns = [
    {
      title: "Post By",
      dataIndex: "username",
    },
    {
      title: "Ad Title",
      dataIndex: "adTitle",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Facing",
      dataIndex: "facing",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Property Type",
      dataIndex: "propertyType",
    },
    {
      title: "Construction Status",
      dataIndex: "constructionStatus",
    },
    {
      title: "Furnishing",
      dataIndex: "furnishing",
    },
    {
      title: "Super Builtup Area (sq.ft)",
      dataIndex: "superBuiltupArea",
    },
    {
      title: "Carpet Area (sq.ft)",
      dataIndex: "carpetArea",
    },
    {
      title: "Bathrooms",
      dataIndex: "bathrooms",
    },
    {
      title: "Maintenance Monthly",
      dataIndex: "maintenanceMonthly",
    },
    {
      title: "Total Floors",
      dataIndex: "totalFloors",
    },
    {
      title: "Floor No",
      dataIndex: "floorNo",
    },
    {
      title: "Car Parking",
      dataIndex: "carParking",
    },

    {
      title: "Images",
      dataIndex: "image",
      render: (image, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.isArray(image) ? (
            image.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${record.key + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                }}
              />
            ))
          ) : (
            <p>No image available</p>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => showDeleteModal(record._id)}
            type="text"
            danger
          >
            <AiFillDelete />
          </Button>
          <Link
            to={`/admin/property/${record._id}`}
            className="fs-3 text-danger"
          >
            <Button type="text">
              <BiEdit />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const data = properties.map((property, index) => ({
    key: index,
    ...property,
    username: property.userId.username,
  }));

  return (
    <div>
      <h2>Property List</h2>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this property?</p>
      </Modal>
    </div>
  );
};

export default PropertyList;
