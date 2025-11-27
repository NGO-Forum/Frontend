import { useEffect, useState } from "react";
import { api } from "../API/api";
import PostCard from "../components/PostCard";
import Modal from "../components/Modal";
export default function Latest() {
  const [posts, setPosts] = useState([]);
  const [recent, setRecent] = useState([]);
  const [filter, setFilter] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const openModal = (post) => {
    setActivePost(post);
    setCurrent(0);
    setOpen(true);
  };

  const imgUrl = (path) =>
    path ? `http://44.205.95.55/storage/${path}` : "/images/no-image.png";

  useEffect(() => {
    loadPosts();
  }, [filter, page]);

  const loadPosts = async () => {
    const res = await api.get("/posts", {
      params: {
        department: filter || undefined,
        page: page,
      },
    });

    const data = res.data.data;
    setPosts(data);

    // For sidebar always get latest 9 posts
    const rec = await api.get("/posts", { params: { limit: 9 } });
    const recData = rec.data.data || rec.data;
    setRecent(recData.slice(0, 9));

    setLastPage(res.data.last_page);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER BANNER */}
      <div className="relative w-full h-[150px] md:h-[180px]">
        <img
          src="/images/ResourceHub/bg.png"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="absolute inset-0 flex justify-center items-center 
                       text-white text-4xl md:text-5xl font-bold">
          Our Latest
        </h1>
      </div>

      <div className="max-w-8xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-0 md:gap-6 lg:gap-10">

        {/* LEFT SECTION */}
        <div className="col-span-3">

          {/* FILTER */}
          <div className="mb-6">
            <label className="font-semibold mb-2 block text-lg">Filter by Label</label>
            <select
              className="border px-4 py-2 rounded-lg w-full max-w-xs"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Show All</option>
              <option value="PALI">Event</option>
              <option value="RITI">Achievement</option>
              <option value="SACHAS">News</option>
              <option value="MACOR">Inclusive Growth</option>
              <option value="MACOR">Climate Resilience</option>
            </select>
          </div>

          {/* CARD GRID (3 PER ROW) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {posts.length === 0 && (
              <p className="text-gray-600 text-lg">No posts found.</p>
            )}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 lg:mt-12 mt-6">

            {/* PREV BUTTON */}
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="p-2 text-gray-700 text-xl disabled:opacity-30"
            >
              ‹‹
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(lastPage)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full font-semibold text-lg lg:text-xl
                  ${page === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-white shadow"}`}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT BUTTON */}
            <button
              disabled={page === lastPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 text-gray-700 text-xl disabled:opacity-30"
            >
              ››
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Latest Updated</h2>

          <div className="space-y-4">
            {recent.map((post) => (
              <div
                key={post.id}
                onClick={() => openModal(post)}
                className="cursor-pointer flex items-center gap-4 bg-white p-3 shadow rounded-xl hover:shadow-lg transition"
              >
                <img
                  src={
                    post.images?.length
                      ? imgUrl(post.images[0])
                      : "/images/no-image.png"
                  }
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-sm line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === MODAL === */}
      {open && activePost && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>

          {/* FULLSCREEN OVERLAY CLICK-ZOOM */}
          {fullscreen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]"
              onClick={() => setFullscreen(false)}
            >
              <img
                src={imgUrl(activePost.images[current])}
                className="max-w-full max-h-full object-contain"
                alt=""
              />
            </div>
          )}

          <h2 className="text-2xl font-bold mb-4">{activePost.title}</h2>

          {/* SLIDER */}
          <div className="relative w-full mb-4">

            <img
              src={imgUrl(activePost.images[current])}
              alt="Post"
              onClick={() => setFullscreen(true)}
              className="w-full max-h-80 rounded-lg object-cover cursor-zoom-in"
            />

            {/* LEFT ARROW */}
            <button
              onClick={() =>
                setCurrent((prev) =>
                  prev === 0 ? activePost.images.length - 1 : prev - 1
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
                  activePost.images && activePost.images.length
                    ? (prev + 1) % activePost.images.length
                    : 0
                )
              }
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-black bg-opacity-40 text-white px-2 py-2 rounded-full hover:bg-opacity-80"
            >
              ❯
            </button>

          </div>

          {/* DATE */}
          <p className="text-gray-500 text-sm mb-3">
            {activePost.published_at
              ? new Date(activePost.published_at).toLocaleDateString()
              : ""}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-6">
            {activePost.description}
          </p>
        </Modal>
      )}

    </div>
  );
}
