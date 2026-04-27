import { useEffect, useState } from "react";
import { api } from "../API/api";
import ApplyForm from "../components/ApplyForm";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // <-- for modal
  const [showApplyForm, setShowApplyForm] = useState(false);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const loadJobs = async (page = 1) => {
    try {
      const res = await api.get("/jobs", {
        params: { page },
      });

      setJobs(res.data.data || []);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
      });
    } catch (error) {
      console.error("Failed to load jobs:", error);
    }
  };

  useEffect(() => {
    loadJobs(1);
  }, []);

  const getTitle = (title) => {
    if (!title) return "No title";

    const isMobile = window.innerWidth < 640; // Tailwind sm breakpoint
    const maxLength = isMobile ? 30 : 120;

    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const formatDate = (date) => {
    if (!date) return "Open Until Filled";
    return new Date(date).toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  return (
    <section>
      {/* HERO IMAGE + TITLE */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/GetInvolved/career.png"
          alt="Career Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="absolute inset-0 flex justify-center items-center 
                   text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          Career
        </h1>
      </div>

      <div className="max-w-full mx-auto px-6 py-12">

        <section className="max-w-8xl mx-auto mb-4 lg:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-green-700 mb-4">
            Open Positions
          </h2>

          <p className="text-sm md:text-lg text-gray-700 mb-3">
            NGO Forum is seeking dedicated <span className="font-semibold">Staff</span> and
            motivated <span className="font-semibold">Interns</span> to join our mission of promoting
            sustainable development and strengthening community voices in Cambodia.
            We offer a supportive work environment, professional growth opportunities, and
            competitive benefits for staff, while interns gain valuable hands-on experience
            and mentorship.
            If you’re passionate about making a positive impact, explore our available
            opportunities and become part of the NGO Forum team.
          </p>
        </section>

        <div className="space-y-8">

          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between 
                 border border-green-200 bg-green-50 hover:bg-green-100 rounded-lg p-4 transition"
            >
              {/* LEFT — IMAGE + TITLE */}
              <div className="flex items-center gap-4">
                {job.image ? (
                  <img
                    src={`https://api.ngoforum.org.kh/storage/${job.image}`}
                    alt={job.title}
                    className="w-10 md:w-16 h-10 md:h-16 object-cover rounded-xl border"
                  />
                ) : (
                  <img
                    src="/images/GetInvolved/card.png"
                    alt="Career Banner"
                    className="w-10 md:w-16 h-10 md:h-16 object-cover rounded-xl border"
                  />
                )}
                <div>
                  <h3 className="text-sm lg:text-lg font-bold text-green-600">
                    {getTitle(job.title)}
                  </h3>

                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    <span className="font-semibold">Closing Date:</span> {formatDate(job.closing_date)}
                  </p>
                </div>
              </div>

              {/* RIGHT — LOCATION + TYPE (MOBILE STACK) */}
              <div className="mt-2 md:mt-4 flex flex-row md:flex-col justify-start items-center text-left md:text-right">
                <p className="text-gray-700 text-sm md:text-base mr-6">Phnom Penh</p>

                <p className="text-blue-600 font-semibold mt-1 text-sm md:text-base">
                  Full Time
                </p>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <p className="text-center text-xl md:text-2xl font-semibold text-green-500">
              Career coming soon.
            </p>
          )}
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
          <p className="text-sm text-slate-600">
            Page <span className="font-semibold">{pagination.current_page}</span> of{" "}
            <span className="font-semibold">{pagination.last_page}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={pagination.current_page === 1}
              onClick={() => loadJobs(pagination.current_page - 1)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => loadJobs(pagination.current_page + 1)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ======================= DETAIL MODAL ======================= */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-auto">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-4 text-red-600 hover:text-red-700 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-base lg:text-xl font-bold text-green-700">{selectedJob.title}</h2>

            <p className="mt-2 text-gray-600 text-sm md:text-lg">
              <strong>Closing Date:</strong> {formatDate(selectedJob.closing_date)}
            </p>

            {selectedJob.department && (
              <p className="mt-2 text-gray-700 text-sm md:text-lg">
                <strong>Department:</strong> {selectedJob.department}
              </p>
            )}

            <div className="mt-2 text-gray-700 text-sm md:text-lg">
              <strong>Email:</strong>{" "}
              <a href="mailto:job@ngoforum.org.kh" className="text-blue-600 underline">
                job@ngoforum.org.kh
              </a>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-2 md:mt-6">
              <h3 className="text-sm md:text-lg font-bold text-green-700 mb-1 md:mb-3">Job Description</h3>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>

            {/* REQUIREMENTS */}
            {selectedJob.requirements && (
              <div className="mt-2 md:mt-6">
                <h3 className="text-sm md:text-lg font-bold text-green-700 mb-3">Requirements</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-xs md:text-sm">
                  {selectedJob.requirements
                    ?.split("\n")
                    .filter((r) => r.trim() !== "")
                    .map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </div>
            )}

            {selectedJob.attachment && (
              <div className="mt-2 md:mt-6 w-[180px]">
                <a
                  href={`https://api.ngoforum.org.kh/storage/${selectedJob.attachment}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Document TOR
                </a>
              </div>
            )}


            {/* Apply button */}
            <div className="mt-4 md:mt-8">
              <button
                onClick={() => setShowApplyForm(true)}
                className="bg-green-700 text-white px-6 py-2 md:py-3 rounded-lg shadow hover:bg-green-800 transition"
              >
                Apply Now
              </button>
            </div>

          </div>
        </div>
      )}

      {/* APPLY FORM MODAL */}
      {showApplyForm && selectedJob && (
        <ApplyForm
          job={selectedJob}
          onClose={() => setShowApplyForm(false)}
        />
      )}
    </section>
  );
}
