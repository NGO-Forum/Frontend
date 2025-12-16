import { useEffect, useState } from "react";
import { api } from "../../API/api";

const PER_PAGE = 10;

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadComments = async () => {
    try {
      const res = await api.get("/comments");
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load admin comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  // 🔢 Pagination logic
  const totalPages = Math.ceil(comments.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginated = comments.slice(start, start + PER_PAGE);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading comments...</p>;
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl text-green-700 font-semibold mb-6">
        The Feedback
      </h1>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-green-600 text-left text-white">
            <tr>
              <th className="px-3 py-3">Images</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-2 py-3">Gender</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-3 py-3">
                  {Array.isArray(c.images) ? c.images.length : 0}
                </td>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-2 py-3 capitalize">{c.gender || "-"}</td>
                <td className="px-4 py-3 max-w-xs truncate">
                  {c.description || "-"}
                </td>
                <td className="px-4 py-3">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
