import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";

const { Option } = Select;

const LandsPlotsList = () => {
  const [properties, setproperties] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [PropertiesToDelete, setPropertiesToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        const response = await axios.get(`${base_url}/properties`);
        setproperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchLandPlots();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/properties/${PropertiesToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        const updatedLandPlots = properties.filter(
          (Propertie) => Propertie._id !== PropertiesToDelete
        );
        setproperties(updatedLandPlots);
        setDeleteModalVisible(false);
        setPropertiesToDelete(null);
      } else {
        message.error("Failed to delete Propertie");
      }
    } catch (error) {
      console.error("Error deleting properties:", error);
      message.error("Failed to delete properties");
    }
  };

  const showDeleteModal = (PropertieId) => {
    setDeleteModalVisible(true);
    setPropertiesToDelete(PropertieId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPropertiesToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(`${base_url}/properties/${record._id}`, {
        isActive: !record.isActive,
      });
      if (response.status === 200) {
        message.success(
          `Land & Plots ${
            record.isActive ? "deactivated" : "activated"
          } successfully`
        );
        const updatedLandPlots = properties.map((Propertie) =>
          Propertie._id === record._id
            ? { ...Propertie, isActive: !record.isActive }
            : Propertie
        );
        setproperties(updatedLandPlots);
      } else {
        message.error("Failed to toggle Land & Plots activation status");
      }
    } catch (error) {
      console.error("Error toggling Land & Plots activation status:", error);
      message.error("Failed to toggle Land & Plots activation status");
    }
  };

  const columns = [
    {
      title: "Post By",
      dataIndex: "firstName",
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
      title: "Furnishing",
      dataIndex: "furnishing",
    },
    {
      title: "Builtup Area (sq.ft)",
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
          {/* <Link
            to={`/admin/property/${record._id}`}
            className="fs-3 text-danger"
          >
            <Button type="text">
              <BiEdit />
            </Button>
          </Link> */}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <Button type="primary" onClick={() => handleToggleActive(record)}>
          {isActive ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  const data = properties
    .filter((Propertie) => {
      if (filterValue === "all") {
        return true;
      } else {
        return Propertie.isActive === (filterValue === "true");
      }
    })
    .map((Propertie, index) => ({
      key: index,
      ...Propertie,
      firstName: Propertie.profileId.firstName,
    }));

  return (
    <div>
      <h2>Properties</h2>
      <Select
        defaultValue="all"
        style={{ width: 120, marginBottom: 16 }}
        onChange={handleFilterChange}
      >
        <Option value="all">Show All</Option>
        <Option value="true">Show Active</Option>
        <Option value="false">Show Inactive</Option>
      </Select>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this Propertie?</p>
      </Modal>
    </div>
  );
};

export default LandsPlotsList;
