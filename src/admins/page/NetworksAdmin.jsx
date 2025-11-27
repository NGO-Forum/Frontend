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
        <div className="max-w-full mx-auto p-2">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-green-700">Networks</h1>

                <button
                    onClick={() => {
                        setEditingNetwork(null);
                        setShowForm(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    ➕ Create
                </button>
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
            <div className="grid gap-6 mt-6 overflow-y-auto max-h-[87vh] pr-2 scrollbar">
                {networks.map((network) => (
                    <div
                        key={network.id}
                        className="bg-white border border-gray-200 shadow-sm rounded-xl p-6"
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
