import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteADirectorie,
  getDirectorie,
} from "../features/directory/directorySlice";
import { Link } from "react-router-dom";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "FirstName",
    dataIndex: "firstName",
  },
  {
    title: "LastName",
    dataIndex: "lastName",
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
    title: "Company Name",
    dataIndex: "companyName",
  },
  {
    title: "Established Date",
    dataIndex: "establishedDate",
    render: (establishedDate) => moment(establishedDate).format("YYYY-MM-DD"),
  },
  {
    title: "Social Media Links",
    dataIndex: "socialMediaLinks",
    render: (socialMediaLinks) => (
      <span>
        Facebook: {socialMediaLinks.facebook}, Twitter:{" "}
        {socialMediaLinks.twitter}, LinkedIn: {socialMediaLinks.linkedin}
      </span>
    ),
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: (tags) => <span>{tags.join(", ")}</span>,
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Directorielist = () => {
  const [directorieId, setdirectorieId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDirectorie());
  }, [dispatch]);
  const directorieState = useSelector((state) => state.directorie.directories);

  const transformDirectorieData = () => {
    return directorieState.map((directorie, index) => ({
      key: index + 1,
      name: directorie.name,
      firstName: directorie.firstName,
      lastName: directorie.lastName,
      address: directorie.address,
      description: directorie.description,
      companyName: directorie.companyName,
      establishedDate: directorie.establishedDate,
      socialMediaLinks: directorie.socialMediaLinks,
      tags: directorie.tags,
      phone: directorie.userId.phone,
      email: directorie.userId.email,
      action: (
        <>
          <Link
            to={`/admin/directorie/${directorie._id}`}
            className="ms-1 fs-4 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className=" fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(directorie._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    }));
  };

  const showModal = (directorieId) => {
    setOpen(true);
    setdirectorieId(directorieId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deletedirectorie = (directorieId) => {
    dispatch(deleteADirectorie(directorieId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getDirectorie());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Directorie</h3>
      <div>
        <Table columns={columns} dataSource={transformDirectorieData()} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deletedirectorie(directorieId);
        }}
        title="Are you sure you want to delete this Directorie"
      />
    </div>
  );
};

export default Directorielist;
