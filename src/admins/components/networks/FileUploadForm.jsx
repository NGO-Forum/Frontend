import React, { useState } from "react";
import { api } from "../../../API/api";
import StatusModal from "../StatusModal";

export default function UploadModal({ network, closeModal, refresh }) {
  const [title, setTitle] = useState("TOR");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const uploadFile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      setStatus({
        open: true,
        type: "error",
        message: "Please choose a file!",
      });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("network_id", network.id);
      formData.append("title", title);
      formData.append("file", file);

      await api.post("/network-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({
        open: true,
        type: "success",
        message: "File uploaded successfully!",
      });

      await refresh();
      closeModal();

    } catch (err) {
      console.error("Upload failed:", err);

      setStatus({
        open: true,
        type: "error",
        message: "Failed to upload file. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background blur */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

          <h2 className="text-xl font-bold text-green-700 mb-4">
            Upload File to: <br />
            <span className="text-gray-800">{network.name}</span>
          </h2>

          <form onSubmit={uploadFile} className="space-y-4">

            <div>
              <label className="font-medium text-gray-700">File Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="TOR">TOR</option>
                <option value="Steering Committee">Steering Committee</option>
                <option value="Action Plan">Action Plan</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-gray-700">Choose File</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* STATUS MODAL */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ ...status, open: false })}
      />
    </>
  );
}
