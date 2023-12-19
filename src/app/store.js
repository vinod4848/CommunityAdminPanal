import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import blogReducer from "../features/blog/blogSlice";
import blogCatReducer from "../features/blogCat/blogCatSlice";
import productCategoryReducer from "../features/productCategory/productCategorySilce";
import colorReducer from "../features/color/colorSlice";
import enquirieReducer from "../features/enquiries/enquiriesSilce";
import couponReducer from "../features/coupon/couponSlice";
import uploadReducer from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    blog: blogReducer,
    blogCat: blogCatReducer,
    productCategory: productCategoryReducer,
    color: colorReducer,
    enquirie: enquirieReducer,
    coupon: couponReducer,
    upload: uploadReducer,
  },
});
