import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import { X } from "lucide-react";
import StatusModal from "./StatusModal";

export default function PeopleForm({
  category,
  setCategory,
  loadPeople,
  editing,
  setEditing,
  onSuccess,
  setOpenForm,
}) {
  const empty = {
    name: "",
    role: "",
    position: "",
    email: "",
    img: "",
    description: "",
    phone: "",
    education: "",
  };

  const [form, setForm] = useState(empty);

  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });

  // ---------------------------------------------------------
  // Load data when editing
  // ---------------------------------------------------------
  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || "",
        role: editing.role || "",
        position: editing.position || "",
        email: editing.email || "",
        img: editing.img || "",
        description: editing.description || "",
        phone: editing.phone || "",
        education: editing.education ? editing.education.join("\n") : "",
      });

      if (editing.category) {
        setCategory(editing.category);
      }
    } else {
      setForm(empty);
    }
  }, [editing]);

  // ---------------------------------------------------------
  // SUBMIT FORM
  // ---------------------------------------------------------
  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name || "");
    data.append("role", form.role || "");
    data.append("position", form.position || "");
    data.append("phone", form.phone || "");
    data.append("email", form.email || "");
    data.append("category", category || "");
    data.append("description", form.description || "");

    // Education array
    const eduArray = form.education
      ? form.education.split("\n").map((v) => v.trim())
      : [];

    eduArray.forEach((item, index) => {
      data.append(`education[${index}]`, item);
    });

    // Image upload
    if (form.img instanceof File) {
      data.append("img", form.img);
    }

    try {
      if (!editing) {
        // CREATE
        await api.post("/people", data);
        setStatus({
          open: true,
          type: "success",
          message: "Person created successfully!",
        });
      } else {
        // UPDATE
        data.append("_method", "PUT"); // FIXED
        await api.post(`/people/${editing.id}`, data);

        setStatus({
          open: true,
          type: "success",
          message: "Person updated successfully!",
        });
      }

      await loadPeople();
      onSuccess?.();

    } catch (error) {
      console.log("Validation error:", error.response?.data);
      setStatus({
        open: true,
        type: "error",
        message: "Validation failed. Please check your input.",
      });
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h2 className="text-2xl font-bold text-green-700">
          {editing ? "Edit Person" : "Create New Person"}
        </h2>

        <button
          type="button"
          className="text-gray-500 hover:text-red-600 transition"
          onClick={() => {
            setEditing(null);
            setOpenForm(false);
          }}
        >
          <X size={28} />
        </button>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-4">

          <div>
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              className="input-field"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Role</label>
            <input
              className="input-field"
              value={form.role || ""}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Position</label>
            <input
              className="input-field"
              value={form.position || ""}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Department</label>
            <select
              className="input-field"
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="director">Directors</option>
              <option value="advisor">Advisors</option>
              <option value="sachas">SACHAS</option>
              <option value="pili">PILI</option>
              <option value="riti">RITI</option>
              <option value="macor">MACOR</option>
              <option value="executiveDirector">Executive Director</option>
            </select>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">

          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              className="input-field"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Phone</label>
            <input
              className="input-field"
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              className="input-field"
              onChange={(e) =>
                setForm({ ...form, img: e.target.files[0] })
              }
            />
          </div>

          {form.img && (
            <div className="w-32 h-32 rounded-full overflow-hidden shadow mx-auto">
              <img
                src={
                  form.img instanceof File
                    ? URL.createObjectURL(form.img)
                    : `http://44.205.95.55/storage/${form.img}`
                }
                className="w-full h-full object-cover"
              />
            </div>
          )}

        </div>

        {/* TEXT AREAS */}
        <div className="md:col-span-2 space-y-4">

          <div>
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              className="input-field h-28"
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Education</label>
            <textarea
              className="input-field h-28"
              value={form.education || ""}
              onChange={(e) =>
                setForm({ ...form, education: e.target.value })
              }
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpenForm(false);
            }}
            className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
          >
            {editing ? "Update" : "Create"}
          </button>
        </div>

      </form>

      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ ...status, open: false })}
      />
    </section>
  );
}
