import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <div className="mb-8 flex justify-center">
          <NavLink
            to="/admin"
            className="text-xl font-bold text-green-700 whitespace-nowrap flex items-center"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
            />
          </NavLink>
        </div>

        {/* NAV MENU */}
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/people"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Organizational Structure
          </NavLink>

          <NavLink
            to="/admin/posts"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Posts
          </NavLink>

          <NavLink
            to="/admin/documents"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Documents Media
          </NavLink>

          <NavLink
            to="/admin/librarys"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Library File
          </NavLink>

          <NavLink
            to="/admin/jobs"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Careers
          </NavLink>

          <NavLink
            to="/admin/volunteers"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Volunteers / Internship
          </NavLink>

          <NavLink
            to="/admin/project"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/admin/member"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Member Logo
          </NavLink>

          <NavLink
            to="/admin/network"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Networks
          </NavLink>

          <NavLink
            to="/admin/impact"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`
            }
          >
            Impacts
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:px-6">
        <Outlet />
      </main>


    </div>
  );
}
