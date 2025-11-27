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

  const loadJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
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
      loadJobs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-700">Job Careers</h1>
        <button
          onClick={() => {
            setEditingJob(null);
            setShowForm(true);
          }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + New Job
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
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Closing Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((j) => (
            <tr key={j.id} className="border-b">
              {/* Image */}
              <td className="px-4 py-2">
                {j.image ? (
                  <img
                    src={`http://44.205.95.55/storage/${j.image}`}
                    alt="Job"
                    className="w-8 h-8 object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </td>

              {/* Title */}
              <td className="px-4 py-2">{j.title}</td>

              {/* Closing Date */}
              <td className="px-4 py-2">
                {j.closing_date
                  ? new Date(j.closing_date).toLocaleDateString("en-GB")
                  : "-"}
              </td>

              {/* Description */}
              <td className="px-4 py-2">
                {j.description?.substring(0, 60)}...
              </td>

              {/* Actions */}
              <td className="px-4 py-2 text-center">
                <MenuButton
                  onEdit={() => handleEdit(j)}
                  onDelete={() => {
                    setDeleteId(j.id);
                    setShowDelete(true);
                  }}
                />
              </td>
            </tr>
          ))}

          {jobs.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No job postings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* DELETE CONFIRM MODAL */}
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
