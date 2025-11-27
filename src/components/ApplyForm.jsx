import { useState } from "react";
import { api } from "../API/api";
export default function ApplyForm({ job, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("job_title", job.title);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    if (cv) formData.append("cv", cv);

    try {
      await api.post("/apply-job", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Your application has been sent successfully!");
      onClose();

    } catch (err) {
      console.error(err);
      alert("Failed to send application. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          {job.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              className="w-full border rounded-lg p-3 mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3 mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@example.com"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold text-gray-700">Phone Address</label>
            <input
              type="phone"
              className="w-full border rounded-lg p-3 mt-1 shadow-sm focus:ring-2 focus:ring-green-600 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+855 125346409"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="font-semibold text-gray-700">Message</label>
            <textarea
              className="w-full border rounded-lg p-3 mt-1 h-32 shadow-sm focus:ring-2 focus:ring-green-600 outline-none resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a short message..."
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="font-semibold text-gray-700">Upload CV (PDF)</label>

            <div className="mt-2 flex items-center gap-4">
              <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
                Choose File
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setCv(e.target.files[0])}
                />
              </label>

              <span className="text-sm text-gray-600">
                {cv ? cv.name : "No file selected"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-800 transition transform hover:scale-[1.01]"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
