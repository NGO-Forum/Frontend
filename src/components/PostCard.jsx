import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function PostCard({ post }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const imgUrl = (path) => {
    if (!path) return "/images/no-image.png";
    return `http://44.205.95.55/storage/${path}`;
  };

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrent((prev) =>
        post.images && post.images.length > 0
          ? (prev + 1) % post.images.length
          : 0
      );
    }, 5000); // auto-play every 3 seconds

    return () => clearInterval(interval);
  }, [open, post.images]);

  const dateStr = post.published_at || post.created_at;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "";

  return (
    <>
      {/* Card */}
      <article
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded-3xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden w-full"
      >
        {/* Image */}
        <div className="h-56 w-full overflow-hidden">
          <img
            src={
              post.images && post.images.length > 0
                ? imgUrl(post.images[0])   // FIRST IMAGE
                : "/images/no-image.png"
            }
            alt={post.title}
            className="h-full w-full object-cover rounded"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-gray-700 line-clamp-3">
            {post.description}
          </p>

          <div className="mt-auto pt-4">
            <span className="text-sm lg:text-lg font-semibold text-green-600 flex items-center gap-1 hover:text-green-900">
              Read More ↗
            </span>
          </div>

        </div>
      </article>

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>

        {/* Fullscreen overlay */}
        {fullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]"
            onClick={() => setFullscreen(false)}
          >
            <img
              src={imgUrl(post.images[current])}
              className="max-w-full max-h-full object-contain"
              alt=""
            />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>

        {/* SLIDER WRAPPER */}
        <div className="relative w-full mb-4">

          {/* MAIN IMAGE */}
          <img
            src={imgUrl(post.images[current])}
            alt="Post"
            onClick={() => setFullscreen(true)}
            className="w-full max-h-80 rounded-lg object-cover cursor-zoom-in transition-opacity duration-500 opacity-100"
            key={current}
          />

          {/* LEFT ARROW */}
          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === 0 ? post.images.length - 1 : prev - 1
              )
            }
            className="absolute top-1/2 -translate-y-1/2 left-2 bg-black bg-opacity-40 text-white px-2 py-2 rounded-full hover:bg-opacity-80"
          >
            ❮
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() =>
              setCurrent((prev) =>
                post.images && post.images.length
                  ? (prev + 1) % post.images.length
                  : 0
              )
            }
            className="absolute top-1/2 -translate-y-1/2 right-2 bg-black bg-opacity-40 text-white px-2 py-2 rounded-full hover:bg-opacity-80"
          >
            ❯
          </button>
        </div>

        {/* DATE */}
        <p className="text-gray-500 text-sm mb-3">{formattedDate}</p>

        {/* TEXT */}
        <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-6">
          {post.description}
        </p>

        {/* Detail File */}
        {post.file && (
          <div className="mt-4">
            <a
              href={`http://44.205.95.55/storage/${post.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm lg:text-lg font-semibold text-green-600 hover:text-green-900"
            >
              View Document Detail ↗
            </a>
          </div>
        )}

      </Modal>

    </>
  );
}
