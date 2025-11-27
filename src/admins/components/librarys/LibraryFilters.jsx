import React from "react";

export default function DocumentFilters({ filters, setFilters, onSearch }) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({ type: "", year: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Type */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Type
          </label>
          <input
            type="text"
            placeholder="Search Type"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
            value={filters.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </div>

        {/* Year */}
        <div className="w-32">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Year
          </label>
          <input
            type="number"
            placeholder="2025"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
            value={filters.year}
            onChange={(e) => handleChange("year", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
