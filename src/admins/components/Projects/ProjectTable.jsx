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
    <div className="overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white">
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
          {projects.map((p) => (
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
          ))}
        </tbody>

      </table>
    </div>
  );
}
