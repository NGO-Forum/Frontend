import { useEffect, useState } from "react";
import { api } from "../../API/api";

export default function VolunteerForm({ editing, onSaved, onCancel }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editing) {
      setName(editing.name || "");
      setPosition(editing.position || "");
      setEmail(editing.email || "");
      setPhone(editing.phone || "");
      setDepartment(editing.department || "");
      setDescription(editing.description || "");

      if (editing.img) {
        setPreview(`http://44.205.95.55/storage/${editing.img}`);
      }
    }
  }, [editing]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // preview image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);
    fd.append("position", position);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("department", department);
    fd.append("description", description);
    if (img) fd.append("img", img);

    if (editing) {
      await api.post(`/volunteers/${editing.id}?_method=PUT`, fd);
    } else {
      await api.post("/volunteers", fd);
    }

    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title */}
      <h2 className="text-2xl font-bold text-green-700 border-b pb-2">
        {editing ? "Edit Volunteer" : "Add Volunteer"}
      </h2>

      {/* GRID FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold text-gray-700">Full Name</label>
          <input
            className="w-full border p-3 rounded-lg mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Position</label>
          <input
            className="w-full border p-3 rounded-lg mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g., Project Officer"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border p-3 rounded-lg mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Phone</label>
          <input
            className="w-full border p-3 rounded-lg mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+855 xx xxx xxx"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Department</label>
          <input
            className="w-full border p-3 rounded-lg mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g., Environment Program"
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="font-semibold text-gray-700">Description</label>
        <textarea
          className="w-full border p-3 rounded-lg mt-1 h-32 shadow-sm focus:ring-2 focus:ring-green-600 outline-none resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description about volunteer..."
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <label className="font-semibold text-gray-700">Photo</label>

        <div className="flex items-center gap-4 mt-2">
          <label className="cursor-pointer bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow">
            Choose Image
            <input type="file" className="hidden" onChange={handleImage} />
          </label>

          {preview ? (
            <img
              src={preview}
              className="w-20 h-20 object-cover rounded-lg border shadow"
            />
          ) : (
            <span className="text-gray-500">No image selected</span>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg bg-orange-300 hover:bg-orange-400 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 shadow-md"
        >
          Save
        </button>
      </div>
    </form>
  );
}
