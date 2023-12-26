import { useLocation, useNavigate } from "react-router-dom";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../components/CustomInput";
import {
  createNew,
  getAANew,
  resetState,
  updateANew,
} from "../features/news/newSlice";

const userSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  content: Yup.string().required("content is Required"),
  image: Yup.string(),
  category: Yup.string().required("category is Required"),
  tags: Yup.string().required("tags is Required"),
  date: Yup.date().required("Date is Required"),
});

const AddNews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getNewsId = location.pathname.split("/")[3];
  const NewsState = useSelector((state) => state.news);
  const { isSuccess, isError, isLoding, createdNew, updatedNews, newData } =
    NewsState;

  useEffect(() => {
    if (getNewsId !== undefined) {
      dispatch(getAANew(getNewsId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getNewsId]);

  useEffect(() => {
    if (isSuccess && createdNew) {
      toast.success("News Added Successfully!");
    }
    if (updateANew && isSuccess) {
      toast.success("News Updated Successfully!");
      navigate("/admin/list-event");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoding, updatedNews, createdNew, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: newData?.title || "",
      content: newData?.content || "",
      category: newData?.category || "",
      tags: newData?.tags || "",
      image: newData?.image || "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        if (getNewsId !== undefined) {
          const data = { id: getNewsId, newData: values };
          dispatch(updateANew(data));
        } else {
          dispatch(createNew(values));
        }

        toast.success(
          getNewsId !== undefined
            ? "News Updated Successfully!"
            : "News Added Successfully!"
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
        {getNewsId !== undefined ? "Edit" : "Add"} News
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter News title"
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
            label="content"
            name="content"
            onChange={formik.handleChange("content")}
            onBlur={formik.handleBlur("content")}
            val={formik.values.content}
            id="content"
          />
          <div className="error">
            {formik.touched.content && formik.errors.content}
          </div>
          <CustomInput
            type="text"
            label="category"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            id="category"
          />
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <CustomInput
            type="textarea"
            label="tags"
            name="tags"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
            id="tags"
          />
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
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

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getNewsId !== undefined ? "Edit" : "Add"} News
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
