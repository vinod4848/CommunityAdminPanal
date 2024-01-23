import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Table } from "antd";

const UserListV1 = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${base_url}/getAllUsers`);
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
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
  ];

  return (
    <div>
      <h1>User Lists</h1>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default UserListV1;
