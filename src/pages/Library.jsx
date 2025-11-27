import React, { useEffect, useState } from "react";
import { api } from "../API/api";
import PDFThumbnail from "../components/PDFThumbnail";

export default function Libray() {
  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [years, setYears] = useState([]);

  const [filterType, setFilterType] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const imgUrl = (p) =>
    p ? `http://44.205.95.55/storage/${p}` : "/images/no-image.png";

  const loadDocuments = async () => {
    try {
      const res = await api.get("/librarys", {
        params: {
          type: filterType,
          year: filterYear,
          page: page,
        },
      });

      const paginated = res.data.data; // paginator object

      setDocuments(paginated.data);
      setPage(paginated.current_page);
      setLastPage(paginated.last_page);

      setTypes(res.data.types);
      setYears(res.data.years);

    } catch (err) {
      console.error("Failed to load documents:", err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [page, filterType, filterYear]);

  return (
    <div className="w-full bg-white">

      {/* HERO */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/ResourceHub/library.jpg"
          alt="Library Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="absolute inset-0 flex justify-center items-center
                       text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          NGOF Library
        </h1>
      </div>

      {/* CONTENT */}
      <div className="max-w-full mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* FILTERS */}
        <div className="col-span-1 space-y-6">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Filter by Type
            </label>
            <select
              className="border px-4 py-2 rounded-lg w-full"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              {types.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Filter by Year
            </label>
            <select
              className="border px-4 py-2 rounded-lg w-full"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">All Years</option>
              {years.map((y, i) => (
                <option key={i} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* DOCUMENT LIST */}
        <div className="col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="relative bg-white rounded-br-3xl rounded-bl-3xl 
                         shadow-md hover:shadow-xl hover:scale-[1.05]
                         transition-all duration-300 flex flex-col"
            >
              <div className="absolute bg-green-700 text-white text-xs px-3 py-1 rounded-br-3xl">
                {doc.type}
              </div>

              {doc.file_kh && (
                <PDFThumbnail fileUrl={`http://44.205.95.55/storage/${doc.file_kh}`} />
              )}

              <p className="mt-2 text-center font-semibold text-gray-800 line-clamp-2">
                {doc.title}
              </p>

              <div className="flex justify-center gap-8 mt-4 text-gray-700 pb-4">
                {doc.file_kh ? (
                  <a
                    href={imgUrl(doc.file_kh)}
                    target="_blank"
                    className="hover:text-green-700"
                  >
                    ⬇ KH
                  </a>
                ) : (
                  <span className="opacity-40">KH</span>
                )}
                {doc.file_en ? (
                  <a
                    href={imgUrl(doc.file_en)}
                    target="_blank"
                    className="hover:text-green-700"
                  >
                    ⬇ EN
                  </a>
                ) : (
                  <span className="opacity-40">EN</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 text-xl disabled:opacity-30"
        >
          ‹‹
        </button>

        {[...Array(lastPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-10 h-10 rounded-full font-semibold text-lg
                       ${page === i + 1 ? "bg-green-700 text-white" : "bg-white shadow"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === lastPage}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 text-xl disabled:opacity-30"
        >
          ››
        </button>
      </div>

    </div>
  );
}
