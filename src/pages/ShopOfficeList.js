import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const ShopOfficeList = () => {
  const [shopOffices, setLandPlots] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [landPlotsToDelete, setLandPlotsToDelete] = useState(null);

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        const response = await axios.get(`${base_url}/shopOffices`);
        setLandPlots(response.data);
      } catch (error) {
        console.error("Error fetching shopOffices:", error);
      }
    };

    fetchLandPlots();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/shopOffices/${landPlotsToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        // Update the shopOffices list after deletion
        const updatedLandPlots = shopOffices.filter(
          (landPlot) => landPlot._id !== landPlotsToDelete
        );
        setLandPlots(updatedLandPlots);
        setDeleteModalVisible(false);
        setLandPlotsToDelete(null);
      } else {
        message.error("Failed to delete land plot");
      }
    } catch (error) {
      console.error("Error deleting land plot:", error);
      message.error("Failed to delete land plot");
    }
  };

  const showDeleteModal = (landPlotId) => {
    setDeleteModalVisible(true);
    setLandPlotsToDelete(landPlotId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setLandPlotsToDelete(null);
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
          <Link
            to={`/admin/shopOffices/${record._id}`}
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

  const data = shopOffices.map((landPlot, index) => ({
    key: index,
    ...landPlot,
    username: landPlot.userId.username,
  }));

  return (
    <div>
      <h2>Shop & Office List</h2>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this shop Offices?</p>
      </Modal>
    </div>
  );
};

export default ShopOfficeList;
