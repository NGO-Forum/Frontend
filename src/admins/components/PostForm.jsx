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
          (img) => `https://api.ngoforum.site/storage/${img}`
        ) || []
      );

      if (editingPost.file) {
        setOldFile(`https://api.ngoforum.site/storage/${editingPost.file}`);
      }
    }
  }, [editingPost]);


  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  // Select new images
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    const updatedNewImages = [...newImages, ...files];
    setNewImages(updatedNewImages);

    const updatedPreview = [
      ...oldImages.map((img) => `https://api.ngoforum.site/storage/${img}`),
      ...updatedNewImages.map((img) => URL.createObjectURL(img))
    ];

    setPreviews(updatedPreview);
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

    // Send list of old images to keep
    form.append("keep_old_images", JSON.stringify(oldImages));

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

  const removeImage = (index) => {
    // If image is from old images (editing existing post)
    if (index < oldImages.length) {
      const updatedOld = [...oldImages];
      updatedOld.splice(index, 1);
      setOldImages(updatedOld);
    } else {
      // It's new images (after old images in preview)
      const newIndex = index - oldImages.length;
      const updatedNew = [...newImages];
      updatedNew.splice(newIndex, 1);
      setNewImages(updatedNew);
    }

    // Remove from preview list
    const updatedPreview = [...previews];
    updatedPreview.splice(index, 1);
    setPreviews(updatedPreview);
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
            <label className="font-semibold mb-2">Images</label>

            {/* Hidden file input */}
            <input
              type="file"
              id="imagePicker"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />

            {/* Add Image Button */}
            <button
              type="button"
              onClick={() => document.getElementById("imagePicker").click()}
              className="bg-green-600 text-white px-4 py-1 rounded-lg w-fit mb-3"
            >
              + Add
            </button>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={src}
                      className="w-20 h-20 object-cover rounded border"
                    />

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      X
                    </button>
                  </div>
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
