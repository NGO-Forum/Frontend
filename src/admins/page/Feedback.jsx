import { useEffect, useMemo, useState } from "react";
import { api } from "../../API/api";

const PER_PAGE = 6;

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadComments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/comments");
      const data = Array.isArray(res.data) ? res.data : [];
      setComments(data);
      setPage(1);
    } catch (err) {
      console.error("Failed to load admin comments", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const totalPages = Math.ceil(comments.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return comments.slice(start, start + PER_PAGE);
  }, [comments, page]);

  const startItem = comments.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const endItem = Math.min(page * PER_PAGE, comments.length);

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="relative mb-4 overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-sm">

        <div className="relative flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h5m-7 6h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-green-700">
                The Feedback
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Review feedback submitted by users and community members
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center sm:min-w-[150px]">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Total Feedback
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-800">
                {comments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="rounded-[24px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm font-medium text-slate-500">Loading comments...</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-green-700">Comments List</h2>
                <p className="text-sm text-slate-500">
                  Showing submitted feedback records
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
                  <tr className="text-left">
                    <th className="px-5 py-4 font-semibold">Images</th>
                    <th className="px-5 py-4 font-semibold">Name</th>
                    <th className="px-5 py-4 font-semibold">Email</th>
                    <th className="px-5 py-4 font-semibold">Gender</th>
                    <th className="px-5 py-4 font-semibold">Comment</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {paginated.length > 0 ? (
                    paginated.map((c) => (
                      <tr
                        key={c.id}
                        className="transition duration-200 hover:bg-emerald-50/40"
                      >
                        <td className="px-5 py-4">
                          <span className="inline-flex min-w-[42px] justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {Array.isArray(c.images) ? c.images.length : 0}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800">
                            {c.name || "-"}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {c.email || "-"}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                            {c.gender || "-"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div
                            className="max-w-xs truncate text-slate-600"
                            title={c.description || "-"}
                          >
                            {c.description || "-"}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {c.created_at
                            ? new Date(c.created_at).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-7 w-7"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.8}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 10h8M8 14h5m-7 6h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-base font-semibold text-slate-700">
                            No comments found
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            There is no feedback data to display yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-2 flex flex-col gap-4 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-bold text-slate-800">{startItem}</span> to{" "}
                  <span className="font-bold text-slate-800">{endItem}</span> of{" "}
                  <span className="font-bold text-emerald-700">{comments.length}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${page === 1
                      ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700"
                      }`}
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-10 min-w-[40px] rounded-xl text-sm font-bold transition ${page === i + 1
                        ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${page === totalPages
                      ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700"
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}