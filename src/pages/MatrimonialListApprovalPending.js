import { Table, Button } from "antd";
import moment from "moment";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatrimonial,
  updateAMatrimonial,
} from "../features/matrimonial/matrimonialSlice";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
    className: "column-sn",
  },
  {
    title: "FirstName",
    dataIndex: "firstName",
    className: "column-firstName",
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
    title: "NativePlace",
    dataIndex: "nativePlace",
  },
  {
    title: "Height",
    dataIndex: "height",
  },

  {
    title: "AboutMe",
    dataIndex: "aboutMe",
  },
  {
    title: "MaritalStatus",
    dataIndex: "maritalStatus",
  },
  {
    title: "ProfileCreatedBy",
    dataIndex: "profileCreatedBy",
  },
  {
    title: "AnyDisability",
    dataIndex: "anyDisability",
  },
  {
    title: "BloodGroup",
    dataIndex: "bloodGroup",
  },
  {
    title: "Lifestyle",
    dataIndex: "lifestyle",
  },
  {
    title: "moreAboutYourselfPartnerAndFamily",
    dataIndex: "moreAboutYourselfPartnerAndFamily",
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
  },

  {
    title: "ReligiousBackground",
    dataIndex: "religiousBackground",
  },
  {
    title: "Family",
    dataIndex: "family",
  },
  {
    title: "AstroDetails",
    dataIndex: "astroDetails",
  },
  {
    title: "EducationAndCareer",
    dataIndex: "educationAndCareer",
  },
  {
    title: "HealthInformation",
    dataIndex: "healthInformation",
  },
  {
    title: "LocationOfGroom",
    dataIndex: "locationOfGroom",
  },
  {
    title: "Profile",
    dataIndex: "image",
    render: (image) => (
      <img src={image} alt="profileBanner" style={{ maxWidth: "100px" }} />
    ),
  },
  {
    title: "Activate",
    dataIndex: "activateDeactivate",
  },
];

