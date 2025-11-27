import React, { useEffect, useState } from "react";
import { api } from "../API/api";
import PDFThumbnail from "../components/PDFThumbnail";

export default function MediaContact() {
  const [contacts, setContacts] = useState([]);
  const [documents, setDocuments] = useState([]); // array only
  const [types, setTypes] = useState([]);
  const [years, setYears] = useState([]);

  const [filterType, setFilterType] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const imgUrl = (path) =>
    path ? `http://44.205.95.55/storage/${path}` : "/images/no-image.png";

  // -------------------------------------------------------
  // LOAD CONTACT PEOPLE
  // -------------------------------------------------------
  const loadContacts = async () => {
    try {
      const res = await api.get("/media");
      const all = res.data;

      const executives = all.filter((p) =>
        (p.role || "").toLowerCase().includes("executive director")
      );

      const managers = all.filter((p) => {
        const role = (p.role || "").toLowerCase();
        return role.includes("riti") && !role.includes("executive director");
      });

      setContacts([...executives, ...managers]);
    } catch (err) {
      console.error("Failed to load contacts:", err);
    }
  };

  // -------------------------------------------------------
  // LOAD DOCUMENTS (NEW API FORMAT)
  // -------------------------------------------------------
  const loadDocuments = async () => {
    try {
      const res = await api.get("/documents", {
        params: {
          type: filterType,
          year: filterYear,
          page: page,
        },
      });

      // Backend returns:
      // data: [...documents...]
      // current_page
      // last_page
      // total
      setDocuments(res.data.data);
      setPage(res.data.current_page);
      setLastPage(res.data.last_page);

      // If you want types/years filters, load them separately or remove them.
      // Currently your backend does NOT return them.
      // So we empty them:
      setTypes([]);
      setYears([]);

    } catch (err) {
      console.error("Failed to load documents:", err);
    }
  };

  // Load contacts once
  useEffect(() => {
    loadContacts();
  }, []);

  // Load documents whenever filters or page changes
  useEffect(() => {
    loadDocuments();
  }, [page, filterType, filterYear]);



  return (
    <div className="w-full bg-white">

      {/* HERO BANNER */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/ResourceHub/medai.png"
          alt="Media Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <h1 className="absolute inset-0 flex justify-center items-center
                       text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          Media Centre
        </h1>
      </div>

      {/* CONTACT PERSON AREA */}
      <div className="max-w-full bg-gray-100 mx-auto px-4 lg:px-12 py-14 grid grid-cols-1 lg:grid-cols-3">

        {/* LEFT */}
        <div className="flex items-center justify-center lg:justify-start mb-10 lg:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 leading-[1.5] tracking-wide">
            Media Contact Person
          </h2>

        </div>

        {/* RIGHT */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 lg:gap-12 gap-4 px-6 lg:px-0">
          {contacts.length === 0 && (
            <p className="text-gray-600 text-lg">Loading...</p>
          )}

          {contacts.map((p, i) => (
            <div key={i} className="text-center">
              <h3 className="text-xl font-bold text-green-800">{p.name}</h3>
              <p className="text-green-600 mt-1">{p.role}</p>

              <div className="mt-5 w-[230px] h-[230px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]
                              mx-auto rounded-full overflow-hidden shadow-md">
                <img
                  src={imgUrl(p.img)}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-gray-700 mt-4">{p.email}</p>
              <p className="text-gray-700 mt-1">{p.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DOCUMENTS AREA */}
      <div className="max-w-full mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 lg:gap-8">

        {/* FILTERS */}
        <div className="col-span-1 lg:space-y-8 space-y-4 lg:mb-0 mb-6">

          {/* FILTER BY TYPE */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Filter by Type</label>
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

          {/* FILTER BY YEAR */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Filter by Year</label>
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

        {/* DOCUMENT CARDS */}
        <div className="col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="relative bg-white rounded-br-3xl rounded-bl-3xl 
                shadow-md hover:shadow-xl 
                hover:scale-[1.05] 
                transition-all duration-300 
                flex flex-col"
            >
              {/* TYPE BADGE */}
              <div className="absolute bg-green-700 text-white text-xs px-3 py-1 rounded-br-3xl font-semibold shadow">
                {doc.type}
              </div>

              {/* THUMBNAIL */}
              <PDFThumbnail fileUrl={`http://44.205.95.55/storage/${doc.file_kh}`} className="w-full lg:h-[350px] h-[200px] md:h-[300px]" />
              {/* <img src={imgUrl(doc.thumbnail)} className="w-full lg:h-[350px] h-[200px] md:h-[300px]" /> */}

              {/* TITLE */}
              <p className="mt-2 text-center font-semibold text-gray-800 leading-snug line-clamp-2">
                {doc.title}
              </p>

              {/* DOWNLOAD BUTTONS */}
              <div className="flex justify-center gap-8 mt-4 text-gray-700 pb-4">

                {/* KH DOWNLOAD */}
                {doc.file_kh ? (
                  <a
                    href={imgUrl(doc.file_kh)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-medium hover:text-green-700"
                  >
                    ⬇ KH
                  </a>
                ) : (
                  <span className="opacity-40">KH</span>
                )}

                {/* EN Download */}
                {doc.file_en ? (
                  <a
                    href={imgUrl(doc.file_en)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-medium hover:text-green-700"
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
      <div className="flex justify-center items-center gap-4 lg:mb-12 mb-6">

        {/* PREVIOUS */}
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="p-2 text-gray-700 text-xl disabled:opacity-30"
        >
          ‹‹
        </button>

        {/* PAGE NUMBERS */}
        {[...Array(lastPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-10 h-10 rounded-full font-semibold text-lg lg:text-xl
                ${page === i + 1
                ? "bg-green-700 text-white"
                : "bg-white shadow"}`}
          >
            {i + 1}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={page === lastPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="p-2 text-gray-700 text-xl disabled:opacity-30"
        >
          ››
        </button>
      </div>
    </div>
  );
}
