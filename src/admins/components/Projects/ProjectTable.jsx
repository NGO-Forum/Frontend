import React, { useState } from "react";
import MenuButton from "../MenuButton";

export default function ProjectTable({ projects, onEdit, onDelete }) {

  // Format date dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };


  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Donor</th>
            <th className="px-4 py-3 text-left">Program</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.length > 0 ? (
            projects.map((p) => (
              <tr key={p.id} className="border-t hover:bg-green-50 transition">

                <td className="px-4 py-1 whitespace-nowrap">
                  {p.image_urls?.length > 0 ? (
                    <img
                      src={p.image_urls[0]}
                      className="h-10 w-10 object-cover rounded-full border shadow"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>

                <td className="px-4 py-1 font-medium text-gray-700 whitespace-nowrap max-w-[300px] truncate">
                  {p.name}
                </td>

                <td className="px-4 py-1 whitespace-nowrap max-w-[200px] truncate">
                  {p.donor || "—"}
                </td>

                <td className="px-4 py-1 whitespace-nowrap">
                  {p.department || "—"}
                </td>

                <td className="px-4 py-1 text-gray-600 whitespace-nowrap">
                  {p.duration_start && p.duration_end
                    ? `${formatDate(p.duration_start)} - ${formatDate(p.duration_end)}`
                    : "—"}
                </td>

                <td className="px-4 py-1 text-center whitespace-nowrap">
                  <MenuButton
                    onEdit={() => onEdit(p)}
                    onDelete={() => onDelete(p.id)}
                  />
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-14">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M3 7h18M3 12h18M3 17h18"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-700">
                    No projects found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Start by adding a new project.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}
