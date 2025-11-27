import React, { useState, useEffect } from "react";

export default function MemberForm({ member, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    link: "",
    logo: null,
    oldLogo: "",
    disabled: false, // ⭐ NEW FIELD
  });

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        link: member.link,
        logo: null,
        oldLogo: member.logo_url ?? "",
        disabled: member.disabled ?? false, // ⭐ load existing status
      });
    }
  }, [member]);

  const handleSubmit = () => {
    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("link", form.link);
    fd.append("disabled", form.disabled ? 1 : 0); // ⭐ send to backend

    if (form.logo) {
      fd.append("logo", form.logo);
    }

    onSave(fd, member?.id || null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          {member ? "Edit Member" : "Add Member"}
        </h2>

        {/* NAME */}
        <label className="block mb-1">Name</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* LINK */}
        <label className="block mb-1">Website Link</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        {/* DISABLE TOGGLE */}
        <label className="block font-semibold mb-1">Disable Member</label>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={form.disabled}
            onChange={(e) => setForm({ ...form, disabled: e.target.checked })}
          />
          <span>{form.disabled ? "Disabled" : "Active"}</span>
        </div>

        {/* LOGO INPUT */}
        <label className="block mb-1">Logo</label>
        <input
          type="file"
          className="mb-3"
          accept="image/*"
          onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
        />

        {(form.logo || form.oldLogo) && (
          <img
            src={form.logo ? URL.createObjectURL(form.logo) : form.oldLogo}
            className="w-20 h-20 mb-4 object-cover rounded border shadow"
          />
        )}

        {/* BUTTONS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-300 rounded hover:bg-orange-400 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
