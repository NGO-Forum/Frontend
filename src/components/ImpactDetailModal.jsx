import React, { useState, useEffect, useRef } from "react";

export default function ImpactDetailModal({ open, impact, onClose }) {
    if (!open || !impact) return null;

    const [current, setCurrent] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const sliderRef = useRef(null);
    const [paused, setPaused] = useState(false);

    const images = impact.image_urls || [];

    // Auto-slide every 5s
    useEffect(() => {
        if (!open || images.length < 2) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [open, images.length]);

    useEffect(() => {
        if (!sliderRef.current || !impact.logo_urls?.length) return;

        const slider = sliderRef.current;
        let frame;

        const speed = 0.5; // ← Adjust scroll speed (pixels per frame)

        const scroll = () => {
            if (!paused) {
                slider.scrollLeft += speed;

                // Reset position to create infinite loop
                const half = slider.scrollWidth / 2;
                if (slider.scrollLeft >= half) {
                    slider.scrollLeft -= half;
                }
            }

            frame = requestAnimationFrame(scroll);
        };

        frame = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(frame);
    }, [impact.logo_urls, paused]);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white w-full max-w-3xl p-4 rounded-xl shadow-xl overflow-y-auto max-h-[85vh]">

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

                {/* IMAGE SLIDER WITH NAME ON IMAGE */}
                {images.length > 0 && (
                    <div className="relative w-full mb-4">

                        {/* IMAGE */}
                        <img
                            src={images[current]}
                            onClick={() => setFullscreen(true)}
                            className="w-full h-[200px] md:h-[380px] rounded-lg object-cover cursor-pointer"
                        />

                        {/* NAME OVERLAY ON IMAGE */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 rounded-b-lg">
                            <h2 className="text-white text-lg md:text-xl font-bold drop-shadow">
                                {impact.name}
                            </h2>
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
                                onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/80"
                            >
                                ❯
                            </button>
                        )}
                    </div>
                )}




                {/* PROGRAM BADGES */}
                <h2 className="text-lg md:text-xl mb-3 font-semibold text-green-700">
                    Programs:
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {(Array.isArray(impact.program) ? impact.program : [impact.program])
                        .filter(Boolean)
                        .map((p, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                            >
                                {p}
                            </span>
                        ))}
                </div>

                {/* SUMMARY */}
                <div className="mb-4">
                    <h3 className="font-semibold text-green-700 text-lg">Summary</h3>
                    <p className="text-gray-700 mt-1 leading-relaxed">{impact.summary}</p>
                </div>

                {/* LOGO IMAGES AS INFINITE SLIDER */}
                {impact.logo_urls?.length > 0 && (
                    <div className="mb-4">
                        <h3 className="font-semibold text-green-700 text-lg">Finance By Donors:</h3>

                        <div
                            ref={sliderRef}
                            className="overflow-hidden py-4 cursor-pointer"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <div className="flex whitespace-nowrap gap-6 w-max">
                                {[...impact.logo_urls, ...impact.logo_urls].map((logo, index) => (
                                    <img
                                        key={index}
                                        src={logo}
                                        className="h-16 md:h-20 w-auto object-contain rounded-lg bg-white p-2 border shadow shrink-0"
                                        draggable="false"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}


                {/* DOCUMENT */}
                {impact.file_url && (
                    <div className="mb-4">
                        <h3 className="font-semibold text-green-700 text-lg mb-2 md:mb-4">
                            Document Detail
                        </h3>
                        <a
                            href={impact.file_url}
                            target="_blank"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                        >
                            View Document Detail
                        </a>
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
        </div>
    );
}
