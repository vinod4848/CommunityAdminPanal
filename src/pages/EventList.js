import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAEvent, getEvent } from "../features/event/eventSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Event Banner",
    dataIndex: "image",
    render: (image) => (
      <img src={image} alt="EventBanner" style={{ maxWidth: "100px" }} />
    ),
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Eventlist = () => {
  const [eventId, seteventId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);
  const eventState = useSelector((state) => state.event.events);

  const transformeventData = () => {
    return eventState
    .filter((event) => event.isActive) 
    .map((event, index) => ({
      key: index + 1,
      title: event.title,
      description: event.description,
      image: event.image,
      category: event.category,
      date: event.date,
      action: (
        <>
          <Link to={`/admin/event/${event._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(event._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    }));
  };

  const showModal = (eventId) => {
    setOpen(true);
    seteventId(eventId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteEvent = (eventId) => {
    dispatch(deleteAEvent(eventId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEvent());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Event</h3>
      <div>
        <Table columns={columns} dataSource={transformeventData()} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteEvent(eventId);
        }}
        title="Are you sure you want to delete this Event"
      />
    </div>
  );
};

export default Eventlist;