const MatrimonialListApprovalPending = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatrimonial());
  }, [dispatch]);

  const matrimonialState = useSelector(
    (state) => state.matrimonial.matrimonials
  );

  const transformMatrimonialData = () => {
    return matrimonialState
      .filter((matrimonial) => !matrimonial.isApproved)
      .map((matrimonial, index) => ({
        key: index + 1,
        firstName: matrimonial.profileId.firstName,
        lastName: matrimonial.profileId.lastName,
        image: matrimonial.image,
        email: matrimonial.userId.email,
        phone: matrimonial.userId.phone,
        dateOfBirth: moment(matrimonial.dateOfBirth).format("YYYY-MM-DD"),
        profession: matrimonial.profileId.profession,
        nativePlace: matrimonial.nativePlace,
        maritalStatus: matrimonial.maritalStatus,
        address: matrimonial.address,
        education: matrimonial.education,
        hobbies: Array.isArray(matrimonial.hobbies)
          ? matrimonial.hobbies.join(", ")
          : "",
        gender: matrimonial.profileId.gender,
        createdAt: moment(matrimonial.createdAt).format("YYYY-MM-DD"),
        aboutMe: matrimonial.aboutMe,
        height: matrimonial.height,
        profileCreatedBy: matrimonial.profileCreatedBy,
        healthInformation: matrimonial.healthInformation,
        anyDisability: matrimonial.anyDisability,
        bloodGroup: matrimonial.bloodGroup,
        lifestyle: matrimonial.lifestyle,
        moreAboutYourselfPartnerAndFamily:
          matrimonial.moreAboutYourselfPartnerAndFamily,
        religiousBackground: (
          <span>
            <strong>Religion:</strong>{" "}
            {matrimonial.religiousBackground.religion},{" "}
            <strong>Mother Tongue:</strong>{" "}
            {matrimonial.religiousBackground.motherTongue},{" "}
            <strong>Community:</strong>{" "}
            {matrimonial.religiousBackground.community},{" "}
            <strong>Sub Community:</strong>{" "}
            {matrimonial.religiousBackground.subCommunity},{" "}
            <strong>Gothra/Gothram:</strong>{" "}
            {matrimonial.religiousBackground.gothraGothram}
          </span>
        ),
        family: (
          <span>
            <strong>Number of Siblings:</strong>{" "}
            {matrimonial.family.numberOfSiblings},{" "}
            <strong>Father Status:</strong> {matrimonial.family.fatherStatus},{" "}
            <strong>Living with:</strong> {matrimonial.family.with},{" "}
            <strong>Occupation:</strong> {matrimonial.family.as},{" "}
            <strong>Nature of Business:</strong>{" "}
            {matrimonial.family.natureOfBusiness},{" "}
            <strong>Mother Status:</strong> {matrimonial.family.motherStatus},{" "}
            <strong>Family Location:</strong>{" "}
            {matrimonial.family.familyLocation}, <strong>Family Type:</strong>{" "}
            {matrimonial.family.familyType}, <strong>Family Values:</strong>{" "}
            {matrimonial.family.familyValues},{" "}
            <strong>Family Affluence:</strong>{" "}
            {matrimonial.family.familyAffluence}
          </span>
        ),
        astroDetails: (
          <span>
            <strong>Manglik/Chevva Dosham:</strong>{" "}
            {matrimonial.astroDetails.manglikChevvaidosham},{" "}
            <strong>Nakshatra:</strong> {matrimonial.astroDetails.nakshatra}
          </span>
        ),
        partnerPreferences: (
          <span>
            <strong>Age Range:</strong>{" "}
            {matrimonial.partnerPreferences.ageRange.min} -{" "}
            {matrimonial.partnerPreferences.ageRange.max},{" "}
            <strong>Gender:</strong> {matrimonial.partnerPreferences.gender},{" "}
            <strong>Education:</strong>{" "}
            {matrimonial.partnerPreferences.education},{" "}
            <strong>Profession:</strong>{" "}
            {matrimonial.partnerPreferences.profession},{" "}
            <strong>Min Height:</strong>{" "}
            {matrimonial.partnerPreferences.minHeight},{" "}
            <strong>Max Income:</strong>{" "}
            {matrimonial.partnerPreferences.maxIncome}
          </span>
        ),
        educationAndCareer: (
          <span>
            <strong>Highest Qualification:</strong>{" "}
            {matrimonial.educationAndCareer.highestQualification},{" "}
            <strong>College Attended:</strong>{" "}
            {matrimonial.educationAndCareer.collegeAttended},{" "}
            <strong>Working With:</strong>{" "}
            {matrimonial.educationAndCareer.workingWith},{" "}
            <strong>Annual Income:</strong>{" "}
            {matrimonial.educationAndCareer.annualIncome}
          </span>
        ),
        locationOfGroom: (
          <span>
            <strong>Country Living In:</strong>{" "}
            {matrimonial.locationOfGroom.countryLivingIn},{" "}
            <strong>State Living In:</strong>{" "}
            {matrimonial.locationOfGroom.stateLivingIn},{" "}
            <strong>City Living In:</strong>{" "}
            {matrimonial.locationOfGroom.cityLivingIn},{" "}
            <strong>Grew Up In:</strong> {matrimonial.locationOfGroom.grewUpIn},{" "}
            <strong>Ethnic Origin:</strong>{" "}
            {matrimonial.locationOfGroom.ethnicOrigin},{" "}
            <strong>Zip/Pin Code:</strong>{" "}
            {matrimonial.locationOfGroom.zipPinCode}
          </span>
        ),
        action: <></>,
        activateDeactivate: (
          <Button
            type="primary"
            onClick={() =>
              handleActivateDeactivate(matrimonial._id, !matrimonial.isApproved)
            }
          >
            {matrimonial.isApproved ? "Deactivate" : "Activate"}
          </Button>
        ),
      }));
  };

  const handleActivateDeactivate = async (matrimonialId, isApproved) => {
    try {
      await axios.put(`${base_url}/matrimonial/profiles/${matrimonialId}`, {
        isApproved: isApproved,
      });
      dispatch(updateAMatrimonial({ matrimonialId, isApproved }));
      setTimeout(() => {
        dispatch(getMatrimonial());
      }, 100);
    } catch (error) {
      console.error("Error updating matrimonial:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Matrimonial Profiles</h3>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={transformMatrimonialData()}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default MatrimonialListApprovalPending;
