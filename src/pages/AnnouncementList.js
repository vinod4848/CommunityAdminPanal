import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { Modal, Button, Table } from "antd";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAnnouncementId, setDeleteAnnouncementId] = useState(null);

  const handleDelete = (id) => {
    setDeleteAnnouncementId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${base_url}/announcements/${deleteAnnouncementId}`);
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter(
          (announcement) => announcement._id !== deleteAnnouncementId
        )
      );
    } catch (error) {
      console.error("Error deleting announcement:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${base_url}/announcements`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const columns = [
    {
      title: "Announcement Type",
      dataIndex: "announcementType",
      key: "announcementType",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Announcement" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button type="danger" onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h3 className="mb-4 title">Announcements Lis</h3>

      <Table dataSource={announcements} columns={columns} />
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Announcement?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnnouncementList;
