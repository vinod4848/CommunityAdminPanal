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
import CompleteEventList from "./pages/CompleteEventList";
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
import UserList from "./pages/UserList";
import BlockUserListss from "./pages/BlockUserList";
import AddMagazines from "./pages/AddMagazines";
import MagazinesList from "./pages/MagazinesList";
import AnnouncementList from "./pages/AnnouncementList";
import Addannouncements from "./pages/AddAnnouncement";
import AnnouncementApprovalPendingList from "./pages/AnnouncementApprovalPendingList";
import CompleteAnnouncementsList from "./pages/CompleteAnnouncementsList";
import AddAnnouncementCategory from "./pages/AddAnnouncementCategory";
import AnnouncementCategoryList from "./pages/AnnouncementCategoryList";


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
          <Route path="complete-event-list" element={<CompleteEventList />} />
          <Route path="job-list" element={<Joblist />} />
          <Route path="news-list" element={<Newslist />} />
          <Route path="approval-job-list" element={<JobListApprovalPending />} />
          <Route path="approval-list-matrimonial" element={<MatrimonialListApprovalPending />} />
          <Route path="approval-list-user" element={<UserListApprovalPending />} />
          <Route path="approval-list-event" element={<EventListApprovalPending />} />
          <Route path="directory-list" element={<Directorielist />} />
          <Route path="matrimonial-list" element={<Matrimoniallist />} />
          <Route path="blogs" element={<AddBlog />} />
          <Route path="blogs/:blogId" element={<AddBlog />} />
          <Route path="events" element={<AddEvent />} />
          <Route path="job" element={<AddJob />} />
          <Route path="advertising" element={<AddAdvertisement />} />
          <Route path="advertising/:id" element={<AddAdvertisement />} />
          <Route path="directory" element={<AddDirectory />} />
          <Route path="magazines" element={<AddMagazines />} />
          <Route path="magazines-list" element={<MagazinesList />} />
          <Route path="announcementCategoryName" element={<AddAnnouncementCategory />} />
          <Route path="announcementCategoryName-list" element={<AnnouncementCategoryList />} />
          <Route path="announcements-list" element={<AnnouncementList />} />
          <Route path="announcements" element={<Addannouncements />} />
          <Route path="approvalpending-list" element={<AnnouncementApprovalPendingList />} />
          <Route path="completed-list" element={<CompleteAnnouncementsList />} />
          <Route path="directorie/:directoryId" element={<AddDirectory />} />
          <Route path="users" element={<AddUser />} />
          <Route path="users/:userId" element={<AddUser />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="block-user-list" element={<BlockUserListss />} />
          <Route path="events/:eventId" element={<AddEvent />} />
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
