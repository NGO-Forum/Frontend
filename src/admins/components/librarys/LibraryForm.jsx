import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../API/api";
import StatusModal from "../StatusModal";

export default function LiraryForm({ editLibrary, setEditLibrary, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [status, setStatus] = useState({
    open: false,
    type: "",
    message: "",
  });

  // Load edit values
  useEffect(() => {
    if (editLibrary) {
      reset({
        title: editLibrary.title,
        type: editLibrary.type,
        year: editLibrary.year,
      });
    } else {
      reset({
        title: "",
        type: "",
        year: "",
      });
    }
  }, [editLibrary, reset]);

  // ----------------- SUBMIT FORM -----------------
  const onSubmit = async (data) => {
    const form = new FormData();
    form.append("title", data.title);
    form.append("type", data.type);
    form.append("year", data.year);

    if (data.file_kh?.[0]) form.append("file_kh", data.file_kh[0]);
    if (data.file_en?.[0]) form.append("file_en", data.file_en[0]);

    try {
      if (editLibrary) {

        form.append("_method", "PUT");   // ⭐ REQUIRED ⭐

        await api.post(`/librarys/${editLibrary.id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setStatus({
          open: true,
          type: "success",
          message: "Document updated successfully!",
        });

      } else {
        await api.post("/librarys", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setStatus({
          open: true,
          type: "success",
          message: "Document created successfully!",
        });
      }

    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err);

      setStatus({
        open: true,
        type: "error",
        message: "Failed to save document.",
      });
    }
  };

  const isEditing = !!editLibrary;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-800">
          {isEditing ? "Edit Document" : "Create Document"}
        </h2>

        {isEditing && (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 border border-amber-100">
            Editing ID #{editLibrary.id}
          </span>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Title + Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <input
              {...register("type", { required: true })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Year */}
        <div className="w-32">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            {...register("year", { required: true })}
            type="number"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            placeholder="2024"
          />
        </div>

        {/* KH File */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-500">
            Khmer File (PDF/DOC/DOCX)
            {!isEditing && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            {...register("file_kh")}
            className="w-full border border-dashed border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50"
          />

          {isEditing && editLibrary.file_kh && (
            <a
              href={`${import.meta.env.VITE_APP_URL}/storage/${editLibrary.file_kh}`}
              target="_blank"
              className="text-xs text-blue-600 underline"
            >
              View current KH file
            </a>
          )}
        </div>

        {/* EN File */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-500">
            English File (optional)
          </label>
          <input
            type="file"
            {...register("file_en")}
            className="w-full border border-dashed border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50"
          />

          {isEditing && editLibrary.file_en && (
            <a
              href={`${import.meta.env.VITE_APP_URL}/storage/${editLibrary.file_en}`}
              target="_blank"
              className="text-xs text-blue-600 underline"
            >
              View current EN file
            </a>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            {isEditing ? "Update" : "Create"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setEditDoc(null);
                reset();
              }}
              className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Status Modal */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => {
          setStatus({ ...status, open: false });
          onSuccess(); // CLOSE FORM + REFRESH LIST
        }}
      />
    </div>
  );
}
