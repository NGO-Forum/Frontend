import React, { useEffect, useState } from "react";
import { api } from "../../API/api";

import LibraryFilters from "../components/librarys/LibraryFilters";
import LibraryForm from "../components/librarys/LibraryForm";
import LibraryTable from "../components/librarys/LibraryTable";

export default function LibraryAdmin() {
  const [librarys, setLibrarys] = useState([]);
  const [editLibrary, setEditLibrary] = useState(null);
  const [filters, setFilters] = useState({ type: "", year: "" });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const fetchLibrarys = async (page = 1) => {
    try {
      setLoading(true);

      const res = await api.get("/librarys", {
        params: {
          type: filters.type,
          year: filters.year,
          page: page,
        },
      });

      const paginated = res.data.data; // paginator object

      setLibrarys(paginated.data);

      setPagination({
        current_page: paginated.current_page,
        last_page: paginated.last_page,
        total: paginated.total,
      });

    } catch (err) {
      console.error(err);
      alert("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrarys(1);
  }, [filters]);

  return (
    <div className="min-h-full bg-slate-100">
      <div className="max-w-7xl mx-auto px-2">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              Library
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage joint statements and other documents.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setEditLibrary(null);
                setShowForm(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              + Create
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-4">
          <LibraryFilters
            filters={filters}
            setFilters={setFilters}
            onSearch={() => fetchLibrarys(1)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h2 className="font-semibold text-green-700">Documents List</h2>
            {loading && <span className="text-xs text-slate-500">Loading...</span>}
          </div>

          <div className="overflow-x-auto">
            <LibraryTable
              librarys={librarys}
              setEditLibrary={(library) => {
                setEditLibrary(library);
                setShowForm(true);
              }}
              onDelete={() => fetchLibrarys(pagination.current_page)}
            />
          </div>

          {/* PAGINATION */}
          <div className="px-4 py-2 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <button
              disabled={pagination.current_page === 1}
              onClick={() => fetchLibrarys(pagination.current_page - 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                pagination.current_page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              ← Prev
            </button>

            <div className="text-sm text-slate-700">
              Page {pagination.current_page} of {pagination.last_page}
            </div>

            <button
              disabled={pagination.current_page >= pagination.last_page}
              onClick={() => fetchLibrarys(pagination.current_page + 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                pagination.current_page >= pagination.last_page
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>

            <LibraryForm
              editLibrary={editLibrary}
              setEditLibrary={setEditLibrary}
              onSuccess={() => {
                fetchLibrarys(1);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
