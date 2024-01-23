import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { Table, Image, Space, Button, Modal, message } from "antd";

const LandPlotList = () => {
  const [furniture, setFashion] = useState([]);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    const fetchFashion = async () => {
      try {
        const response = await axios.get(`${base_url}/furniture`);
        const data = response.data;
        setFashion(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFashion();
  }, []);

  const handleDelete = async () => {
    try {
      if (deleteRecord) {
        await axios.delete(`${base_url}/furniture/${deleteRecord._id}`);
        message.success("Fashion item deleted successfully");
        // Refresh the furniture list after deletion
        setFashion((prevFashion) =>
          prevFashion.filter((item) => item._id !== deleteRecord._id)
        );
        setDeleteRecord(null);
        setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to delete furniture item");
      setDeleteRecord(null);
      setIsDeleteModalVisible(false);
    }
  };

  const showModal = (record) => {
    setDeleteRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setDeleteRecord(null);
    setIsDeleteModalVisible(false);
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
      title: "adTitle",
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
            onClick={() => showModal(record)}
            danger
            icon={<AiFillDelete style={{ color: "#da3838" }} />}
          />
          <Modal
            title="Confirm Delete"
            visible={isDeleteModalVisible}
            onOk={handleDelete}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <p>Are you sure you want to delete this furniture item?</p>
          </Modal>
        </>
      ),
    },
  ];

  const data = furniture.map((fashionItem, index) => ({
    key: index,
    ...fashionItem,
    firstName: fashionItem.profileId.firstName,
  }));

  return (
    <div>
      <h1>Furniture List</h1>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default LandPlotList;
