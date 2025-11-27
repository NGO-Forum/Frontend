import React from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function StatusModal({ open, type, message, onClose }) {
  if (!open) return null;

  const style = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-orange-500",
  };

  const icons = {
    success: <CheckCircle size={40} className={style.success} />,
    error: <XCircle size={40} className={style.error} />,
    warning: <AlertTriangle size={40} className={style.warning} />,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg text-center">
        
        <div className="flex justify-center mb-3">
          {icons[type] || icons.success}
        </div>

        <h2 className="text-lg font-semibold mb-2">
          {type === "success" ? "Success" : type === "error" ? "Error" : "Notice"}
        </h2>

        <p className="text-gray-700 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          OK
        </button>

      </div>
    </div>
  );
}
