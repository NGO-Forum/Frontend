import { useEffect, useState } from "react";
import { api } from "../../API/api";
import PostForm from "../components/PostForm";
import MenuButton from "../components/MenuButton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Plus, Newspaper, LayoutGrid } from "lucide-react";

export default function PostAdmin() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadPosts = async () => {
    try {
      const res = await api.get("/posts", { params: { page } });
      setPosts(res.data.data);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const handleNew = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await api.delete(`/posts/${deleteItem.id}`);
      loadPosts();
    } catch (err) {
      alert("Failed to delete");
    }

    setShowDelete(false);
    setDeleteItem(null);
  };

  const imgUrl = (path) =>
    path ? `https://api.ngoforum.org.kh/storage/${path}` : "/images/no-image.png";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 p-5 bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-xl shadow-gray-200/40 transition-all hover:shadow-2xl hover:shadow-gray-300/50">

        <div className="flex items-center gap-5">
          {/* Icon Container with Gradient Background */}
          <div className="flex items-center justify-center h-14 w-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg shadow-green-200 text-white">
            <Newspaper size={28} strokeWidth={1.5} />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight leading-none">
              Posts <span className="text-green-600">&</span> News
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mt-1 flex items-center gap-1">
              <LayoutGrid size={12} /> Management Portal
            </span>
          </div>
        </div>

        <button
          onClick={handleNew}
          className="group flex items-center gap-2 px-7 py-3 rounded-full bg-gray-900 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-xl active:scale-95 active:bg-green-700"
        >
          <Plus
            size={18}
            className="transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
            strokeWidth={3}
          />
          <span>Create Post</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="w-full bg-white max-w-2xl p-6 mt-2 rounded-xl h-[95vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-700">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>
            </div>

            <PostForm
              editingPost={editingPost}
              onSaved={() => {
                setShowForm(false);
                setEditingPost(null);
                loadPosts();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingPost(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white bg-green-700">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Published</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={
                      p.images && p.images.length > 0
                        ? imgUrl(p.images[0])   // FIRST IMAGE
                        : "/images/no-image.png"
                    }
                    alt={p.title}
                    className="h-8 w-8 object-cover rounded-full"
                  />
                </td>

                <td className="px-4 py-2 whitespace-nowrap max-w-[250px] truncate">{p.title}</td>

                <td className="px-4 py-2">
                  {p.published_at
                    ? new Date(p.published_at).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-2 whitespace-nowrap max-w-[200px] truncate">
                  {p.description ? p.description.substring(0, 60) + "..." : "-"}
                </td>

                <td className="px-4 py-2 text-center relative">
                  <MenuButton
                    onEdit={() => handleEdit(p)}
                    onDelete={() => {
                      setDeleteItem(p);
                      setShowDelete(true);
                    }}
                  />
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4 px-2">
        <p className="text-sm text-gray-500">
          Showing page <span className="font-semibold text-gray-900">{page}</span> of <span className="font-semibold text-gray-900">{lastPage}</span>
        </p>

        <div className="flex items-center gap-1">
          {/* Prev Button */}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {(() => {
              let start = Math.max(1, page - 1);
              let end = Math.min(lastPage, start + 2);
              if (end - start < 2) start = Math.max(1, end - 2);

              return [...Array(end - start + 1)].map((_, i) => {
                const pageNum = start + i;
                const isActive = page === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`min-w-[36px] h-8 px-2 rounded-xl font-bold text-sm transition-all shadow-sm
                ${isActive
                        ? "bg-green-600 text-white shadow-green-200"
                        : "bg-white text-gray-600 hover:border-green-500 border border-transparent"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              });
            })()}
          </div>

          {/* Next Button */}
          <button
            disabled={page === lastPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}