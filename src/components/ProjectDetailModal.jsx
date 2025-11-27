import React, { useState, useEffect } from "react";

export default function ProjectDetailModal({ open, project, onClose }) {
    if (!open || !project) return null;
    const [current, setCurrent] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const images = project.image_urls || [];

    // Auto-slide every 5s
    useEffect(() => {
        if (!open || images.length < 2) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [open, images.length]);
    const formatOrdinalDate = (dateString) => {
        if (!dateString) return "—";

        const date = new Date(dateString);

        // Get date parts
        const day = date.getDate();
        const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
        const month = date.toLocaleDateString("en-GB", { month: "long" });
        const year = date.getFullYear();

        // Function to get ordinal suffix
        const getOrdinal = (n) => {
            if (n > 3 && n < 21) return n + "th"; // 11th, 12th, 13th...
            switch (n % 10) {
                case 1: return n + "st";
                case 2: return n + "nd";
                case 3: return n + "rd";
                default: return n + "th";
            }
        };

        return `${weekday}, ${getOrdinal(day)} ${month} ${year}`;
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white w-full max-w-3xl p-4 rounded-xl shadow-xl overflow-y-auto max-h-[85vh]">

                {/* IMAGE */}
                {/* FULLSCREEN IMAGE VIEW */}
                {fullscreen && (
                    <div
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
                        onClick={() => setFullscreen(false)}
                    >
                        <img
                            src={images[current]}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}

                {/* IMAGE SLIDER */}
                {images.length > 0 && (
                    <div className="relative w-full mb-4">
                        <img
                            src={images[current]}
                            onClick={() => setFullscreen(true)}
                            className="w-full max-h-[380px] rounded-lg object-cover"
                        />

                        {/* NAME OVERLAY ON IMAGE */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 rounded-b-lg">
                            <h2 className="text-white text-lg md:text-xl font-bold drop-shadow">{project.name}</h2>
                        </div>

                        {/* LEFT ARROW */}
                        {images.length > 1 && (
                            <button
                                onClick={() =>
                                    setCurrent((prev) =>
                                        prev === 0 ? images.length - 1 : prev - 1
                                    )
                                }
                                className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/80"
                            >
                                ❮
                            </button>
                        )}

                        {/* RIGHT ARROW */}
                        {images.length > 1 && (
                            <button
                                onClick={() =>
                                    setCurrent((prev) => (prev + 1) % images.length)
                                }
                                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/80"
                            >
                                ❯
                            </button>
                        )}
                    </div>
                )}

                {/* SUMMARY */}
                <div className="mb-3">
                    <h3 className="font-semibold text-green-700 text-lg">Summary</h3>
                    <p className="text-gray-700 mt-1">{project.summary}</p>
                </div>

                {/* PROGRAM */}
                <div className="mb-3">
                    <h3 className="font-semibold text-green-700 text-lg">Program: <span className="text-gray-700 text-sm md:text-lg">{project.department || "—"}</span></h3>
                </div>

                {/* DURATION */}
                <div className="mb-3">
                    <h3 className="font-semibold text-green-700 text-lg">Duration: <span className="text-gray-700 text-sm md:text-lg">{formatOrdinalDate(project.duration_start)} — {formatOrdinalDate(project.duration_end)}</span></h3>
                </div>

                {/* DONOR */}
                <div className="mb-3">
                    <h3 className="font-semibold text-green-700 text-lg">Donors: <span className="text-gray-700 text-sm md:text-lg">{project.donor || "—"}</span></h3>
                </div>

                {/* OBJECTIVES */}
                {project.objectives?.length > 0 && (
                    <div className="mb-3">
                        <h3 className="font-semibold text-green-700 text-lg">Objectives</h3>
                        <ul className="list-disc ml-6 text-gray-700">
                            {project.objectives.map((obj, i) => (
                                <li key={i}>{obj}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* KEY ACTIVITIES */}
                {project.key_activities?.length > 0 && (
                    <div className="mb-2">
                        <h3 className="font-semibold text-green-700 text-lg">Key Activities</h3>
                        <ul className="list-disc ml-6 text-gray-700">
                            {project.key_activities.map((act, i) => (
                                <li key={i}>{act}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* CLOSE BUTTON */}
                <div className="text-right mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div >
    );
}
