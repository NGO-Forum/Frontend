import { useEffect, useState } from "react";
import { api } from "../../API/api";
import JobForm from "../components/JobForm";
import MenuButton from "../components/MenuButton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function JobAdmin() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const loadJobs = async (page = 1) => {
    try {
      const res = await api.get("/jobs", {
        params: { page },
      });

      setJobs(res.data.data);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs");
    }
  };
  useEffect(() => {
    loadJobs();
  }, []);

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/${deleteId}`);
      setShowDelete(false);
      loadJobs(pagination.current_page);
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div>
      <div className="mb-3 rounded-2xl bg-white px-6 py-4 flex items-center justify-between shadow-sm">
        {/* LEFT SIDE */}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* TEXT */}
          <div>
            <h1 className="text-2xl font-extrabold text-green-700">
              Job Careers
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage job postings and recruitment announcements.
            </p>
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => {
            setEditingJob(null);
            setShowForm(true);
          }}
          className="group flex items-center gap-2 px-7 py-3 rounded-full bg-gray-900 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-xl active:scale-95 active:bg-green-700"
        >
          <svg
            className="w-5 h-5 text-green-400 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          CREATE
        </button>
      </div>

      {/* ---------------- MODAL FORM ---------------- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative h-[98%] overflow-auto">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-700 text-2xl"
            >
              ✕
            </button>

            <JobForm
              editingJob={editingJob}
              onSaved={() => {
                setShowForm(false);
                loadJobs();
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* ---------------- JOBS TABLE ---------------- */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-green-700">Job Posting List</h2>
            <p className="text-sm text-slate-500">
              View and manage all recruitment announcements.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Closing Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {jobs.map((j) => (
                <tr
                  key={j.id}
                  className="transition-all duration-200 hover:bg-green-50"
                >
                  {/* Image */}
                  <td className="px-6 py-2">
                    {j.image ? (
                      <img
                        src={`https://api.ngoforum.org.kh/storage/${j.image}`}
                        alt="Job"
                        className="h-11 w-11 rounded-2xl object-cover ring-2 ring-slate-100 shadow-md"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </td>

                  {/* Title */}
                  <td className="px-6 py-2">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-800">
                        {j.title
                          ? j.title.length > 40
                            ? `${j.title.substring(0, 40)}...`
                            : j.title
                          : "No title"
                        }
                      </p>
                    </div>
                  </td>

                  {/* Closing Date */}
                  <td className="px-6 py-2">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      {j.closing_date
                        ? new Date(j.closing_date).toLocaleDateString("en-GB")
                        : "-"}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-2 max-w-md">
                    <p className="text-sm leading-6 text-slate-600">
                      {j.description
                        ? j.description.length > 50
                          ? `${j.description.substring(0, 50)}...`
                          : j.description
                        : "No description"}
                    </p>
                  </td>

                  {/* File */}
                  <td className="px-6 py-2">
                    {j.file ? (
                      <a
                        href={`https://api.ngoforum.org.kh/storage/${j.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 hover:bg-blue-200 transition"
                      >
                        📄 View File
                      </a>
                    ) : (
                      <span className="text-slate-400 text-sm">No File</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-2 text-center">
                    <div className="flex justify-center">
                      <MenuButton
                        onEdit={() => handleEdit(j)}
                        onDelete={() => {
                          setDeleteId(j.id);
                          setShowDelete(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-14">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-slate-700">
                        No job postings found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Start by creating a new job announcement.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-2">
          <p className="text-sm text-slate-600">
            Page <span className="font-semibold">{pagination.current_page}</span> of{" "}
            <span className="font-semibold">{pagination.last_page}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={pagination.current_page === 1}
              onClick={() => loadJobs(pagination.current_page - 1)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => loadJobs(pagination.current_page + 1)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
