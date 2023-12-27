import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
      const nameA = String(a.name).toLowerCase();
      const nameB = String(b.name).toLowerCase();

      return nameA.localeCompare(nameB);
    },
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const UserListApprovalPending = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  let serialNumber = 0;
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = customerstate
    .filter((customer) => customer.role !== "admin" && !customer.isPublished)
    .map((customer) => ({
      key: ++serialNumber,
      name: customer.username,
      email: customer.email,
      mobile: customer.phone,
    }));

  return (
    <div className="container mt-4">
      <h3 className="mb-4 title">Users Approval Pending</h3>
      <div className="card">
        <div className="card-body">
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default UserListApprovalPending;
