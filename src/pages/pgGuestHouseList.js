import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
// import { BiEdit } from "react-icons/bi";
// import { Link } from "react-router-dom";

const PgGuestHouseList = () => {
  const [pgGuestHouses, setPgGuestHouses] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pgGuestHousesToDelete, setPgGuestHousesToDelete] = useState(null);

  useEffect(() => {
    const fetchPgGuestHouses = async () => {
      try {
        const response = await axios.get(`${base_url}/pgGuestHouses`);
        setPgGuestHouses(response.data);
      } catch (error) {
        console.error("Error fetching pgGuestHouses:", error);
      }
    };

    fetchPgGuestHouses();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/pgGuestHouses/${pgGuestHousesToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        const updatedPgGuestHouses = pgGuestHouses.filter(
          (pgGuestHouse) => pgGuestHouse._id !== pgGuestHousesToDelete
        );
        setPgGuestHouses(updatedPgGuestHouses);
        setDeleteModalVisible(false);
        setPgGuestHousesToDelete(null);
      } else {
        message.error("Failed to delete pgGuestHouses");
      }
    } catch (error) {
      console.error("Error deleting pgGuestHouses:", error);
      message.error("Failed to delete pgGuestHouses");
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

  const columns = [
    {
      title: "Post By",
      dataIndex: "firstName",
    },
    {
      title: "Property Type",
      dataIndex: "subtype",
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
      title: "Furnishing",
      dataIndex: "furnishing",
    },
    {
      title: "Car Parking",
      dataIndex: "carParking",
    },
    {
      title: "Meals Included",
      dataIndex: "mealsIncluded",
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
            to={`/admin/pgGuestHouses/${record._id}`}
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

  const data = pgGuestHouses.map((pgGuestHouse, index) => ({
    key: index,
    ...pgGuestHouse,
    firstName: pgGuestHouse.profileId.firstName,
  }));

  return (
    <div>
      <h2>PG & Guest Houses</h2>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this PG Guest House?</p>
      </Modal>
    </div>
  );
};

export default PgGuestHouseList;
