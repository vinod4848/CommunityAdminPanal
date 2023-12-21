import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAJob, getJob } from "../features/job/jobSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const columns = [
  { title: "SN", dataIndex: "key" },
  { title: "Title", dataIndex: "title" },
  { title: "Company", dataIndex: "company" },
  { title: "Location", dataIndex: "location" },
  { title: "Description", dataIndex: "description" },
  { title: "Responsibilities", dataIndex: "responsibilities" },
  { title: "Qualifications", dataIndex: "qualifications" },
  { title: "Skills", dataIndex: "skills" },
  { title: "Employment Type", dataIndex: "employmentType" },
  { title: "Experience Level", dataIndex: "experienceLevel" },
  { title: "Education Level", dataIndex: "educationLevel" },
  { title: "Salary", dataIndex: "salary" },
  {
    title: "Application Deadline",
    dataIndex: "applicationDeadline",
    render: (deadline) => moment(deadline).format("YYYY-MM-DD HH:mm:ss"),
  },
  { title: "Contact Email", dataIndex: "contactEmail" },
  { title: "Actions", dataIndex: "action" },
];

const Joblist = () => {
  const [jobId, setJobId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJob());
  }, [dispatch]);

  const jobState = useSelector((state) => state.job.jobs);

  const transformJobData = () => {
    return jobState.map((job, index) => ({
      key: index + 1,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
      skills: job.skills,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      educationLevel: job.educationLevel,
      salary: job.salary,
      applicationDeadline: job.applicationDeadline,
      contactEmail: job.contactEmail,
      action: (
        <>
          <Link to={`/admin/job/${job._id}`} className="ms-1  fs-5 text-danger">
            <BiEdit />
          </Link>
          <button
            className="fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(job._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    }));
  };

  const showModal = (jobId) => {
    setOpen(true);
    setJobId(jobId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteJob = (jobId) => {
    dispatch(deleteAJob(jobId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getJob());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Jobs</h3>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={transformJobData()}
          scroll={{ x: true }} // Enable horizontal scrolling
        />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteJob(jobId);
        }}
        title="Are you sure you want to delete this Job"
      />
    </div>
  );
};

export default Joblist;
