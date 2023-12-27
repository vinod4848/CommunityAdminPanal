import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import Advertisinglist from "./pages/AdvertisingList";
import Eventlist from "./pages/EventList";
import Joblist from "./pages/JobList"
import Newslist from "./pages/NewsList"
import JobListApprovalPending from "./pages/JobListApprovalPending"
import MatrimonialListApprovalPending from "./pages/MatrimonialListApprovalPending"
import EventListApprovalPending from "./pages/EventListApprovalPending"
import Directorielist from "./pages/DirectorieList"
import Matrimoniallist from "./pages/Matrimonial.List"
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist"
import AddBlog from "./pages/AddBlog";
import AddEvent from "./pages/AddEvent";
import AddNews from "./pages/AddNews";
import AddJob from "./pages/AddJob";
import AddAdvertisement from "./pages/AddAdvertising";
import AddDirectory from "./pages/AddDirectorie";
import AddUser from "./pages/AddUser";
import UserListApprovalPending from "./pages/UserListApprovalPending";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="advertising-list" element={<Advertisinglist />} />
          <Route path="event-list" element={<Eventlist />} />
          <Route path="job-list" element={<Joblist />} />
          <Route path="news-list" element={<Newslist />} />
          <Route path="approval-job-list" element={<JobListApprovalPending />} />
          <Route path="approval-list-matrimonial" element={<MatrimonialListApprovalPending />} />
          <Route path="approval-list-user" element={<UserListApprovalPending />} />
          <Route path="approval-list-event" element={<EventListApprovalPending />} />
          <Route path="directory-list" element={<Directorielist />} />
          <Route path="matrimonial-list" element={<Matrimoniallist />} />
          <Route path="blogs" element={<AddBlog />} />
          <Route path="events" element={<AddEvent />} />
          <Route path="job" element={<AddJob />} />
          <Route path="advertising" element={<AddAdvertisement />} />
          <Route path="directory" element={<AddDirectory />} />
          <Route path="users" element={<AddUser />} />
          <Route path="events/:id" element={<AddEvent />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="news" element={<AddNews />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="list-category" element={<Categorylist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
