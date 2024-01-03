import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatrimonial,
  deleteAMatrimonial,
} from "../features/matrimonial/matrimonialSlice";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
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
    title: "Gender",
    dataIndex: "gender",
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
    title: "DateOfBirth",
    dataIndex: "dateOfBirth",
    render: (deadline) => moment(deadline).format("YYYY-MM-DD"),
  },
  {
    title: "Profession",
    dataIndex: "profession",
  },
  {
    title: "Income",
    dataIndex: "income",
  },
  {
    title: "NativePlace",
    dataIndex: "nativePlace",
  },
  {
    title: "Height",
    dataIndex: "height",
  },
  
  {
    title: "Family",
    dataIndex: "family",
    render: (family) => (
      <span>
        {family ? (
          <>
            <strong>Father:</strong> {family.fatherName},{" "}
            <strong>Mother:</strong> {family.motherName},{" "}
            <strong>Brothers:</strong> {family.siblings.brothers},{" "}
            <strong>Sisters:</strong> {family.siblings.sisters}
          </>
        ) : (
          <strong>No family information available</strong>
        )}
      </span>
    ),
  },

  {
    title: "Address",
    dataIndex: "address",
    render: (address) => (
      <span>
        <strong>Street:</strong> {address.street}, <strong>City:</strong>{" "}
        {address.city}, <strong>State:</strong> {address.state},
        <strong>Country:</strong> {address.country},{" "}
        <strong>Postal Code:</strong> {address.postalCode}
      </span>
    ),
  },

  {
    title: "Education",
    dataIndex: "education",
    render: (education) => (
      <span>
        <strong>Degree:</strong> {education.degree},{" "}
        <strong>Institution:</strong> {education.institution},
        <strong>Completion Year:</strong> {education.completionYear}
      </span>
    ),
  },

  {
    title: "AboutMe",
    dataIndex: "aboutMe",
  },
  {
    title: "Hobbies",
    dataIndex: "hobbies",
    render: (hobbies) => (
      <span>{Array.isArray(hobbies) ? hobbies.join(", ") : ""}</span>
    ),
  },
  {
    title: "Created Date",
    dataIndex: "createdAt",
    render: (deadline) => moment(deadline).format("YYYY-MM-DD"),
  },

  {
    title: "Partner Preferences",
    dataIndex: "partnerPreferences",
    render: (partnerPreferences) => (
      <span className="partner-preferences">
        <strong>Age Range:</strong>{" "}
        {partnerPreferences && partnerPreferences.ageRange
          ? `${partnerPreferences.ageRange.min} - ${partnerPreferences.ageRange.max}`
          : "Not specified"}
        , <strong>Gender:</strong>{" "}
        {partnerPreferences && (partnerPreferences.gender || "Not specified")},{" "}
        <strong>Education:</strong>{" "}
        {partnerPreferences &&
          (partnerPreferences.education || "Not specified")}
        , <strong>Profession:</strong>{" "}
        {partnerPreferences &&
          (partnerPreferences.profession || "Not specified")}
        , <strong>Min Height:</strong>{" "}
        {partnerPreferences &&
          (partnerPreferences.minHeight || "Not specified")}
        , <strong>Max Income:</strong>{" "}
        {partnerPreferences &&
          (partnerPreferences.maxIncome || "Not specified")}
      </span>
    ),
  },

  {
    title: "Profile",
    dataIndex: "image",
    render: (image) => (
      <img src={image} alt="profileBanner" style={{ maxWidth: "100px" }} />
    ),
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Matrimoniallist = () => {
  const [matrimonialId, setmatrimonialId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatrimonial());
  }, [dispatch]);
  const matrimonialState = useSelector(
    (state) => state.matrimonial.matrimonials
  );

  const transformmatrimonialData = () => {
    return matrimonialState
      .filter((matrimonial) => matrimonial.isApproved) 
      .map((matrimonial, index) => ({
        key: index + 1,
        firstName: matrimonial.firstName,
        lastName: matrimonial.lastName,
        image: matrimonial.image,
        email: matrimonial.email,
        phone: matrimonial.phone,
        dateOfBirth: matrimonial.dateOfBirth,
        profession: matrimonial.profession,
        income: matrimonial.income,
        nativePlace: matrimonial.nativePlace,
        family: matrimonial.family,
        address: matrimonial.address,
        education: matrimonial.education,
        hobbies: matrimonial.hobbies,
        gender: matrimonial.gender,
        createdAt: matrimonial.createdAt,
        aboutMe: matrimonial.aboutMe,
        height: matrimonial.height,
        partnerPreferences: matrimonial.partnerPreferences,
        action: (
          <>
            {/* <Link
              to={`/admin/matrimonial/${matrimonial._id}`}
              className=" ms-1 fs-3 text-danger"
            >
              <BiEdit />
            </Link> */}
            <button
              className=" fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(matrimonial._id)}
            >
              <MdOutlineDelete />
            </button>
          </>
        ),
      }));
  };

  const showModal = (matrimonialId) => {
    setOpen(true);
    setmatrimonialId(matrimonialId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deletematrimonial = (matrimonialId) => {
    dispatch(deleteAMatrimonial(matrimonialId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getMatrimonial());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Matrimonial Profiles</h3>
      {/* <div>
        <Table columns={columns} dataSource={transformmatrimonialData()} />
      </div> */}

      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={transformmatrimonialData()}
          scroll={{ x: true }}
        />
      </div>

      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deletematrimonial(matrimonialId);
        }}
        title="Are you sure you want to delete this Matrimonial"
      />
    </div>
  );
};

export default Matrimoniallist;
