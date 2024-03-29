import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";

const { Option } = Select;

const BikeList = () => {
  const [bikes, setFurniture] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [BikeToDelete, setBikeToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await axios.get(`${base_url}/bikes`);
        setFurniture(response.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchPhone();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/bikes/${BikeToDelete._id}`
      );
      if (response.status === 200) {
        message.success("Bikes deleted successfully");
        const upadteBike = bikes.filter(
          (item) => item._id !== BikeToDelete._id
        );
        setFurniture(upadteBike);
        setDeleteModalVisible(false);
        setBikeToDelete(null);
      } else {
        message.error("Failed to delete bikes");
      }
    } catch (error) {
      console.error("Error deleting bikes:", error);
      message.error("Failed to delete bikes");
    }
  };

  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setBikeToDelete(record);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setBikeToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(`${base_url}/bikes/${record._id}`, {
        isActive: !record.isActive,
      });
      if (response.status === 200) {
        message.success(
          `Bikes ${record.isActive ? "deactivated" : "activated"} successfully`
        );
        const upadteBike = bikes.map((item) =>
          item._id === record._id
            ? { ...item, isActive: !record.isActive }
            : item
        );
        setFurniture(upadteBike);
      } else {
        message.error("Failed to toggle bikes activation status");
      }
    } catch (error) {
      console.error("Error toggling bikes activation status:", error);
      message.error("Failed to toggle bikes activation status");
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
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: " Bike Number",
      dataIndex: "number",
    },
    {
      title: "Km Driven",
      dataIndex: "kmDriven",
    },
    {
      title: "Number of Owners",
      dataIndex: "numberOfOwners",
    },
    {
      title: "Price",
      dataIndex: "price",
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
      title: "Images",
      dataIndex: "images",
      render: (images) => (
        <Space size={[8, 8]} wrap>
          {images && images.length > 0 ? (
            images.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                style={{ width: "40px", height: "40px", marginBottom: "8px" }}
              />
            ))
          ) : (
            <span>No images</span>
          )}
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => showDeleteModal(record)}
          danger
          icon={<AiFillDelete style={{ color: "#da3838" }} />}
        />
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

  const data = bikes
    .filter((item) => {
      if (filterValue === "all") {
        return true;
      } else {
        return item.isActive === (filterValue === "true");
      }
    })
    .map((item, index) => ({
      key: index,
      ...item,
      firstName: item.profileId.firstName,
    }));

  return (
    <div>
      <h2>Bikes List</h2>
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
        <p>Are you sure you want to delete this bikes item?</p>
      </Modal>
    </div>
  );
};

export default BikeList;
