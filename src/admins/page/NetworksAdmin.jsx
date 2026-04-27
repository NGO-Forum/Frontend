import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import NetworkForm from "../components/networks/NetworkForm";
import UploadModal from "../components/networks/FileUploadForm";
import FileList from "../components/networks/FileList";
import EditFileModal from "../components/networks/EditFileModal";
import StatusModal from "../components/StatusModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import MenuButton from "../components/networks/MenuButton";

export default function NetworksAdmin() {
    const [networks, setNetworks] = useState([]);
    const [editingNetwork, setEditingNetwork] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [currentNetwork, setCurrentNetwork] = useState(null);

    const [showEditFileModal, setShowEditFileModal] = useState(false);
    const [editingFile, setEditingFile] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


    // GLOBAL STATUS MODAL
    const [status, setStatus] = useState({
        open: false,
        type: "",
        message: "",
    });
    const showStatus = (type, message) => setStatus({ open: true, type, message });

    useEffect(() => {
        loadNetworks();
    }, []);

    const loadNetworks = async () => {
        try {
            const res = await api.get("/networks");
            setNetworks(res.data);
        } catch (error) {
            console.error("Failed to load networks:", error);
            showStatus("error", "Failed to load networks");
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/networks/${id}`);
            refresh();
            setShowDeleteModal(false);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="max-w-full mx-auto">
            {/* HEADER */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">

                <div className="relative flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">

                    {/* Title Section */}
                    <div className="flex items-center gap-4">

                        {/* Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5V4H2v16h5M9 20h6M12 16v4M8 8h8M8 12h6" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Networks
                            </h1>
                            <p className="text-sm text-slate-500">
                                Manage and organize all network groups
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => {
                            setEditingNetwork(null);
                            setShowForm(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] hover:shadow-lg"
                    >
                        <span className="text-lg">+</span>
                        Create Network
                    </button>
                </div>
            </div>

            {/* NETWORK FORM (Modal or inline as implemented) */}
            {showForm && (
                <NetworkForm
                    editingNetwork={editingNetwork}
                    setEditingNetwork={setEditingNetwork}
                    closeForm={() => setShowForm(false)}
                    refresh={loadNetworks}
                    showStatus={showStatus}
                />
            )}

            {/* NETWORK LIST */}
            <div className="grid gap-4 mt-4 overflow-y-auto max-h-[80vh] pr-2 scrollbar">
                {networks.map((network) => (
                    <div
                        key={network.id}
                        className="bg-white border border-gray-200 shadow-sm rounded-xl p-4"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">{network.name}</h2>

                            <div className="flex gap-2">
                                <MenuButton
                                    onEdit={() => {
                                        setEditingNetwork(network);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => {
                                        setDeleteId(network.id);
                                        setShowDeleteModal(true);
                                    }}
                                    onUpload={() => {
                                        setCurrentNetwork(network);
                                        setShowUploadModal(true);
                                    }}
                                />
                            </div>
                        </div>

                        {/* FILE LIST */}
                        <FileList
                            files={network.files}
                            refresh={loadNetworks}
                            onEditFile={(file) => {
                                setEditingFile(file);
                                setShowEditFileModal(true);
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Upload Modal (outside map) */}
            {showUploadModal && (
                <UploadModal
                    network={currentNetwork}
                    closeModal={() => setShowUploadModal(false)}
                    refresh={loadNetworks}
                    showStatus={showStatus}
                />
            )}

            {/* Edit File Modal */}
            {showEditFileModal && editingFile && (
                <EditFileModal
                    file={editingFile}
                    closeModal={() => setShowEditFileModal(false)}
                    refresh={loadNetworks}
                    showStatus={showStatus}
                />
            )}

            {/* Global Status Modal */}
            <StatusModal
                open={status.open}
                type={status.type}
                message={status.message}
                onClose={() => setStatus({ ...status, open: false })}
            />

            <DeleteConfirmModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => handleDelete(deleteId)}
            />
        </div>
    );
}
