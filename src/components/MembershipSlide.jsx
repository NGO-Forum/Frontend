import { useRef, useEffect, useState } from "react";
import { api } from "../API/api";

export default function MemberSlider() {
    const sliderRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [members, setMembers] = useState([]);

    // Load members from API
    const loadMembers = async () => {
        try {
            const res = await api.get("/members");

            // Hide disabled members
            const activeMembers = res.data.filter(m => !m.disabled);

            setMembers(activeMembers);
        } catch (err) {
            console.error("Failed to load members:", err);
        }
    };

    useEffect(() => {
        loadMembers();
    }, []);

    // Auto-scroll effect
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let speed = 1; // scrolling speed
        let frame;

        const loop = () => {
            if (!paused) {
                slider.scrollLeft += speed;

                // Seamless loop
                const maxScroll = slider.scrollWidth / 3;
                if (slider.scrollLeft >= maxScroll) {
                    slider.scrollLeft = 0;
                }
            }
            frame = requestAnimationFrame(loop);
        };

        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);
    }, [paused, members]);

    const scrollLeft = () => {
        sliderRef.current?.scrollBy({ left: -250, behavior: "smooth" });
    };

    const scrollRight = () => {
        sliderRef.current?.scrollBy({ left: 250, behavior: "smooth" });
    };

    return (
        <section>
            <div className="max-w-full mx-auto px-4 lg:px-12 flex items-center gap-4 justify-center">

                <h2 className="text-lg sm:text-2xl lg:text-3xl mt-0 font-bold whitespace-nowrap">
                    Our Members
                </h2>

                {/* Left arrow */}
                <button
                    onClick={scrollLeft}
                    className="hidden md:block text-5xl mx-4 font-bold cursor-pointer active:scale-90"
                >
                    ‹
                </button>

                {/* Slider Container */}
                <div
                    ref={sliderRef}
                    className="flex-1 overflow-hidden"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className="flex w-max whitespace-nowrap gap-4 md:gap-6 py-2 md:py-6">
                        {/* Duplicate the images for infinite loop */}
                        {[...members, ...members].map((m, index) => (
                            <a
                                key={index}
                                href={m.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={m.logo_url}
                                    alt={m.name}
                                    className="h-12 lg:h-20 w-auto object-contain shrink-0 opacity-90 hover:opacity-100 transition bg-whiterounded shadow"
                                    draggable="false"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right arrow */}
                <button
                    onClick={scrollRight}
                    className="hidden md:block text-5xl mx-4 font-bold cursor-pointer active:scale-90"
                >
                    ›
                </button>

            </div>
        </section>
    );
}
