import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Space, Spin, Alert } from "antd";
import moment from "moment";
import { base_url } from "../utils/base_url";

const UserListV1 = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/getAllUsers`);
        const data = response.data;
        setUsers(data.users);
      } catch (error) {
        console.error(error);
        setError("Error fetching user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const showUserProfile = async (record) => {
    try {
      setModalLoading(true);
      const response = await axios.get(`${base_url}/findById/${record._id}`);
      const userData = response.data;
      setSelectedUser(userData);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      setError("Error fetching user profile. Please try again later.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const formattedCreatedAt = (date) => moment(date).format("YYYY-MM-DD");

  const userProfileData =
    selectedUser && selectedUser.userProfile
      ? Object.entries(selectedUser.userProfile)
          .map(([field, value]) => {
            if (typeof value === "object") {
              return Object.entries(value).map(([subfield, subvalue]) => ({
                key: `${field}.${subfield}`,
                field: `${field}.${subfield}`,
                value: subvalue,
              }));
            }

            return {
              key: field,
              field,
              value,
            };
          })
          .flat()
          .filter((item) => item.field !== "__v" && item.field !== "createdAt")
          .filter((item) => item.field !== "userId" && item.field !== "_id")
          .map((item) => ({
            ...item,
            value:
              item.field === "dateOfBirth"
                ? moment(item.value).format("YYYY-MM-DD")
                : item.value,
          }))
          .sort((a, b) => {
            if (a.field === "url") return -1;
            if (b.field === "url") return 1;
            return 0;
          })
      : [];

  const userProfileColumns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value, record) =>
        record.field === "url" ? (
          <img src={value} alt="Profile" style={{ maxWidth: "50%" }} />
        ) : (
          value
        ),
    },
  ];

  const userColumns = [
    {
      title: "SN",
      dataIndex: "",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "MembershipId",
      dataIndex: "membershipId",
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
    },
    {
      title: "Signin Date",
      dataIndex: "createdAt",
      render: formattedCreatedAt,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_, record) => (
        <Button onClick={() => showUserProfile(record)}>View Profile</Button>
      ),
    },
  ];

  return (
    <div className="user-list-container">
      <h1>User Lists</h1>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        <Table dataSource={users} columns={userColumns} />
      )}

      <Modal
        title="User Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Space direction="vertical">
          {modalLoading ? (
            <Spin size="large" />
          ) : userProfileData.length > 0 ? (
            <Table
              dataSource={userProfileData}
              columns={userProfileColumns}
              pagination={false}
            />
          ) : (
            <p>No profile information available.</p>
          )}
        </Space>
      </Modal>
    </div>
  );
};

export default UserListV1;
