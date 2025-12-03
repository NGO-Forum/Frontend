import { useEffect, useState } from "react";
import { api } from "../../API/api";
import PostLineChart from "../components/PostLineChart";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    directors: 0,
    advisors: 0,
    staff: 0,
    members: 0,
    posts: 0,
    library: 0,
    media: 0,
    views: 0, 
    projects: 0,

  });

  const getTotal = (res) => {
    const d = res.data;

    // DOCUMENTS: { data: [...], total: X }
    if (typeof d.total === "number") return d.total;

    // LIBRARY: { data: { data: [...], meta: { total } } }
    if (d.data?.total) return d.data.total;

    // POSTS: { data: [...], meta: { total } }
    if (d.meta?.total) return d.meta.total;

    // Non-paginated array
    if (Array.isArray(d)) return d.length;

    return 0;
  };

  const loadStats = async () => {
    try {
      // People API
      const peopleRes = await api.get("/people");
      const all = peopleRes.data;

      const directors = all.filter(p => p.category === "director").length;
      const advisors = all.filter(p => p.category === "advisor").length;
      const staff = all.filter(p =>
        ["pili", "sachas", "riti", "macor", "executiveDirector"].includes(p.category)
      ).length;

      // Paginated APIs
      const membersRes = await api.get("/members");
      const postsRes = await api.get("/posts");
      const libraryRes = await api.get("/librarys");
      const mediaRes = await api.get("/documents");
      const viewsRes = await api.get("/total-views");
      const projectsRes = await api.get("/projects");


      setStats({
        total: all.length,
        directors,
        advisors,
        staff,
        members: getTotal(membersRes),
        posts: getTotal(postsRes),
        library: getTotal(libraryRes),
        media: getTotal(mediaRes),
        views: viewsRes.data.total_views, // NEW
        projects: getTotal(projectsRes),
      });

    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-700">
          <p className="text-gray-500">Total People</p>
          <h2 className="text-3xl font-bold">{stats.total}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-600">
          <p className="text-gray-500">Directors</p>
          <h2 className="text-3xl font-bold">{stats.directors}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-yellow-600">
          <p className="text-gray-500">Advisors</p>
          <h2 className="text-3xl font-bold">{stats.advisors}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-600">
          <p className="text-gray-500">Staff</p>
          <h2 className="text-3xl font-bold">{stats.staff}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-gray-600">
          <p className="text-gray-500">Total Website Views</p>
          <h2 className="text-3xl font-bold">{stats.views}</h2>
        </div>

        {/* NEW CARDS */}
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-600">
          <p className="text-gray-500">Total Members</p>
          <h2 className="text-3xl font-bold">{stats.members}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-pink-600">
          <p className="text-gray-500">Total Posts</p>
          <h2 className="text-3xl font-bold">{stats.posts}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-teal-600">
          <p className="text-gray-500">Total Library</p>
          <h2 className="text-3xl font-bold">{stats.library}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-600">
          <p className="text-gray-500">Total Media Files</p>
          <h2 className="text-3xl font-bold">{stats.media}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-cyan-600">
          <p className="text-gray-500">Total Projects</p>
          <h2 className="text-3xl font-bold">{stats.projects}</h2>
        </div>

      </div>

      <div>
        <PostLineChart />
      </div>
    </div>
  );
}
