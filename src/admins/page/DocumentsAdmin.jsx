// src/admin/DocumentsAdmin.jsx
import React, { useEffect, useState, useMemo } from "react";
import { api } from "../../API/api";

import DocumentForm from "../components/documents/DocumentForm";
import DocumentTable from "../components/documents/DocumentTable";
import DocumentFilters from "../components/documents/DocumentFilters";

export default function DocumentsAdmin() {
  const [documents, setDocuments] = useState([]);
  const [editDoc, setEditDoc] = useState(null);
  const [filters, setFilters] = useState({ title: "", type: "", year: "" });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const availableTypes = useMemo(() => {
    if (!documents || documents.length === 0) return [];

    // Extract 'type' from each doc, remove empty values, and get unique strings
    const uniqueTypes = [
      ...new Set(documents.map((doc) => doc.type).filter(Boolean)),
    ];

    return uniqueTypes.sort(); // Optional: sort them alphabetically
  }, [documents]);

  const fetchDocuments = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get("/documents", {
        params: {
          title: filters.title,
          type: filters.type,
          year: filters.year,
          page: page, // load correct page
        },
      });

      setDocuments(res.data.data);

      // Save pagination info
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  // Run when filters change → always reset to page 1
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDocuments(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [filters]);

  return (
    <div className="min-h-full bg-slate-100">
      <div className="max-w-full mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3 p-4 bg-white rounded-lg">
          <div>
            <div className="flex items-center gap-3">
              {/* Icon for the Title */}
              <div className="p-2 bg-green-50 rounded-lg">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-green-700 tracking-tight">
                Documents
              </h1>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-2 ml-11">
              Manage joint statements and other documents.
            </p>
          </div>

          <div className="flex items-center">
            {/* CREATE BUTTON */}
            <button
              onClick={() => {
                setEditDoc(null);
                setShowForm(true);
              }}
              className="group flex items-center gap-2 px-7 py-3 rounded-full bg-gray-900 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-xl active:scale-95 active:bg-green-700"
            >
              <svg
                className="w-5 h-5 text-green-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>Create</span>
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-4">
          <DocumentFilters
            filters={filters}
            setFilters={setFilters}
            availableTypes={availableTypes}
            onSearch={() => fetchDocuments(1)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 max-h-[65vh] scrollbar overflow-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h2 className="font-semibold text-green-700">Documents List</h2>
            {loading && (
              <span className="text-xs text-slate-500">Loading...</span>
            )}
          </div>

          <div className="overflow-x-auto">
            <DocumentTable
              documents={documents}
              setEditDoc={(doc) => {
                setEditDoc(doc);
                setShowForm(true);
              }}
              onDelete={() => fetchDocuments(pagination.current_page)}
            />
          </div>

          {/* PAGINATION UI */}
          <div className="px-6 py-2 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Page</span>
              <span className="text-sm font-bold text-slate-700">{pagination.current_page} <span className="text-slate-300 font-normal">/</span> {pagination.last_page}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={pagination.current_page === 1}
                onClick={() => fetchDocuments(pagination.current_page - 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-slate-200 text-slate-600 hover:border-green-500 hover:text-green-600 shadow-sm active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Prev
              </button>

              <button
                disabled={pagination.current_page >= pagination.last_page}
                onClick={() => fetchDocuments(pagination.current_page + 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-slate-200 text-slate-600 hover:border-green-500 hover:text-green-600 shadow-sm active:scale-95"
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
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

            <DocumentForm
              editDoc={editDoc}
              setEditDoc={setEditDoc}
              onSuccess={() => {
                fetchDocuments(1);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
