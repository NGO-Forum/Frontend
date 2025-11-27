import React, { useEffect, useState } from "react";
import { api } from "../../../API/api";
import StatusModal from "../StatusModal";

export default function NetworkForm({
  editingNetwork,
  closeForm,
  refresh,
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
    action: null, // 👈 callback after user presses OK
  });

  useEffect(() => {
    if (editingNetwork && editingNetwork.id) {
      setName(editingNetwork.name || "");
      setSlug(editingNetwork.slug || "");
    } else {
      setName("");
      setSlug("");
    }
  }, [editingNetwork]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingNetwork?.id) {
        await api.put(`/networks/${editingNetwork.id}`, { name, slug });

        setStatus({
          open: true,
          type: "success",
          message: "Network updated successfully!",
          action: () => {
            refresh();
            closeForm();
          },
        });

      } else {
        await api.post("/networks", { name, slug });

        setStatus({
          open: true,
          type: "success",
          message: "Network created successfully!",
          action: () => {
            refresh();
            closeForm();
          },
        });
      }

    } catch (error) {
      console.error(error);

      setStatus({
        open: true,
        type: "error",
        message: "Failed to save network.",
        action: null,
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>

      {/* MODAL */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6">

          <h2 className="text-2xl font-bold text-green-600 mb-4">
            {editingNetwork?.id ? "Edit Network" : "Add Network"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* SLUG */}
            <div>
              <label className="block font-medium text-gray-700">Slug</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mt-1"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={closeForm}
                className="px-5 py-2 bg-orange-300 text-white rounded-lg"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-green-600 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? "Saving…" : "Save"}
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
        onClose={() => {
          setStatus({ ...status, open: false });
          if (status.action) status.action(); // 👈 run after OK pressed
        }}
      />
    </>
  );
}
