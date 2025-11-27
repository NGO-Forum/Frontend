import React, { useEffect, useState } from "react";
import { api } from "../API/api";
import ImpactDetailModal from "../components/ImpactDetailModal";

export default function Impact() {
  const [impacts, setImpacts] = useState([]);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    api.get("/impacts").then((res) => {
      setImpacts(res.data);
    });
  }, []);


  return (
    <section>
      {/* HERO IMAGE + TITLE */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/project/impact.PNG"
          alt="Project Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1
          className="absolute inset-0 flex justify-center items-center 
          text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg"
        >
          OUR IMPACTS
        </h1>
      </div>

      {/* TOP INTRO SECTION */}
      <section className="w-full px-4 py-6 md:px-10 lg:py-12 lg:px-12 flex justify-center">
        <div className="max-w-8xl bg-green-700 rounded-3xl text-white p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="order-2 lg:order-1 space-y-3 md:space-y-6 leading-relaxed">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wide">
              OUR IMPACTS
            </h2>

            <p className="text-sm md:text-base">
              By 2030, NGO Forum on Cambodia (NGOF) will have contributed to a measurable shift in Cambodia’s development trajectory by strengthening the agency and influence of citizens and civil society organizations in policy and legal processes. The intended impact is that development policies, public financial management, and investment decisions increasingly reflect principles of fairness, environmental sustainability, and social inclusion, resulting in more climate‑smart and pro‑poor outcomes for diverse Cambodian communities.
            </p>

            <p className="text-sm md:text-base">
              Concurrently, NGOF will consolidate a resilient ecosystem of actors—communities, youth, member organizations, and partners—who are equipped to claim resource rights, engage in evidence‑based advocacy, and monitor the implementation of key laws and policies on land, water, forests, fisheries, mines, and energy. This will be underpinned by strengthened internal systems, MEALI, and organizational capacities, enabling NGOF to deliver more coherent, accountable, and scalable interventions. For illustrative evidence of these intended impacts in practice, please refer to the case studies presented in the following section.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src="/images/project/impact.jpg"
              alt="Community Meeting"
              className="rounded-xl w-full h-64 md:h-[350px] lg:h-[400px] object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* IMPACT CARDS (FLAT LIST) */}
      <div className="max-w-full mx-auto px-4 py-6 md:px-10 lg:px-12">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-green-700 tracking-wide mb-4 md:mb-6">
          OUR IMPACTS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">

          {impacts.map((imp) => (
            <div
              key={imp.id}
              className="border rounded-xl bg-white shadow hover:shadow-xl transition p-4"
            >
              {/* IMAGE */}
              {imp.image_urls?.length > 0 && (
                <img
                  src={imp.image_urls[0]}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {/* NAME */}
              <h3 className="text-lg md:text-xl font-bold mt-3 line-clamp-1">
                {imp.name}
              </h3>

              {/* program */}
              <p className="text-gray-600 text-sm mt-3">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Array.isArray(imp.program) ? imp.program : [imp.program])
                    .filter(Boolean)
                    .map((p, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                      >
                        {p}
                      </span>
                    ))}
                </div></p>

              {/* SUMMARY */}
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {imp.summary}
              </p>

              {/* READ MORE */}
              <button
                className="text-white bg-green-600 rounded-lg font-medium mt-3 px-3 py-1 inline-block"
                onClick={() => {
                  setSelectedImpact(imp);
                  setShowDetail(true);
                }}
              >
                Read More
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* DETAIL MODAL */}
      <ImpactDetailModal
        open={showDetail}
        impact={selectedImpact}
        onClose={() => setShowDetail(false)}
      />

    </section>
  );
}
