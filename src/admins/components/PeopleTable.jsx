import React, { useState } from "react";
import { api } from "../../API/api";
import MenuButton from "./MenuButton";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function PeopleTable({ people, loadPeople, setEditing }) {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Delete API call
  const remove = async () => {
    try {
      await api.delete(`/people/${deleteId}`);
      setShowDelete(false);
      loadPeople();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting item");
    }
  };

  const imgUrl = (path) =>
    path ? `http://44.205.95.55/storage/${path}` : "/images/no-image.png";

  return (
    <div className="rounded-xl shadow overflow-hidden border border-gray-200">
      <table className="w-full text-sm">
        <thead className="text-white bg-green-700">
          <tr>
            <th className="px-3 py-2 text-left">Image</th>
            <th className="px-8 py-2 text-left">Name</th>
            <th className="px-8 py-2 text-left">Email</th>
            <th className="px-8 py-2 text-left">Role</th>
            <th className="px-8 py-2 text-left">Position</th>
            <th className="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {people.map((p) => (
            <tr key={p.id}>
              <td className="px-3 py-2">
                <img
                  src={imgUrl(p.img)}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>

              <td className="px-8 py-1">{p.name}</td>
              <td className="px-8 py-1">{p.email}</td>
              <td className="px-8 py-1">{p.role}</td>
              <td className="px-8 py-1">{p.position}</td>

              <td className="px-3 py-1 text-center">
                <MenuButton
                  onEdit={() => setEditing(p)}
                  onDelete={() => {
                    setDeleteId(p.id);
                    setShowDelete(true); // open modal
                  }}
                />
              </td>
            </tr>
          ))}
          {people.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No people yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={remove}
      />
    </div>
  );
}
