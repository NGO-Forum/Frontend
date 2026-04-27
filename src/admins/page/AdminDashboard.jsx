import { useEffect, useState } from "react";
import { api } from "../../API/api";
import PostLineChart from "../components/PostLineChart";
import {
  Users,
  UserCheck,
  ShieldCheck,
  Briefcase,
  Eye,
  UserPlus,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  FolderKanban,
  TrendingUp,
  Sparkles,
} from "lucide-react";

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
    projects: 0,
    uniqueVisitors: 0,
  });

  const [loading, setLoading] = useState(true);

  const getTotal = (res) => {
    const d = res?.data;

    if (typeof d?.total === "number") return d.total;
    if (typeof d?.data?.total === "number") return d.data.total;
    if (typeof d?.meta?.total === "number") return d.meta.total;
    if (Array.isArray(d?.data)) return d.data.length;
    if (Array.isArray(d)) return d.length;

    return 0;
  };

  const loadStats = async () => {
    try {
      setLoading(true);

      const [
        peopleRes,
        membersRes,
        postsRes,
        libraryRes,
        mediaRes,
        visitorsRes,
        projectsRes,
      ] = await Promise.all([
        api.get("/people"),
        api.get("/members"),
        api.get("/posts"),
        api.get("/librarys"),
        api.get("/documents"),
        api.get("/unique-visitors"),
        api.get("/projects"),
      ]);

      const all = Array.isArray(peopleRes.data)
        ? peopleRes.data
        : Array.isArray(peopleRes.data?.data)
          ? peopleRes.data.data
          : [];

      const directors = all.filter((p) => p.category === "director").length;
      const advisors = all.filter((p) => p.category === "advisor").length;
      const staff = all.filter((p) =>
        ["pili", "sachas", "riti", "macor", "executiveDirector"].includes(
          p.category
        )
      ).length;

      setStats({
        total: all.length,
        directors,
        advisors,
        staff,
        members: getTotal(membersRes),
        posts: getTotal(postsRes),
        library: getTotal(libraryRes),
        media: getTotal(mediaRes),
        uniqueVisitors: visitorsRes.data?.unique_visitors || 0,
        projects: getTotal(projectsRes),
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total People",
      value: stats.total,
      icon: Users,
      ring: "border-emerald-500",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Directors",
      value: stats.directors,
      icon: UserCheck,
      ring: "border-blue-500",
      iconBg: "bg-blue-100 text-blue-700",
    },
    {
      title: "Advisors",
      value: stats.advisors,
      icon: ShieldCheck,
      ring: "border-amber-500",
      iconBg: "bg-amber-100 text-amber-700",
    },
    {
      title: "Staff",
      value: stats.staff,
      icon: Briefcase,
      ring: "border-rose-500",
      iconBg: "bg-rose-100 text-rose-700",
    },
    {
      title: "Website Views",
      value: stats.uniqueVisitors,
      icon: Eye,
      ring: "border-slate-500",
      iconBg: "bg-slate-100 text-slate-700",
    },
    {
      title: "Total Members",
      value: stats.members,
      icon: UserPlus,
      ring: "border-violet-500",
      iconBg: "bg-violet-100 text-violet-700",
    },
    {
      title: "Total Posts",
      value: stats.posts,
      icon: FileText,
      ring: "border-pink-500",
      iconBg: "bg-pink-100 text-pink-700",
    },
    {
      title: "Library Files",
      value: stats.library,
      icon: FolderOpen,
      ring: "border-teal-500",
      iconBg: "bg-teal-100 text-teal-700",
    },
    {
      title: "Media Files",
      value: stats.media,
      icon: ImageIcon,
      ring: "border-orange-500",
      iconBg: "bg-orange-100 text-orange-700",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      ring: "border-cyan-500",
      iconBg: "bg-cyan-100 text-cyan-700",
    },
  ];

  return (
    <div className="space-y-8 h-[95vh] overflow-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 text-white shadow-xl px-8 py-6">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-yellow-300/10 blur-2xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
              <Sparkles size={16} />
              Dashboard Overview
            </div>

            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-50 md:text-base">
              Monitor people, content, media, projects, and website activity in
              one place.
            </p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className={`group rounded-[24px] border ${card.ring} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
                    {loading ? "..." : card.value.toLocaleString()}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={22} />
                </div>
              </div>

              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Posts Analytics
            </h2>
            <p className="text-sm text-slate-500">
              View publishing trends and post activity over time.
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            Live Data Chart
          </div>
        </div>

        <div className="rounded-[22px] bg-slate-50">
          <PostLineChart />
        </div>
      </div>
    </div>
  );
}