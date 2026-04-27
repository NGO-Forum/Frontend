import { useEffect, useState } from "react";
import { api } from "../../API/api";
import VolunteerForm from "../components/VolunteerForm";
import StatusModal from "../components/StatusModal";
import MenuButton from "../components/MenuButton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function VolunteerAdmin() {
  const [volunteers, setVolunteers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentVolunteers = volunteers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(volunteers.length / itemsPerPage);

  const loadVolunteers = async () => {
    const res = await api.get("/volunteers");
    setVolunteers(res.data);
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  // Delete handler
  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await api.delete(`/volunteers/${deleteItem.id}`);
      loadVolunteers();

      setStatus({
        open: true,
        type: "success",
        message: "Volunteer removed successfully!",
      });
    } catch (err) {
      setStatus({
        open: true,
        type: "error",
        message: "Failed to delete volunteer.",
      });
    }

    setShowDelete(false);
    setDeleteItem(null);
  };

  return (
    <>
      <div className="max-w-full">
        {/* HEADER */}
        <div className="mb-3 rounded-2xl bg-white px-6 py-5 flex items-center justify-between shadow-sm">
          {/* LEFT */}
          <div className="flex items-start gap-4">
            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100">
              <svg
                className="w-6 h-6 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5V4H2v16h5m10 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m10 0H7"
                />
              </svg>
            </div>

            {/* TEXT */}
            <div>
              <h1 className="text-2xl font-extrabold text-green-700">
                Volunteers
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage volunteer profiles and participation records.
              </p>
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95"
          >
            <svg
              className="w-5 h-5 text-green-400 group-hover:text-white transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Create
          </button>
        </div>

        {/* MODAL FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative animate-fadeIn max-h-[90vh] overflow-y-auto">

              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600"
              >
                ×
              </button>

              <VolunteerForm
                editing={editing}
                onSaved={() => {
                  loadVolunteers();
                  setShowForm(false);
                  setStatus({
                    open: true,
                    type: "success",
                    message: editing
                      ? "Volunteer updated successfully!"
                      : "Volunteer created successfully!",
                  });
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className="text-lg font-bold text-green-700">Volunteer List</h2>
              <p className="text-sm text-slate-500">
                View and manage volunteer profiles and department information.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentVolunteers.map((v) => (
                  <tr
                    key={v.id}
                    className="transition-all duration-200 hover:bg-green-50"
                  >
                    <td className="px-6 py-2">
                      {v.img ? (
                        <img
                          src={`https://api.ngoforum.org.kh/storage/${v.img}`}
                          alt={v.name}
                          className="h-10 w-10 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-2">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800 whitespace-nowrap">
                          {v.name || "No name"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-2">
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                        {v.position || "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-600">
                      {v.phone || "N/A"}
                    </td>

                    <td className="px-6 py-2">
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        {v.department || "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-2 text-center">
                      <div className="flex justify-center">
                        <MenuButton
                          onEdit={() => {
                            setEditing(v);
                            setShowForm(true);
                          }}
                          onDelete={() => {
                            setDeleteItem(v);
                            setShowDelete(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}

                {volunteers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-14">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <svg
                            className="h-8 w-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M17 20h5V4H2v16h5m10 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m10 0H7"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">
                          No volunteers found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Start by adding a new volunteer profile.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-600">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${currentPage === i + 1
                      ? "bg-green-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STATUS MODAL */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ ...status, open: false })}
      />

      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
