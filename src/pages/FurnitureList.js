import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";

const { Option } = Select;

const FurnitureList = () => {
  const [furniture, setFurniture] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [furnitureToDelete, setFurnitureToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await axios.get(`${base_url}/furniture`);
        setFurniture(response.data);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    fetchFurniture();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/furniture/${furnitureToDelete._id}`
      );
      if (response.status === 200) {
        message.success("Furniture deleted successfully");
        const updatedFurniture = furniture.filter(
          (item) => item._id !== furnitureToDelete._id
        );
        setFurniture(updatedFurniture);
        setDeleteModalVisible(false);
        setFurnitureToDelete(null);
      } else {
        message.error("Failed to delete furniture");
      }
    } catch (error) {
      console.error("Error deleting furniture:", error);
      message.error("Failed to delete furniture");
    }
  };

  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setFurnitureToDelete(record);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setFurnitureToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(
        `${base_url}/furniture/${record._id}`,
        {
          isActive: !record.isActive,
        }
      );
      if (response.status === 200) {
        message.success(
          `Furniture ${record.isActive ? "deactivated" : "activated"} successfully`
        );
        const updatedFurniture = furniture.map((item) =>
          item._id === record._id ? { ...item, isActive: !record.isActive } : item
        );
        setFurniture(updatedFurniture);
      } else {
        message.error("Failed to toggle furniture activation status");
      }
    } catch (error) {
      console.error("Error toggling furniture activation status:", error);
      message.error("Failed to toggle furniture activation status");
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
      title: "Used",
      dataIndex: "used",
    },
    {
      title: "Furniture Type",
      dataIndex: "furnitureType",
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
          {images.length > 0 ? (
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
        <>
          <Button
            type="danger"
            onClick={() => showDeleteModal(record)}
            danger
            icon={<AiFillDelete style={{ color: "#da3838" }} />}
          />
        </>
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

  const data = furniture
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
      <h2>Furniture List</h2>
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
        <p>Are you sure you want to delete this furniture item?</p>
      </Modal>
    </div>
  );
};

export default FurnitureList;
