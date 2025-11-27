import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export default function MenuButton({ onEdit, onDelete, onUpload }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Three-dot button */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={() => setOpen(!open)}
      >
        <MoreVertical size={20} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-xl z-50">

          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            🗑 Delete
          </button>

          <button
            onClick={() => { setOpen(false); onUpload(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
          >
            📤 Upload
          </button>

        </div>
      )}
    </div>
  );
}
