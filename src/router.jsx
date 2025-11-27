import { createBrowserRouter } from "react-router-dom";

// WHO WE ARE
import About from "./pages/About";
import History from "./pages/History";
import Structure from "./pages/Structure";
import Contact from "./pages/Contact";

// WHAT WE DO
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


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/history", element: <History /> },
  { path: "/structure", element: <Structure /> },
  { path: "/contact", element: <Contact /> },
  { path: "/pali", element: <Pali /> },
  { path: "/sachas", element: <Sachas /> },
  { path: "/riti", element: <Riti /> },
  { path: "/macor", element: <Macor /> },
  { path: "/latest", element: <Latest /> },
  { path: "/media", element: <Media /> },
  { path: "/library", element: <Library /> },
  { path: "/volunteer", element: <Volunteer /> },
  { path: "/membership", element: <Membership /> },
  { path: "/careers", element: <Careers /> },
  { path: "/project", element: <Project /> },
  { path: "/impacts", element: <Impacts /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/donate", element: <Donate /> },



  // ADMIN ROUTES
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "people", element: <PeopleAdmin /> },
      { path: "posts", element: <PostsAdmin /> },
      { path: "documents", element: <DocumentsAdmin /> },
      { path: "library", element: <LibraryAdmin /> },
      { path: "jobs", element: <JobAdmin /> },
      { path: "volunteer", element: <VolunteerAdmin /> },
      { path: "project", element: <ProjectAdmin /> },
      { path: "member", element: <MemberAdmin /> },
      { path: "network", element: <Network /> },
      { path: "impact", element: <Impact /> },
    ],
  },
]);

export default router;
