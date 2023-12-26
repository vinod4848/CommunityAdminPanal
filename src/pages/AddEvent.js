import { useLocation, useNavigate } from "react-router-dom";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../components/CustomInput";
import {
  createEvent,
  getAEvent,
  resetState,
  updateAEvent,
} from "../features/event/eventSlice";

const userSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  image: Yup.string(),
  category: Yup.string().required("Category is Required"),
  address: Yup.string().required("Address is Required"),
  date: Yup.date().required("Date is Required"),
});

const AddEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getEventId = location.pathname.split("/")[3];
  const newEvent = useSelector((state) => state.event);
  const {
    isSuccess,
    isError,
    isLoding,
    createdevent,
    updatedBrand,
    eventData,
  } = newEvent;

  useEffect(() => {
    if (getEventId !== undefined) {
      dispatch(getAEvent(getEventId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getEventId]);

  useEffect(() => {
    if (isSuccess && createdevent) {
      toast.success("Event Added Successfully!");
    }
    if (updatedBrand && isSuccess) {
      toast.success("Event Updated Successfully!");
      navigate("/admin/list-event");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoding, createdevent, updatedBrand, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: eventData?.title || "",
      description: eventData?.description || "",
      image: eventData?.image || "",
      category: eventData?.category || "",
      date: eventData?.date || "",
      address: eventData?.address || "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        if (getEventId !== undefined) {
          const data = { id: getEventId, eventData: values };
          dispatch(updateAEvent(data));
        } else {
          dispatch(createEvent(values));
        }

        toast.success(
          getEventId !== undefined
            ? "Event Updated Successfully!"
            : "Event Added Successfully!"
        );

        formik.resetForm();
        dispatch(resetState());
        navigate("/admin/event-list");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getEventId !== undefined ? "Edit" : "Add"} Event
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
        <CustomInput
        type="text"
        label="Enter Event Name"
        name="title"
        onChange={formik.handleChange("title")}
        onBlur={formik.handleBlur("title")}
        values={formik.values.title}
        id="event"
      />
      <div className="error">
        {formik.touched.title && formik.errors.title}
      </div>

      <CustomInput
        type="text"
        label="category"
        name="category"
        onChange={formik.handleChange("category")}
        onBlur={formik.handleBlur("category")}
        val={formik.values.category}
        id="category"
      />
      <div className="error">
        {formik.touched.category && formik.errors.category}
      </div>
      <CustomInput
        type="text"
        label="address"
        name="address"
        onChange={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        value={formik.values.address}
        id="address"
      />
      <div className="error">
        {formik.touched.address && formik.errors.address}
      </div>

      <CustomInput
        type="textarea"
        label="Description"
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        id="description"
      />
      <div className="error">
        {formik.touched.description && formik.errors.description}
      </div>

      <CustomInput
        type="file"
        label="image"
        name="image"
        onChange={(e) => {
          formik.setFieldValue("image", e.currentTarget.files[0]);
        }}
        onBlur={formik.handleBlur("image")}
        id="image"
      />
      <div className="error">
        {formik.touched.image && formik.errors.image}
      </div>

      <CustomInput
        type="date"
        label="date"
        name="date"
        onChange={formik.handleChange("date")}
        onBlur={formik.handleBlur("date")}
        val={formik.values.date}
        id="date"
      />
      <div className="error">
        {formik.touched.date && formik.errors.date}
      </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getEventId !== undefined ? "Edit" : "Add"} Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
