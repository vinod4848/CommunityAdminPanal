import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
// import { BiEdit } from "react-icons/bi";
// import { Link } from "react-router-dom";

const LandsPlotsList = () => {
  const [landPlots, setLandPlots] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [landPlotsToDelete, setLandPlotsToDelete] = useState(null);

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        const response = await axios.get(`${base_url}/landPlots`);
        setLandPlots(response.data);
      } catch (error) {
        console.error("Error fetching landPlots:", error);
      }
    };

    fetchLandPlots();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/landPlots/${landPlotsToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        // Update the landPlots list after deletion
        const updatedLandPlots = landPlots.filter(
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
      title: "Property Type",
      dataIndex: "type",
    },
    {
      title: "Images",
      dataIndex: "image",
      render: (image, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.isArray(image) ? (
            image.map((img, index) => (
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
            to={`/admin/landPlots/${record._id}`}
            className="fs-3 text-danger"
          >
            <Button type="text">
              <BiEdit />
            </Button>
          </Link> */}
        </div>
      ),
    },
  ];

  const data = landPlots.map((landPlot, index) => ({
    key: index,
    ...landPlot,
    firstName: landPlot.profileId.firstName,
  }));

  return (
    <div>
      <h2>Lands & Plots</h2>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this land plot?</p>
      </Modal>
    </div>
  );
};

export default LandsPlotsList;
