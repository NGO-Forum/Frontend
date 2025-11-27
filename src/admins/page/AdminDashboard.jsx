import { useEffect, useState } from "react";
import { api } from "../../API/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    directors: 0,
    advisors: 0,
    staff: 0,
  });

  const loadStats = async () => {
    const res = await api.get("/people");
    const all = res.data;

    const directors = all.filter(p => p.category === "director").length;
    const advisors = all.filter(p => p.category === "advisor").length;

    // Staff = all who belong to program categories
    const staff = all.filter(p =>
      ["pili", "sachas", "riti", "macor", "executiveDirector"].includes(p.category)
    ).length;

    setStats({
      total: all.length,
      directors,
      advisors,
      staff,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
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

      </div>

      
    </div>
  );
}
