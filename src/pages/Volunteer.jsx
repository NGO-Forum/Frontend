import { useEffect, useState } from "react";
import { api } from "../API/api";

export default function Volunteer() {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  useEffect(() => {
    api.get("/volunteers").then((res) => {
      setVolunteers(res.data);
    });
  }, []);

  return (
    <section>
      {/* HERO IMAGE + TITLE */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/GetInvolved/volunteer.PNG"
          alt="Volunteer Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="absolute inset-0 flex justify-center items-center 
          text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          Volunteer & Internship
        </h1>
      </div>

      {/* CONTENT */}
      <div className="max-w-full mx-auto px-4 py-4 lg:py-12 lg:px-12">

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-8">
          Meet Our Volunteers & Interns
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 gap-4">

          {volunteers.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVolunteer(v)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-200 overflow-hidden text-center p-6"
            >
              {/* PHOTO */}
              <div className="flex justify-center">
                {v.img ? (
                  <img
                    src={`http://44.205.95.55/storage/${v.img}`}
                    alt={v.name}
                    className="w-48 h-48 object-cover rounded-full border-2 border-green-600"
                  />
                ) : (
                  <img
                    src="/images/icon.jpg"
                    alt="No Photo"
                    className="w-48 h-48 object-cover rounded-full border-2 border-green-600"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-green-700">{v.name}</h3>

                <p className="mt-1 text-gray-600 text-sm">
                  {v.position || "Volunteer"}
                </p>

                <p className="mt-3 text-gray-500 text-sm line-clamp-2">
                  {v.description || "No description provided."}
                </p>

                {/* CONTACT */}
                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>📞 {v.phone || "N/A"}</p>
                  <p>✉ {v.email || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Empty */}
          {volunteers.length === 0 && (
            <p className="col-span-full text-center text-lg md:text-3xl font-bold">
              Volunteer and Intern Coming Soon
            </p>
          )}
        </div>

      </div>

      {/* ================= VOLUNTEER DETAIL MODAL ================= */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-auto">

            {/* Close button */}
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="absolute top-3 right-4 text-red-600 hover:text-red-800 text-3xl"
            >
              ×
            </button>

            {/* Image */}
            <div className="flex justify-center mb-6">
              <img
                src={
                  selectedVolunteer.img
                    ? `http://44.205.95.55/storage/${selectedVolunteer.img}`
                    : "/images/icon.jpg"
                }
                className="w-40 md:w-48 h-40 md:h-48 object-cover rounded-full border-4 border-green-600 shadow"
                alt={selectedVolunteer.name}
              />
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-green-700 text-center">
              {selectedVolunteer.name}
            </h2>

            {/* Position */}
            <p className="text-center text-gray-600 mt-1">
              Position: {selectedVolunteer.position || "Volunteer"}
            </p>

            {/* Department */}
            {selectedVolunteer.department && (
              <p className="text-center text-gray-500 mt-1 text-sm">
                Department: {selectedVolunteer.department}
              </p>
            )}

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-green-700">About</h3>
              <p className="text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
                {selectedVolunteer.description || "No description provided."}
              </p>
            </div>

            {/* Contact */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-green-700">Contact</h3>
              <div className="flex justify-around flex-col md:flex-row md:items-center mt-2">
                <p className="text-gray-700 mb-2 md:mb-0">📞 {selectedVolunteer.phone || "N/A"}</p>
                <p className="text-gray-700">✉ {selectedVolunteer.email || "N/A"}</p>
                </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
