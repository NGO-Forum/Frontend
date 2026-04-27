import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import MemberForm from "../components/MemberForm";
import StatusModal from "../components/StatusModal";
import MenuButton from "../components/MenuButton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function MemberAdmin() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Delete modal states (you FORGOT THESE → caused the error)
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  // Status modal
  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const loadMembers = async () => {
    const res = await api.get("/members");
    setMembers(res.data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // Delete handler
  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await api.delete(`/members/${deleteItem}`);
      loadMembers();

      setStatus({
        open: true,
        type: "success",
        message: "Member deleted successfully!",
      });
    } catch (err) {
      setStatus({
        open: true,
        type: "error",
        message: "Failed to delete member.",
      });
    }

    setShowDelete(false);
    setDeleteItem(null);
  };

  // ⭐ LIKE PROJECTADMIN
  const handleSave = async (formData, id = null) => {
    try {
      if (id) {
        formData.append("_method", "PUT");
        await api.post(`/members/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setStatus({
          open: true,
          type: "success",
          message: "Member updated successfully!",
        });
      } else {
        await api.post("/members", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setStatus({
          open: true,
          type: "success",
          message: "Member created successfully!",
        });
      }

      setShowForm(false);
      setEditing(null);
      loadMembers();

    } catch (err) {
      console.error(err);
      setStatus({
        open: true,
        type: "error",
        message: "Failed to save member.",
      });
    }
  };

  const toggleDisable = async (member) => {
    const formData = new FormData();
    formData.append("disabled", member.disabled ? 0 : 1);
    formData.append("_method", "PUT");

    try {
      await api.post(`/members/${member.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      loadMembers();
    } catch (err) {
      console.error(err);
      setStatus({
        open: true,
        type: "error",
        message: "Failed to update status.",
      });
    }
  };


  // Pagination calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMembers = members.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(members.length / itemsPerPage);

  return (
    <div className="max-w-full mx-auto">

      {/* Header */}
      <div className="relative mb-3 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">

        <div className="relative flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">

          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/20">
              {/* Icon (optional) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Membership Logos
              </h1>
              <p className="text-sm text-slate-500">
                Manage and organize all membership logos
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] hover:shadow-lg"
          >
            <span className="text-lg">+</span>
            Add Logo
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2">
          <div>
            <h2 className="text-lg font-bold text-green-700">Membership Logos List</h2>
          </div>
        </div>
        <div className="overflow-x-auto border-b border-slate-200">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">Logo</th>
                <th className="px-5 py-4 text-left text-sm font-semibold">Organization Name</th>
                <th className="px-5 py-4 text-left text-sm font-semibold">Website Link</th>
                <th className="px-5 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-5 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {currentMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 11H5m14-4H9m10 8H7"
                          />
                        </svg>
                      </div>
                      <p className="text-base font-semibold text-slate-700">No members found</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Add a new membership logo to display it here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentMembers.map((m) => (
                  <tr
                    key={m.id}
                    className="group transition duration-200 hover:bg-green-50/40"
                  >
                    <td className="px-5 py-2">
                      <div className="flex items-center">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                          <img
                            src={m.logo_url}
                            alt={m.name}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-2">
                      <div className="font-semibold text-slate-800 max-w-[450px] truncate">{m.name}</div>
                    </td>

                    <td className="px-5 py-2">
                      <a
                        href={m.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex max-w-[350px] items-center gap-2 truncate rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5m7.328-1.328l1.5-1.5a4 4 0 115.656 5.656l-3 3a4 4 0 01-5.656 0"
                          />
                        </svg>
                        <span className="truncate">{m.link}</span>
                      </a>
                    </td>

                    <td className="px-5 py-2">
                      {m.disabled ? (
                        <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                          Disabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-2 text-center">
                      <div className="flex justify-center">
                        <MenuButton
                          onEdit={() => {
                            setEditing(m);
                            setShowForm(true);
                          }}
                          onDelete={() => {
                            setDeleteItem(m.id);
                            setShowDelete(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 bg-white px-4 py-2 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * itemsPerPage, members.length)}
            </span>{" "}
            of <span className="font-semibold text-slate-800">{members.length}</span> entries
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
            <button
              className={`inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition ${currentPage === 1
                ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-10 min-w-[40px] rounded-xl border text-sm font-semibold transition ${currentPage === i + 1
                  ? "border-green-600 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className={`inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition ${currentPage === totalPages
                ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>


      {/* Modal Form */}
      {showForm && (
        <MemberForm
          member={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {/* Status Modal */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ ...status, open: false })}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
