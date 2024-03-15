import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";

const { Option } = Select;

const ShopOfficeList = () => {
  const [shopOffices, setPgGuestHouses] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pgGuestHousesToDelete, setPgGuestHousesToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const fetchPgGuestHouses = async () => {
      try {
        const response = await axios.get(`${base_url}/shopOffices`);
        setPgGuestHouses(response.data);
      } catch (error) {
        console.error("Error fetching shopOffices:", error);
      }
    };

    fetchPgGuestHouses();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/shopOffices/${pgGuestHousesToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        const updatedPgGuestHouses = shopOffices.filter(
          (pgGuestHouse) => pgGuestHouse._id !== pgGuestHousesToDelete
        );
        setPgGuestHouses(updatedPgGuestHouses);
        setDeleteModalVisible(false);
        setPgGuestHousesToDelete(null);
      } else {
        message.error("Failed to delete shopOffices");
      }
    } catch (error) {
      console.error("Error deleting shopOffices:", error);
      message.error("Failed to delete shopOffices");
    }
  };

  const showDeleteModal = (landPlotId) => {
    setDeleteModalVisible(true);
    setPgGuestHousesToDelete(landPlotId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPgGuestHousesToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(
        `${base_url}/shopOffices/${record._id}`,
        {
          isActive: !record.isActive,
        }
      );
      if (response.status === 200) {
        message.success(
          `shops & Offices ${
            record.isActive ? "deactivated" : "activated"
          } successfully`
        );
        const updatedPgGuestHouses = shopOffices.map((pgGuestHouse) =>
          pgGuestHouse._id === record._id
            ? { ...pgGuestHouse, isActive: !record.isActive }
            : pgGuestHouse
        );
        setPgGuestHouses(updatedPgGuestHouses);
      } else {
        message.error("Failed to toggle shops & Offices activation status");
      }
    } catch (error) {
      console.error("Error toggling shops & Offices activation status:", error);
      message.error("Failed to toggle shops & Offices activation status");
    }
  };
  const columns = [
    {
      title: "SN",
      dataIndex: "",
      render: (_, record, index) => index + 1,
    },
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
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Landmark",
      dataIndex: "landmark",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Property type",
      dataIndex: "shopOfficeType",
    },
    {
      title: "carpetArea",
      dataIndex: "carpetArea",
    },
    {
      title: "maintenance",
      dataIndex: "maintenance",
    },
    {
      title: "carParking",
      dataIndex: "carParking",
    },
    {
      title: "washrooms",
      dataIndex: "washrooms",
    },
    {
      title: "furnishing",
      dataIndex: "furnishing",
    },
    {
      title: "Images",
      dataIndex: "images",
      render: (images, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.isArray(images) ? (
            images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Property ${record.key + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                }}
              />
            ))
          ) : (
            <p>No images available</p>
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
            to={`/admin/shopOffices/${record._id}`}
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

  const data = shopOffices
    .filter((pgGuestHouse) => {
      if (filterValue === "all") {
        return true;
      } else {
        return pgGuestHouse.isActive === (filterValue === "true");
      }
    })
    .map((pgGuestHouse, index) => ({
      key: index,
      ...pgGuestHouse,
      firstName: pgGuestHouse.profileId.firstName,
    }));

  return (
    <div>
      <h2>Shops & Office</h2>
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
        <p>Are you sure you want to delete this Shops & Office?</p>
      </Modal>
    </div>
  );
};

export default ShopOfficeList;
