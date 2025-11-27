import { useState, useRef, useEffect } from "react";
import { Edit, Trash } from "lucide-react";
export default function MenuButton({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1 text-xl font-bold hover:bg-gray-200 rounded"
      >
        ⋮
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute flex -right-6 z-10 -mt-5 w-16 bg-white border rounded-lg shadow-md">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="block w-full text-left px-2 py-2 text-green-600 hover:bg-gray-100"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="block w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100"
          >
            <Trash size={16} />
          </button>
        </div>
      )}

    </div>
  );
}
