import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../API/api";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Briefcase,
  HandHelping,
  FolderKanban,
  Image,
  Network,
  BarChart3,
  HeartHandshake,
  MessageSquare,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      console.log("Logout error:", e);
    }

    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const menuItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/people", label: "Organizational Structure", icon: Users },
    { to: "/admin/posts", label: "Posts", icon: FileText },
    { to: "/admin/documents", label: "Documents Media", icon: FolderOpen },
    { to: "/admin/librarys", label: "Library File", icon: FolderOpen },
    { to: "/admin/jobs", label: "Careers", icon: Briefcase },
    { to: "/admin/volunteers", label: "Volunteers / Internship", icon: HandHelping },
    { to: "/admin/project", label: "Projects", icon: FolderKanban },
    { to: "/admin/member", label: "Member Logo", icon: Image },
    { to: "/admin/network", label: "Networks", icon: Network },
    { to: "/admin/impact", label: "Impacts", icon: BarChart3 },
    { to: "/admin/donations", label: "Donations", icon: HeartHandshake },
    { to: "/admin/feedback", label: "Comments", icon: MessageSquare },
  ];

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-[2px] md:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 flex flex-col
            border-r border-slate-200 bg-white/95 backdrop-blur-xl
            shadow-2xl transition-all duration-300
            md:static md:translate-x-0 md:shadow-none
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            ${collapsed ? "md:w-24" : "md:w-64"}
            w-72
          `}
         >
          {/* Logo + actions */}
          <div className="relative flex items-center justify-center border-b border-slate-200 px-4 py-4 md:px-5">
            <NavLink
              to="/admin"
              onClick={closeMobileMenu}
              className={`flex items-center ${collapsed ? "md:justify-center md:w-full" : "gap-3"}`}
            >
              <div className="flex h-20 w-auto items-center justify-center overflow-hidden rounded-2xl">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-20 w-auto object-contain"
                />
              </div>

            </NavLink>

            {/* Mobile close */}
            <button
              type="button"
              onClick={closeMobileMenu}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <X size={20} />
            </button>

            {/* Desktop collapse */}
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-md transition hover:bg-slate-50 md:flex"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-5">

            <nav className="space-y-2 h-[70vh] overflow-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end || false}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `
                      group relative flex items-center rounded-2xl transition-all duration-200
                      ${collapsed ? "justify-center px-1 py-3" : "gap-3 px-3 py-3"}
                      ${isActive
                        ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-100"
                        : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                      }
                    `
                    }
                    title={collapsed ? item.label : ""}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`
                            flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all
                            ${isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-green-100 group-hover:text-green-700"
                            }
                          `}
                        >
                          <Icon size={18} />
                        </span>

                        {!collapsed && (
                          <span className="truncate text-sm font-semibold">
                            {item.label}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Footer / logout */}
          <div className="border-t border-slate-200 p-3">
            <button
              onClick={handleLogout}
              className={`
                flex w-full items-center rounded-2xl font-semibold transition-all duration-200
                ${collapsed ? "justify-center px-2 py-2" : "justify-center gap-2 px-2 py-2"}
                bg-red-50 text-red-600 hover:bg-red-600 hover:text-white
              `}
              title={collapsed ? "Log out" : ""}
            >
              <LogOut size={18} />
              {!collapsed && <span>Log out</span>}
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4">
            <Outlet />
        </main>
      </div>
    </div>
  );
}