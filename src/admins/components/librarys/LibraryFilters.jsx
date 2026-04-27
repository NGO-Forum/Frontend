import React from "react";

export default function DocumentFilters({ filters, setFilters, onSearch, availableTypes = [] }) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({ title: "", type: "", year: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Search Name/Title */}
        <div className="flex-[2] min-w-[240px]">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            Search Name
          </label>
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              value={filters.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Document Type Dropdown */}
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            Category
          </label>
          <div className="relative group">
            <select
              className="w-full appearance-none border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all cursor-pointer"
              value={filters.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="">All Document Types</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {/* Custom Arrow Icon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white group-hover:text-green-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Year Input */}
        <div className="w-full md:w-36">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            Year
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder={new Date().getFullYear()}
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              value={filters.year}
              onChange={(e) => handleChange("year", e.target.value)}
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>

          <button
            type="button"
            onClick={onSearch}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
