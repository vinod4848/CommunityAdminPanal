import React, { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import { Modal, Button, Table, Image } from "react-bootstrap";
import axios from "axios";

const AnnouncementApprovalPendingList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    axios
      .get(`${base_url}/announcements`)
      .then((response) => setAnnouncements(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (announcementId) => {
    axios
      .delete(`${base_url}/announcements/${announcementId}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to delete announcement");
        }
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter(
            (announcement) => announcement._id !== announcementId
          )
        );
        handleCloseModal();
      })
      .catch((error) => console.error("Error deleting announcement:", error));
  };

  const handleShowModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
    setShowModal(false);
  };

  const handleActivate = (announcementId) => {
    axios
      .put(`${base_url}/updateAnnouncementStatus/${announcementId}`, {
        isActive: true,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to activate announcement");
        }
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.map((announcement) =>
            announcement._id === announcementId
              ? { ...announcement, isActive: true }
              : announcement
          )
        );
        handleCloseModal();
      })
      .catch((error) => console.error("Error activating announcement:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Announcements Approval Pending List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>CreatedBy</th>
            <th>Description</th>
            <th>Date</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {announcements
            .filter((announcement) => !announcement.isActive)
            .map((filteredAnnouncement) => (
              <tr key={filteredAnnouncement._id}>
                <td>{filteredAnnouncement.announcementType}</td>
                <td>{filteredAnnouncement.createdBy.username}</td>
                <td>{filteredAnnouncement.description}</td>
                <td>{filteredAnnouncement.date}</td>
                <td>
                  <Image
                    src={filteredAnnouncement.image}
                    alt="Announcement"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                    thumbnail
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    style={{ width: "83px", marginLeft: "5px" }}
                    onClick={() => handleShowModal(filteredAnnouncement)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    style={{ marginLeft: "5px", marginTop: "5px" }}
                    onClick={() => handleActivate(filteredAnnouncement._id)}
                  >
                    Activate
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the announcement?
          {selectedAnnouncement && (
            <p>
              Announcement Type: {selectedAnnouncement.announcementType}, Date:{" "}
              {selectedAnnouncement.date}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(selectedAnnouncement?._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnnouncementApprovalPendingList;
