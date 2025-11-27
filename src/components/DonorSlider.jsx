import { useRef, useEffect, useState } from "react";

export default function DonorSlider() {
  const sliderRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const logos = [
    { src: "/images/dornor/actionaid.png", url: "https://cambodia.actionaid.org/" },
    { src: "/images/dornor/EFD_ISB_d_CMYK_pos_quer_MELANI-EDA-DE-500dpi.png", url: "https://www.eda.admin.ch/" },
    { src: "/images/dornor/heks.jpg", url: "https://en.heks.ch/" },
    { src: "/images/dornor/Porticus-logo.png", url: "https://www.porticus.com/" },
    { src: "/images/dornor/mekong_region_land_governance_logo.jpg", url: "https://www.mrlg.org" },
    { src: "/images/dornor/ilc_converted.jpg", url: "https://www.landcoalition.org" },
    { src: "/images/dornor/oxfam.png", url: "https://cambodia.oxfam.org/" },
    
  ];

  // Auto-scroll effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let speed = 1;
    let frame;

    const loop = () => {
      if (!paused) {
        slider.scrollLeft += speed;

        const maxScroll = slider.scrollWidth / 3;

        if (slider.scrollLeft >= maxScroll) {
          slider.scrollLeft = 0;
        }
      }

      frame = requestAnimationFrame(loop);
    };


    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 md:px-12 flex items-center gap-4 justify-center">

        <h2 className="text-xl sm:text-2xl md:text-3xl mt-0 font-bold whitespace-nowrap">
          Our Donors
        </h2>

        {/* Left button */}
        <button
          onClick={scrollLeft}
          className="hidden md:block ml-0 mr-0 md:mr-6 md:ml-6 text-5xl font-bold cursor-pointer active:scale-90"
        >
          ‹
        </button>

        {/* Slider Container */}
        <div ref={sliderRef} // ← correct place
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          <div
            className="flex w-max whitespace-nowrap gap-10 py-4 md:py-8"
          >
            {/* Duplicate list for seamless infinite scrolling */}
            {[...logos, ...logos].map((item, index) => (
              <a key={index} href={item.url} target="_blank">
                <img
                  src={item.src}
                  className="h-16 w-auto shrink-0 object-contain opacity-90 hover:opacity-100 transition"
                  draggable={false}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Right button */}
        <button
          onClick={scrollRight}
          className="hidden md:block text-5xl ml-0 mr-0 md:mr-6 md:ml-6 font-bold cursor-pointer active:scale-90"
        >
          ›
        </button>

      </div>
    </section>
  );
}
