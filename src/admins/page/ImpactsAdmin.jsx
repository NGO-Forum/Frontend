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
        <div className="p-2 max-w-full mx-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-green-700">Impacts Management</h1>

                <button
                    onClick={openCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    + Add New
                </button>
            </div>

            {/* TABLE / LOADING / EMPTY */}
            {loading ? (
                <p className="text-gray-500">Loading impacts...</p>
            ) : impacts.length === 0 ? (
                <div className="text-center py-16 bg-gray-100 rounded-lg text-gray-600">
                    No impacts found.
                </div>
            ) : (
                <ImpactTable
                    impacts={impacts}
                    loadImpacts={loadImpacts}
                    setEditing={(impact) => {
                        setEditingImpact(impact);
                        setShowForm(true);
                    }}
                />
            )}

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