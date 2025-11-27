import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

// WHO WE ARE
import About from "./pages/About";
import History from "./pages/History";
import Structure from "./pages/Structure";
import Contact from "./pages/Contact";

// WHAT WE DO
import Program from "./pages/Program";
import Pali from "./pages/Pali";
import Sachas from "./pages/Sachas";
import Riti from "./pages/Riti";
import Macor from "./pages/Macor";

// RESOURCE HUB
import Latest from "./pages/Latest";
import Media from "./pages/Media";
import Library from "./pages/Library";

// GET INVOLVED
import Membership from "./pages/Membership";
import Volunteer from "./pages/Volunteer";
import Careers from "./pages/Careers";


// Our Projects
import Project from "./pages/Project";
import Impacts from "./pages/Impacts";

// Search
import SearchPage from "./pages/SearchPage";
import Donate from "./pages/Donate";
import DonateInfo from "./pages/Infor";

// ADMIN PAGES
import AdminLayout from "./admins/page/AdminLayout";
import PeopleAdmin from "./admins/page/PeopleAdmin";
import AdminDashboard from "./admins/page/AdminDashboard";
import RequireAdmin from "./admins/middleware/RequireAdmin";
import AdminLogin from "./admins/page/AdminLogin";
import PostsAdmin from "./admins/page/PostAdmin";
import DocumentsAdmin from "./admins/page/DocumentsAdmin";
import LibraryAdmin from "./admins/page/LibraryAdmin";
import JobAdmin from "./admins/page/JobAdmin";
import VolunteerAdmin from "./admins/page/VolunteerAdmin";
import ProjectAdmin from "./admins/page/ProjectAdmin";
import MemberAdmin from "./admins/page/MemberAdmin";
import Network from "./admins/page/NetworksAdmin";
import Impact from "./admins/page/ImpactsAdmin";

export default function App() {
  const location = useLocation();
  // If URL starts with /admin → hide navbar & footer
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/program" element={<Program />} />
        <Route path="/pali" element={<Pali />} />
        <Route path="/sachas" element={<Sachas />} />
        <Route path="/riti" element={<Riti />} />
        <Route path="/macor" element={<Macor />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/media" element={<Media />} />
        <Route path="/library" element={<Library />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/project" element={<Project />} />
        <Route path="/impacts" element={<Impacts />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donate/info" element={<DonateInfo />} />

        {/* ADMIN ROUTES (NO NAVBAR/FOOTER) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="people" element={<PeopleAdmin />} />
          <Route path="posts" element={<PostsAdmin />} /> {/* Placeholder for PostsAdmin */}
          <Route path="documents" element={<DocumentsAdmin />} />
          <Route path="librarys" element={<LibraryAdmin />} />
          <Route path="jobs" element={<JobAdmin />} />
          <Route path="volunteers" element={<VolunteerAdmin />} />
          <Route path="project" element={<ProjectAdmin />} />
          <Route path="member" element={<MemberAdmin />} />
          <Route path="network" element={<Network />} />
          <Route path="impact" element={<Impact />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
