import { useState, useEffect } from "react";
import { api } from "../../API/api";
import StatusModal from "./StatusModal"; // Make sure this exists

export default function PostForm({ editingPost, onSaved, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [department, setDepartment] = useState("");

  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // NEW FILE (single file)
  const [file, setFile] = useState(null);
  const [oldFile, setOldFile] = useState(null);

  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setDescription(editingPost.description);
      setPublishedAt(formatDateForInput(editingPost.published_at));
      setDepartment(editingPost.department);

      setOldImages(editingPost.images || []);
      setPreviews(
        editingPost.images?.map(
          (img) => `http://44.205.95.55/storage/${img}`
        ) || []
      );

      if (editingPost.file) {
        setOldFile(`http://44.205.95.55/storage/${editingPost.file}`);
      }
    }
  }, [editingPost]);


  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  // Select new images
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    setPreviews([
      ...oldImages.map((img) => `http://44.205.95.55/storage/${img}`),
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("title", title);
    form.append("description", description);
    form.append("published_at", publishedAt);
    form.append("department", department);

    // single file
    if (file) {
      form.append("file", file);
    }

    // ONLY send new images
    newImages.forEach((img) => {
      form.append("images[]", img);
    });

    try {
      if (editingPost) {
        form.append("_method", "PUT");
        await api.post(`/posts/${editingPost.id}`, form);
        setStatus({
          open: true,
          type: "success",
          message: "Post updated successfully!",
        });
      } else {
        await api.post("/posts", form);
        setStatus({
          open: true,
          type: "success",
          message: "Post created successfully!",
        });
      }
    } catch (error) {
      console.log("Error:", error.response?.data);
      setStatus({
        open: true,
        type: "error",
        message: "Failed to save post.",
      });
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Title</label>
            <input
              className="border px-3 py-2 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Department</label>
            <select
              className="border px-3 py-2 rounded-lg"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              <option value="PALI">PALI</option>
              <option value="RITI">RITI</option>
              <option value="SACHAS">SACHAS</option>
              <option value="MACOR">MACOR</option>
            </select>
          </div>

          {/* Publish date */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Publish Date</label>
            <input
              type="datetime-local"
              className="border px-3 py-2 rounded-lg"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">File (PDF/DOC/Image)</label>

            {oldFile && (
              <a
                href={oldFile}
                target="_blank"
                className="text-blue-600 underline mb-2"
              >
                View existing file
              </a>
            )}

            <input
              type="file"
              className="border p-2 rounded-lg"
              onChange={handleFileSelect}
            />
          </div>

          {/* Images */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Images</label>
            <input
              type="file"
              multiple
              className="border p-2 rounded-lg"
              onChange={handleImageSelect}
            />

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {previews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="font-semibold mb-1 block">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded-lg h-40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg">
            Save Post
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-orange-400 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Success / Error Modal */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => {
          setStatus({ ...status, open: false });
          onSaved();  // close form **AFTER** modal OK is clicked
        }}
      />
    </>
  );
}
