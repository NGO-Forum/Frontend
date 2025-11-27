import { useEffect, useState } from "react";
import { api } from "../../API/api";
import PostForm from "../components/PostForm";
import MenuButton from "../components/MenuButton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

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
    path ? `http://44.205.95.55/storage/${path}` : "/images/no-image.png";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700">Posts / News</h1>
        <button
          onClick={handleNew}
          className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800"
        >
          + New Post
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
                        ? imgUrl(p.images[0])
                        : "/images/no-image.png"
                    }
                    alt={p.title}
                    className="h-8 w-8 object-cover rounded-full"
                  />
                </td>

                <td className="px-4 py-2">{p.title}</td>

                <td className="px-4 py-2">
                  {p.published_at
                    ? new Date(p.published_at).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-2">
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
      <div className="flex justify-center items-center gap-4 mt-6 mb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="p-2 text-gray-700 text-xl disabled:opacity-30"
        >
          ‹‹
        </button>

        {[...Array(lastPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-10 h-10 rounded-full font-semibold text-lg
              ${page === i + 1 ? "bg-green-700 text-white" : "bg-white shadow"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === lastPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="p-2 text-gray-700 text-xl disabled:opacity-30"
        >
          ››
        </button>
      </div>

      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
