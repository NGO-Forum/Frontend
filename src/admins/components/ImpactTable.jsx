import React, { useState } from "react";
import { api } from "../../API/api";
import MenuButton from "../components/MenuButton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function ImpactTable({ impacts, loadImpacts, setEditing }) {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Delete API call
  const remove = async () => {
    try {
      await api.delete(`/impacts/${deleteId}`);
      setShowDelete(false);
      loadImpacts();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting item");
    }
  };

  return (
    <div className="rounded-xl shadow overflow-hidden border border-gray-200">
      <table className="w-full text-sm">
        <thead className="text-white bg-green-700">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Project</th>
            <th className="px-4 py-2 text-left">Program</th>
            <th className="px-4 py-2 text-left">Summary</th>
            <th className="px-4 py-2 text-center">Document</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {impacts.slice(0, 1).map((imp) => (
            <tr key={imp.id} className="hover:bg-gray-50">
              <td className="px-4 py-1 font-medium text-gray-700 whitespace-nowrap max-w-[200px] truncate">
                {imp.name}
              </td>

              <td className="px-4 py-1 font-medium text-gray-700 whitespace-nowrap max-w-[200px] truncate">
                {imp.project?.name ? (
                  <span className="font-semibold text-gray-800">
                    {imp.project.name}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              <td className="px-4 py-1 font-medium text-gray-700 whitespace-nowrap max-w-[170px] truncate">
                <div className="flex gap-1 ">
                  {(Array.isArray(imp.program) ? imp.program : [imp.program])
                    .filter(Boolean)
                    .map((p, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs"
                      >
                        {p}
                      </span>
                    ))}
                </div>
              </td>

              <td className="px-4 py-1 text-gray-700 whitespace-nowrap max-w-[200px] truncate">
                <p>{imp.summary}</p>
              </td>

              <td className="px-4 py-1 text-center">
                {imp.file_url ? (
                  <a
                    href={imp.file_url}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400 text-xs">None</span>
                )}
              </td>

              <td className="px-4 py-1 text-center">
                <MenuButton
                  onEdit={() => setEditing(imp)}
                  onDelete={() => {
                    setDeleteId(imp.id);
                    setShowDelete(true);
                  }}
                />
              </td>
            </tr>
          ))}

          {impacts.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                No impacts found.
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
