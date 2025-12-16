import { useState } from "react";
import { api } from "../API/api";

export default function CommentFormCard({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    gender: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState({
    comment: false,
    images: false,
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);

    if (options.comment && form.description)
      data.append("description", form.description);

    if (form.gender) {
      data.append("gender", form.gender);
    }

    if (options.images)
      images.forEach((img) => data.append("images[]", img));

    try {
      await api.post("/comments", data);

      setForm({
        name: "",
        email: "",
        gender: "",
        description: "",
      });
      setImages([]);
      setOptions({
        comment: false,
        images: false,
      });

      onSuccess();

    } finally {
      setLoading(false);
    }
  };

  const isValid =
    form.gender &&
    (options.comment || options.images);

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl shadow-lg border border-gray-100
      p-6 md:p-8 w-full"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-green-700">
          Your Comment or Feedback
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Share your thoughts and feedback with NGOF
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Gender
        </label>

        <div className="flex gap-6 text-sm">
          {["male", "female", "other"].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={g}
                className="accent-green-600"
                checked={form.gender === g}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value })
                }
              />
              <span>
                {g === "male" && "♂ Male"}
                {g === "female" && "♀ Female"}
                {g === "other" && "⚧ Other"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Content Options */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          What would you like to add?
        </label>

        <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
          {[
            ["comment", "Comment"],
            ["images", "Images"],
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-green-600"
                checked={options[key]}
                onChange={() =>
                  setOptions({
                    ...options,
                    [key]: !options[key],
                  })
                }
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Comment */}
      {options.comment && (
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            focus:ring-2 focus:ring-green-500"
            placeholder="Enter your message or feedback"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />
        </div>
      )}

      {/* Images */}
      {options.images && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload Images
          </label>
          <label
            className="flex items-center justify-center border-2 border-dashed
            border-gray-300 rounded-lg p-4 cursor-pointer
            hover:border-green-500 transition text-sm"
          >
            Click to upload images
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setImages([...e.target.files])}
            />
          </label>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-full h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        disabled={loading || !isValid}
        className="w-full md:w-auto bg-green-600 hover:bg-green-700
        text-white px-6 py-3 rounded-lg font-medium transition
        disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
