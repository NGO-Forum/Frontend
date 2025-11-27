import React, { useState } from "react";
import { api } from "../../../API/api";
import MenuButton from "../MenuButton";
import DeleteConfirmModal from "../DeleteConfirmModal";

export default function FileList({ files, refresh, onEditFile }) {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const remove = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/network-files/${deleteId}`);
      refresh();
      setShowDelete(false);
    } catch (err) {
      console.error("Delete file failed:", err);
      alert("Failed to delete file");
    }
  };

  return (
    <ul className="mt-4 space-y-3">
      {files.map((file) => (
        <li
          key={file.id}
          className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
        >
          <a href={file.file_url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline flex items-center gap-2">
            📄 {file.title}
          </a>

          <div className="flex gap-2">
            <MenuButton
              onEdit={() => onEditFile && onEditFile(file)}
              onDelete={() => {
                setDeleteId(file.id);
                setShowDelete(true);
              }}
            />
          </div>
        </li>
      ))}

      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={remove}
      />
    </ul>
  );
}
