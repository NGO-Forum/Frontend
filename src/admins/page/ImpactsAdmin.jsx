// src/components/impacts/ImpactsAdmin.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../../API/api';
import ImpactForm from '../components/ImpactForm';
import ImpactTable from '../components/ImpactTable';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import StatusModal from '../components/StatusModal';

export default function ImpactsAdmin() {
    // STATE
    const [impacts, setImpacts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingImpact, setEditingImpact] = useState(null);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Pagination logic
    const totalPages = Math.ceil(impacts.length / itemsPerPage);

    const currentImpacts = impacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const [status, setStatus] = useState({
        open: false,
        type: "success",
        message: "",
    });

    // LOAD DATA
    useEffect(() => {
        loadImpacts();
    }, []);

    const loadImpacts = async () => {
        setLoading(true);
        try {
            const res = await api.get("/impacts");
            setImpacts(res.data);
            setCurrentPage(1);
        } catch (error) {
            console.error(error);
            showStatus("error", "Failed to load impacts.");
        } finally {
            setLoading(false);
        }
    };

    // STATUS HANDLER
    const showStatus = (type, message) => {
        setStatus({ open: true, type, message });
    };

    // FORM ACTION CONTROLLERS
    const openCreate = () => {
        setEditingImpact(null);
        setShowForm(true);
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/impacts/${deleteId}`);
            showStatus("success", "Impact deleted successfully.");
            setShowDelete(false);
            loadImpacts();
        } catch (error) {
            console.error(error);
            showStatus("error", "Failed to delete impact.");
        }
    };

    return (
        <div className="max-w-full mx-auto">
            {/* HEADER */}
            <div className="relative mb-3 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">

                <div className="relative flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">

                    {/* Title Section */}
                    <div className="flex items-center gap-4">

                        {/* Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M9 11l-4 4m0 0l4 4m-4-4h13" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Impacts Management
                            </h1>
                            <p className="text-sm text-slate-500">
                                Manage impact indicators, tracking, and reporting
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] hover:shadow-lg"
                    >
                        <span className="text-lg">+</span>
                        Add Impact
                    </button>
                </div>
            </div>

            {/* TABLE / LOADING / EMPTY */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2">
                    <div>
                        <h2 className="text-lg font-bold text-green-700">Impacts Management List</h2>
                    </div>
                </div>
                {loading ? (
                    <p className="text-gray-500">Loading impacts...</p>
                ) : impacts.length === 0 ? (
                    <div className="text-center py-16 bg-gray-100 rounded-lg text-gray-600">
                        No impacts found.
                    </div>
                ) : (
                    <ImpactTable
                        impacts={currentImpacts}
                        loadImpacts={loadImpacts}
                        setEditing={(impact) => {
                            setEditingImpact(impact);
                            setShowForm(true);
                        }}
                    />
                )}

                {/* Pagination */}
                {impacts.length > itemsPerPage && (
                    <div className="mt-2 flex flex-col gap-4 bg-white px-5 py-2 shadow-sm md:flex-row md:items-center md:justify-between">

                        <div className="text-sm text-slate-600">
                            Showing{" "}
                            <span className="font-bold text-slate-800">
                                {(currentPage - 1) * itemsPerPage + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-bold text-slate-800">
                                {Math.min(currentPage * itemsPerPage, impacts.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-bold text-emerald-700">
                                {impacts.length}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">

                            {/* Prev */}
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${currentPage === 1
                                    ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                                    : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700"
                                    }`}
                            >
                                Prev
                            </button>

                            {/* Numbers */}
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`h-10 min-w-[40px] rounded-xl text-sm font-bold transition ${currentPage === i + 1
                                        ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md"
                                        : "border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* Next */}
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }
                                disabled={currentPage === totalPages}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${currentPage === totalPages
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

            {/* FORM MODAL */}
            {showForm && (
                <ImpactForm
                    open={showForm}
                    editingImpact={editingImpact}
                    onClose={() => setShowForm(false)}
                    onSaved={async () => {
                        setShowForm(false);
                        await loadImpacts();
                        showStatus(
                            "success",
                            editingImpact ? "Impact updated." : "Impact created."
                        );
                    }}
                />
            )}

            {/* DELETE MODAL */}
            <DeleteConfirmModal
                open={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={confirmDelete}
            />

            {/* STATUS MODAL */}
            <StatusModal
                open={status.open}
                type={status.type}
                message={status.message}
                onClose={() => setStatus({ ...status, open: false })}
            />
        </div>
    );
}