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
  const itemsPerPage = 10;

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
    <div className="px-4 max-w-full mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Membership Logos</h1>

        <button
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl shadow border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-3 py-2 text-left">Logo</th>
              <th className="px-3 py-2 text-left">Organization Name</th>
              <th className="px-3 py-2 text-left">Website Link</th>
              <th className="px-3 py-2 text-left">Disable</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentMembers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No members added yet.
                </td>
              </tr>
            ) : (
              currentMembers.map((m) => (
                <tr key={m.id} className="border-b hover:bg-gray-50 transition">

                  <td className="px-3 py-2">
                    <img
                      src={m.logo_url}
                      className="h-10 w-16 object-cover rounded-md border shadow"
                    />
                  </td>

                  <td className="px-3 py-2 font-medium">{m.name}</td>

                  <td className="px-3 py-2">
                    <a
                      href={m.link}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {m.link}
                    </a>
                  </td>

                  <td className="px-3 py-2">
                    {m.disabled ? (
                      <span className="text-red-600 font-semibold">Disabled</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>

                  <td className="px-3 py-2 text-center">
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
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {members.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-2">

          <button
            className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-green-600 text-white" : "hover:bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"}`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

        </div>
      )}

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
