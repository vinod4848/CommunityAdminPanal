import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteADirectorie,
  getDirectorie,
} from "../features/directory/directorySlice";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
  },
  {
    title: "Company Logo",
    dataIndex: "companyLogo",
    render: (companyLogo) => (
      <img src={companyLogo} alt="EventBanner" style={{ maxWidth: "100px" }} />
    ),
  },

  {
    title: "Company Email",
    dataIndex: "companyEmail",
  },

  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  {
    title: "GST Number",
    dataIndex: "gstNumber",
  },
  {
    title: "Website",
    dataIndex: "website",
  },
  {
    title: "Locality",
    dataIndex: "locality",
  },
  {
    title: "Business Area",
    dataIndex: "businessArea",
  },

  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Address",
    dataIndex: "address",
  },

  // {
  //   title: "Established Date",
  //   dataIndex: "establishedDate",
  //   render: (establishedDate) => moment(establishedDate).format("YYYY-MM-DD"),
  // },
  // {
  //   title: "Social Media Links",
  //   dataIndex: "socialMediaLinks",
  //   render: (socialMediaLinks) => (
  //     <span>
  //       Facebook: {socialMediaLinks.facebook}, Twitter:{" "}
  //       {socialMediaLinks.twitter}, LinkedIn: {socialMediaLinks.linkedin}
  //     </span>
  //   ),
  // },
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
      gstNumber: directorie.gstNumber,
      address: directorie.address,
      description: directorie.description,
      companyName: directorie.companyName,
      // establishedDate: directorie.establishedDate,
      socialMediaLinks: directorie.socialMediaLinks,
      tags: directorie.tags,
      locality: directorie.locality,
      website: directorie.website,
      businessArea: directorie.businessArea,
      contactNumber: directorie.contactNumber,
      companyLogo: directorie.companyLogo,
      companyEmail: directorie.companyEmail,
      action: (
        <>
          {/* <Link
            to={`/admin/directorie/${directorie._id}`}
            className="ms-1 fs-4 text-danger"
          >
            <BiEdit />
          </Link> */}
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
      <h3 className="mb-4 title">Directory</h3>
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
