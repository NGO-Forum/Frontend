// src/components/impacts/ImpactForm.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../API/api";

export default function ImpactForm({ open, editingImpact, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);

  const [logoFiles, setLogoFiles] = useState([]);
  const [logoPreviews, setLogoPreviews] = useState([]);
  const [removeLogos, setRemoveLogos] = useState([]);

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // ⭐ Program Options
  const PROGRAM_OPTIONS = [
    "RITI Program",
    "SACHAS Program",
    "MACOR Program",
    "PALI Program",
  ];

  const [program, setProgram] = useState([]);

  // Load projects
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data || []);
      } catch {}
    })();
  }, []);

  // Load data when editing
  useEffect(() => {
    if (!open) return;

    if (editingImpact) {
      setName(editingImpact.name || "");
      setSummary(editingImpact.summary || "");
      setProjectId(editingImpact.project_id || "");

      setProgram(editingImpact.program || []);

      // Load existing logos
      setLogoPreviews(
        (editingImpact.logo_urls || []).map((url, idx) => ({
          url,
          existingPath: editingImpact.logo[idx],
        }))
      );

      // Load existing images
      setImagePreviews(
        (editingImpact.image_urls || []).map((url, idx) => ({
          url,
          existingPath: editingImpact.images[idx],
        }))
      );
    } else {
      // Reset form
      setName("");
      setSummary("");
      setProjectId("");
      setProgram([]);

      setLogoFiles([]);
      setLogoPreviews([]);
      setRemoveLogos([]);

      setImageFiles([]);
      setImagePreviews([]);
      setRemoveImages([]);

      setFile(null);
    }
  }, [open, editingImpact]);

  // Select Logo Files
  const handleLogoSelect = (e) => {
    const files = Array.from(e.target.files);
    setLogoFiles((prev) => [...prev, ...files]);

    setLogoPreviews((prev) => [
      ...prev,
      ...files.map((f) => ({ url: URL.createObjectURL(f) })),
    ]);
  };

  // Select Image Files
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => ({ url: URL.createObjectURL(f) })),
    ]);
  };

  // Remove preview logic (logos + images)
  const removePreview = (type, idx) => {
    const previews = type === "logo" ? logoPreviews : imagePreviews;
    const files = type === "logo" ? logoFiles : imageFiles;

    const removeSetter = type === "logo" ? setRemoveLogos : setRemoveImages;
    const previewSetter = type === "logo" ? setLogoPreviews : setImagePreviews;
    const fileSetter = type === "logo" ? setLogoFiles : setImageFiles;

    const existingCount =
      type === "logo"
        ? editingImpact?.logo?.length || 0
        : editingImpact?.images?.length || 0;

    const preview = previews[idx];

    if (preview.existingPath) {
      removeSetter((prev) => [...prev, preview.existingPath]);
    } else {
      const newIndex = idx - existingCount;
      if (newIndex >= 0)
        fileSetter((prev) => prev.filter((_, i) => i !== newIndex));
    }

    previewSetter((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();

      form.append("name", name);
      form.append("summary", summary);
      form.append("project_id", projectId);

      // ⭐ Append program values
      program.forEach((p, i) => form.append(`program[${i}]`, p));

      // Photos
      logoFiles.forEach((f) => form.append("logo[]", f));
      imageFiles.forEach((f) => form.append("images[]", f));

      if (file) form.append("file", file);

      // remove arrays
      removeLogos.forEach((p, i) =>
        form.append(`remove_logos[${i}]`, p)
      );
      removeImages.forEach((p, i) =>
        form.append(`remove_images[${i}]`, p)
      );

      if (editingImpact) {
        form.append("_method", "PUT");
        await api.post(`/impacts/${editingImpact.id}`, form);
      } else {
        await api.post("/impacts", form);
      }

      onSaved && onSaved();
    } catch (err) {
      console.error(err);
      alert("Failed to save impact.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-start justify-center pt-10 z-50">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-8 h-[90vh] overflow-auto">
          {/* Header */}
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-600">
              {editingImpact ? "Edit Impact" : "Create Impact"}
            </h2>
            <button
              className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="space-y-8">
            {/* BASIC INFO */}
            <div className="p-5 border rounded-xl bg-gray-50">
              <h3 className="font-semibold text-lg mb-3 text-gray-700">
                Basic Info
              </h3>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="font-medium">Name</label>
                  <input
                    className="w-full border mt-1 p-3 rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="font-medium">Project Name</label>
                  <select
                    className="w-full border mt-1 p-3 rounded-lg"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PROGRAM CHECKBOX */}
              <div className="mt-4">
                <label className="font-medium block mb-2 text-gray-700">
                  Additional Program Category
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {PROGRAM_OPTIONS.map((p) => (
                    <label
                      key={p}
                      className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition ${
                        program.includes(p)
                          ? "bg-green-100 border-green-500"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={program.includes(p)}
                        onChange={() =>
                          setProgram((prev) =>
                            prev.includes(p)
                              ? prev.filter((x) => x !== p)
                              : [...prev, p]
                          )
                        }
                      />
                      <span className="text-gray-700">{p}</span>
                    </label>
                  ))}
                </div>

                {program.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {program.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-full"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="font-medium">Summary</label>
                <textarea
                  className="w-full border mt-1 p-3 rounded-lg"
                  rows="4"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* LOGOS */}
            <div className="p-5 border rounded-xl bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-700">
                Logos (Multiple)
              </h3>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleLogoSelect}
                className="mt-3"
              />

              <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                {logoPreviews.map((p, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden shadow border bg-white"
                  >
                    <img src={p.url} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => removePreview("logo", i)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGES */}
            <div className="p-5 border rounded-xl bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-700">
                Images (Multiple)
              </h3>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="mt-3"
              />

              <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                {imagePreviews.map((p, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden shadow border bg-white"
                  >
                    <img src={p.url} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => removePreview("image", i)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENT */}
            <div className="p-5 border rounded-xl bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-700">Document</h3>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-3"
              />

              {editingImpact?.file_url && !file && (
                <p className="mt-2 text-sm text-blue-600">
                  <a
                    href={editingImpact.file_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View current document
                  </a>
                </p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-orange-300 text-white hover:bg-orange-400 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
