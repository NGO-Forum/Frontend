import React, { useState } from "react";
import { api } from "../../../API/api";

export default function EditFileModal({ file, closeModal, refresh, showStatus }) {
    const [title, setTitle] = useState(file.title || "");
    const [newFile, setNewFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateFile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            if (newFile) formData.append("file", newFile);
            // Laravel-friendly multipart update
            formData.append("_method", "PUT");

            const res = await api.post(`/network-files/${file.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            showStatus("success", "File updated successfully!");
            await refresh();
            closeModal();
        } catch (err) {
            console.error("Update failed:", err.response?.data || err);
            showStatus("error", "Failed to update file. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

            <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
                    <h2 className="text-xl font-bold text-green-700 mb-4">Edit File</h2>

                    {/* Current file link */}
                    <div className="mb-4 p-3 bg-gray-100 border rounded-lg">
                        <p className="font-medium text-gray-700 mb-1">Current File:</p>
                        <a href={file.file_url} target="_blank" rel="noreferrer" className="text-blue-600 underline flex items-center gap-2">
                            📄 View Current File
                        </a>
                    </div>

                    <form onSubmit={updateFile} className="space-y-4">
                        <div>
                            <label className="font-medium text-gray-700">Title</label>
                            <input
                                className="w-full border rounded-lg p-2 mt-1"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="font-medium text-gray-700">Replace File</label>
                            <input
                                type="file"
                                className="w-full border rounded-lg p-2 mt-1"
                                onChange={(e) => setNewFile(e.target.files[0])}
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
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
