import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";

const { Option } = Select;

const AccessoriesList = () => {
  const [accessories, setFurniture] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [PhoneToDelete, setPhoneToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await axios.get(`${base_url}/accessories`);
        setFurniture(response.data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchPhone();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/accessories/${PhoneToDelete._id}`
      );
      if (response.status === 200) {
        message.success("Phone deleted successfully");
        const upadtePhone = accessories.filter(
          (item) => item._id !== PhoneToDelete._id
        );
        setFurniture(upadtePhone);
        setDeleteModalVisible(false);
        setPhoneToDelete(null);
      } else {
        message.error("Failed to delete accessories");
      }
    } catch (error) {
      console.error("Error deleting accessories:", error);
      message.error("Failed to delete accessories");
    }
  };

  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setPhoneToDelete(record);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPhoneToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(`${base_url}/accessories/${record._id}`, {
        isActive: !record.isActive,
      });
      if (response.status === 200) {
        message.success(
          `Phone ${
            record.isActive ? "deactivated" : "activated"
          } successfully`
        );
        const upadtePhone = accessories.map((item) =>
          item._id === record._id
            ? { ...item, isActive: !record.isActive }
            : item
        );
        setFurniture(upadtePhone);
      } else {
        message.error("Failed to toggle accessories activation status");
      }
    } catch (error) {
      console.error("Error toggling accessories activation status:", error);
      message.error("Failed to toggle accessories activation status");
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
      dataIndex: "firstName", // Assuming you have "firstName" in your data
    },
    {
      title: "Ad Title",
      dataIndex: "adTitle",
    },
    {
      title: "Type",
      dataIndex: "type",
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
          {images && (
            <Image
              src={images}
              alt="Accessory Image"
              style={{ width: "40px", height: "40px", marginBottom: "8px" }}
            />
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

  const data = accessories
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
      <h2>Accessories List</h2>
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
        <p>Are you sure you want to delete this accessories item?</p>
      </Modal>
    </div>
  );
};

export default AccessoriesList;
