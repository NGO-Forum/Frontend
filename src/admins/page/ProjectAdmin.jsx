import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import ProjectTable from "../components/Projects/ProjectTable";
import ProjectForm from "../components/Projects/ProjectForm";
import StatusModal from "../components/StatusModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function ProjectAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    type: "",
    message: ""
  });

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(projects.length / itemsPerPage);


  // Confirm delete (notify parent)
  const confirmDelete = async () => {
    try {
      await api.delete(`/projects/${deleteId}`);
      setShowDelete(false);
      loadProjects();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project");
    }
  };

  const loadProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleSave = async (formData, id = null) => {
    try {
      if (id) {
        formData.append("_method", "PUT");

        await api.post(`/projects/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // CLOSE FORM HERE
        setShowForm(false);
        setEditingProject(null);

        setStatus({
          open: true,
          type: "success",
          message: "Project updated successfully!",
        });

      } else {
        await api.post("/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // CLOSE FORM HERE
        setShowForm(false);
        setEditingProject(null);

        setStatus({
          open: true,
          type: "success",
          message: "Project created successfully!",
        });
      }

    } catch (err) {
      console.error("Save failed:", err);

      setStatus({
        open: true,
        type: "error",
        message: "Failed to save project. Please check your fields.",
      });
    }
  };


  return (
    <div className="max-w-full mx-auto space-y-4">

      {/* Header */}
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
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          </div>

          {/* TEXT */}
          <div>
            <h1 className="text-2xl font-extrabold text-green-700">
              Project Admin
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage projects, activities, and reporting data.
            </p>
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={handleCreate}
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
          ADD PROJECT
        </button>
      </div>

      {/* Table + Pagination */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-green-700">Project List</h2>
            <p className="text-sm text-slate-500">
              View and manage all project records.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <ProjectTable
            projects={currentProjects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => {
          setStatus({ ...status, open: false });
          loadProjects();
        }}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
