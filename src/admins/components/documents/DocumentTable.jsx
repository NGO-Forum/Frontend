// src/admin/components/documents/DocumentTable.jsx
import React, { useState } from "react";
import { api } from "../../../API/api";
import MenuButton from "../MenuButton";
import DeleteConfirmModal from "../DeleteConfirmModal";

const APP_URL = import.meta.env.VITE_APP_URL || "http://44.205.95.55";

export default function DocumentTable({ documents, setEditDoc, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // When user confirms delete in modal
  const confirmDelete = async () => {
    try {
      await api.delete(`/documents/${deleteId}`);
      setShowDelete(false);
      onDelete(); // refresh table from parent
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete document");
    }
  };

  if (!documents.length) {
    return (
      <div className="px-4 py-6 text-center text-sm text-slate-500">
        No documents found.
      </div>
    );
  }

  return (
    <div>
      <table className="w-full text-sm">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Title</th>
            <th className="text-left px-4 py-3 font-medium">Type</th>
            <th className="text-left px-4 py-3 font-medium">Year</th>
            <th className="text-left px-4 py-3 font-medium">Files</th>
            <th className="text-center px-2 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-slate-50">
              <td className="px-4 py-1">{doc.title}</td>

              <td className="px-4 py-1">
                <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs border">
                  {doc.type}
                </span>
              </td>

              <td className="px-4 py-1">
                <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-700">
                  {doc.year}
                </span>
              </td>

              <td className="px-4 py-1 space-x-2">

                {/* KH FILE */}
                {doc.file_kh_url && (
                  <a
                    href={doc.file_kh_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
                  >
                    KH
                  </a>
                )}

                {/* EN FILE */}
                {doc.file_en_url && (
                  <a
                    href={doc.file_en_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100"
                  >
                    EN
                  </a>
                )}

              </td>

              <td className="px-2 py-1 text-center">
                <MenuButton
                  onEdit={() => setEditDoc(doc)}
                  onDelete={() => {
                    setDeleteId(doc.id);
                    setShowDelete(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
