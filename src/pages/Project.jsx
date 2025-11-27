import React, { useEffect, useState } from "react";
import { api } from "../API/api";
import ProjectDetailModal from "../components/ProjectDetailModal";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    api.get("/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  // GROUP by department
  const grouped = projects.reduce((acc, project) => {
    const dept = project.department || "OTHER";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(project);
    return acc;
  }, {});

  // FIXED ORDER ALWAYS
  const fixedOrder = ["RITI", "SACHAS", "PALI", "MACOR"];

  // Program titles + subtitles
  const programInfo = {
    RITI: {
      title: "Resilient, Innovative, and Transformative Institution ( RITI )",
      subtitle:
        "RITI aims are to transform the NGOF, NGOF’s members and their partners/communities (incl. ACs, CPA, CFi, and CF) so that they will become resilient, innovative, and transformative institution.",
    },
    SACHAS: {
      title:
        "Solidarity Actions for Community Harmonization and Sustainability ( SACHAS )",
      subtitle:
        "SACHAS aims at supporting NGOF’s members, partners and the communities to operationalize key laws and policies mentioned above into practices, and to support their local-led initiatives to transform their communities toward harmonious, prosperous, resilient and sustainable one.",
    },
    PALI: {
      title: "Policies and Legal Influences ( PALI )",
      subtitle:
        "ALI aims to engage and influence global, regional and national laws and policies effecting the poor, indigenous, marginalized, and vulnerable groups and people.",
    },
    MACOR: {
      title:
        "Management of Accounting, Competencies, Operations and Resources ( MACOR )",
      subtitle:
        "MACOR aims at supporting the NGOF to become a transparent, accountable, responsible and sustainable membership-based organization.",
    },
  };

  return (
    <section>
      {/* HERO IMAGE + TITLE */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/project/bg.PNG"
          alt="Project Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1
          className="absolute inset-0 flex justify-center items-center 
          text-white text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg"
        >
          OUR PROJECTS
        </h1>
      </div>

      {/* TOP INTRO SECTION */}
      <section className="w-full px-4 py-6 md:px-10 lg:py-12 lg:px-12 flex justify-center">
        <div className="max-w-8xl bg-green-700 rounded-3xl text-white p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="order-2 lg:order-1 space-y-3 md:space-y-6 leading-relaxed">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wide">
              OUR PROJECTS
            </h2>

            <h3 className="text-lg md:text-2xl font-bold">
              Programmatic Initiatives Driving the METRI Strategic Plan
            </h3>

            <p className="text-sm md:text-lg">
              To deliver on the shared 2024–2030 METRI Strategic Plan, the NGO Forum on Cambodia (NGOF) has developed targeted projects that directly address the priority issues identified by its members and partners. Drawing on decades of experience and a broad network of more than 200 CSOs, these initiatives are designed to advance national priorities, strengthen civil society engagement, and promote sustainable and inclusive development.
            </p>

            <p className="text-sm md:text-lg">
              Organized across the METRI pillars—PALI, SACHAS, RITI, and MACOR—each project tackles a specific programmatic challenge, from climate governance and land management to financial transparency, civic space, and institutional resilience. Supported by diverse development partners and CSO networks, these efforts ensure that NGOF’s collective mission is translated into concrete actions and measurable results.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src="/images/project/IMG_8390.JPG"
              alt="Community Meeting"
              className="rounded-xl w-full h-64 md:h-[350px] lg:h-full object-cover shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* PROJECTS GROUPED BY PROGRAM */}
      <div className="max-w-full mx-auto px-4 py-6 md:px-10 lg:py-4 lg:px-12 space-y-6 md:space-y-12">

        {fixedOrder
          .filter((dept) => grouped[dept]) // Only show if department exists
          .map((dept) => (
            <section key={dept} className="space-y-6">

              {/* Program Title */}
              <div className="text-left">
                <h2 className="tex-xl md:text-3xl lg:text-4xl font-bold text-green-700">
                  {programInfo[dept]?.title || dept}
                </h2>
                <p className="text-gray-600 text-sm md:text-lg italic mt-2">
                  {programInfo[dept]?.subtitle || ""}
                </p>
              </div>

              {/* Project Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

                {grouped[dept].map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-xl bg-white shadow hover:shadow-xl transition p-4"
                  >
                    {/* IMAGE */}
                    <img
                      src={project.image_urls[0]}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />

                    {/* NAME */}
                    <h3 className="text-lg md:text-xl font-semibold mt-3 line-clamp-2">{project.name}</h3>

                    {/* SUMMARY */}
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {project.summary}
                    </p>

                    {/* READ MORE */}
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowDetail(true);
                      }}
                      className="text-white bg-green-600 rounded-lg font-medium mt-2 px-3 py-1 inline-block cursor-pointer"
                    >
                      Read more
                    </button>
                  </div>
                ))}

              </div>
            </section>
          ))}

      </div>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        open={showDetail}
        project={selectedProject}
        onClose={() => setShowDetail(false)}
      />
    </section>
  );
}
