import React from "react";
import { AlertTriangle } from "lucide-react";
export default function DeleteConfirmModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
        <div className="flex flex-col items-center gap-3 mb-4">
          <AlertTriangle size={72} className="text-red-500" />
          <h2 className="text-xl font-bold text-gray-800">Delete Confirmation</h2>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-orange-300 text-white hover:bg-orange-500"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
