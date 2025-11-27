import { React, useEffect, useState } from "react";
import { api } from "../API/api";

export default function OrganizationalStructure() {
  const [data, setData] = useState({
    directors: [],
    advisors: [],
    sachas: [],
    pili: [],
    riti: [],
    macor: [],
    executiveDirector: [],
  });

  // Sort managers first
  const managerKeywords = ["manager", "executive director"];

  const sortManagersFirst = (list) => {
    return [...list].sort((a, b) => {
      const aRole = a.role?.toLowerCase() || "";
      const bRole = b.role?.toLowerCase() || "";

      const aIsManager = managerKeywords.some((k) => aRole.includes(k));
      const bIsManager = managerKeywords.some((k) => bRole.includes(k));

      if (aIsManager && !bIsManager) return -1;
      if (!aIsManager && bIsManager) return 1;
      return 0;
    });
  };

  // Combine all people from all categories
  const getAllPeople = () => {
    return [
      ...data.directors,
      ...data.advisors,
      ...data.sachas,
      ...data.pili,
      ...data.riti,
      ...data.macor,
      ...data.executiveDirector,
    ];
  };

  // UNIVERSAL ROLE SORTING FOR ALL PROGRAMS
  const sortByRolePriority = (list) => {
    const priority = [
      "manager",
      "coordinator",
      "specialist",
      "officer",
      "assistant",
      "admin",
      "janitor",
      "intern",
    ];

    const getRank = (role = "") => {
      role = role.toLowerCase();

      for (let i = 0; i < priority.length; i++) {
        if (role.includes(priority[i])) return i;
      }

      return 999; // fallback lowest priority
    };

    return [...list].sort((a, b) => getRank(a.role) - getRank(b.role));
  };

  // SORT STAFF ONLY (NOT MANAGERS)
  const sortStaffRole = (list) => {
    const priority = [
      "coordinator",
      "specialist",
      "officer",
      "assistant",
      "admin",
      "janitor",
      "intern",
    ];

    const getRank = (role = "") => {
      role = role.toLowerCase();

      for (let i = 0; i < priority.length; i++) {
        if (role.includes(priority[i])) return i;
      }
      return 999; // roles not matched go last
    };

    return [...list].sort((a, b) => getRank(a.role) - getRank(b.role));
  };

  // BUILD DEPARTMENTS AUTOMATICALLY
  const buildDepartments = () => {
    const all = getAllPeople();

    // Detect manager
    const isManager = (role) => (role || "").toLowerCase().includes("manager");

    // Build a department
    const buildDept = (categoryName, label) => {
      const group = all.filter((p) => p.category === categoryName);

      const manager = group.find((p) => isManager(p.role));
      const staff = group.filter((p) => !isManager(p.role));

      return {
        name: label,
        manager: manager || { name: "No Manager Assigned", position: "" },
        staff,
      };
    };

    return [
      buildDept("riti", "RITI Program"),
      buildDept("pili", "PALI Program"),
      buildDept("sachas", "SACHAS Program"),
      buildDept("macor", "MACOR Program"),
    ];
  };

  // Load people from API
  const loadData = async () => {
    const categories = [
      { key: "directors", api: "director" },
      { key: "advisors", api: "advisor" },
      { key: "sachas", api: "sachas" },
      { key: "pili", api: "pili" },
      { key: "riti", api: "riti" },
      { key: "macor", api: "macor" },
      { key: "executiveDirector", api: "executiveDirector" },
    ];

    const promises = categories.map((c) =>
      api.get(`/people?category=${c.api}`)
    );

    const responses = await Promise.all(promises);
    const finalData = {};

    responses.forEach((res, i) => {
      finalData[categories[i].key] = res.data;
    });

    setData(finalData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getManagementTeam = () => {
    const all = getAllPeople();

    const executive = all.filter((p) =>
      (p.role || "").toLowerCase().includes("executive director")
    );

    const managers = all.filter((p) => {
      const role = (p.role || "").toLowerCase();
      if (role.includes("executive director")) return false;
      return role.includes("manager");
    });

    return [...executive, ...managers];
  };

  const sortDirectors = (list) => {
    return [...list].sort((a, b) => {
      const roleA = (a.role || "").toLowerCase().trim();
      const roleB = (b.role || "").toLowerCase().trim();

      const rank = (role) => {
        if (role === "chair") return 1;                        // exact
        if (role === "vice-chair" || role === "vice chair") return 2;
        if (role === "treasurer") return 3;
        return 4;
      };

      return rank(roleA) - rank(roleB);
    });
  };

  const sortAdvisors = (list) => {
    return [...list].sort((a, b) => {
      const roleA = (a.role || "").toLowerCase().trim();
      const roleB = (b.role || "").toLowerCase().trim();

      const rank = (role) => {
        if (role.includes("resource") && role.includes("advisor")) return 1;
        if (role.includes("management") && role.includes("advisor")) return 2;
        return 3;
      };

      return rank(roleA) - rank(roleB);
    });
  };


  const executiveDirector = data.executiveDirector[0] || {};

  const imgUrl = (path) => {
    if (!path) return "/images/no-image.png";
    return `http://44.205.95.55/storage/${path}`;
  };

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white">
      <section className="bg-gray-100">

        {/* ---------- HEADER BANNER ---------- */}
        <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
          <img
            src="/images/whoWeAre/Structure/bg.png"
            alt="About Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <h1 className="absolute inset-0 flex justify-center items-center 
                   text-white text-3xl sm:text-4xl md:text-5xl font-boldDrop-shadow-lg">
            Organizational Structure
          </h1>
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8 md:py-10">

          {/* Description */}
          <p className="text-gray-700 text-xl max-w-8xl mx-auto leading-relaxed mb-4 md:mb-8">
            NGOF is governed by its members and elected Board of Directors.
            NGOF is daily led and managed by the management team and staff
            members with support from the advisors. To know more about each
            of us, please click on our photo.
          </p>

          {/* Board Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-green-700 mb-12">
            Board of Directors
          </h2>

          {/* ---------- DIRECTORS LIST ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 text-center">

            {sortDirectors(data.directors).map((d, i) => (
              <div key={i} className="cursor-pointer flex flex-col items-center justify-center"
                onClick={() => {
                  setSelectedPerson(d);
                  setShowModal(true);
                }}
              >

                <div className="blob-structure w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] cursor-pointer overflow-hidden">
                  <img
                    src={imgUrl(d.img)}
                    alt={d.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#899616]">{d.name}</h3>
                <p className="text-gray-600 text-lg mt-1">{d.role}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section>
        {/* ---------- CONTENT ---------- */}
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8 md:py-10">
          {/* Board Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-green-700 mb-12">
            Advisors
          </h2>

          {/* ---------- DIRECTORS LIST ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 text-center">

            {sortAdvisors(data.advisors).map((d, i) => (
              <div key={i} className="cursor-pointer flex flex-col items-center justify-center"
                onClick={() => {
                  setSelectedPerson(d);
                  setShowModal(true);
                }}
              >

                <div className="blob-structure w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] cursor-pointer overflow-hidden">
                  <img
                    src={imgUrl(d.img)}
                    alt={d.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#899616]">{d.name}</h3>
                <p className="text-gray-600 text-lg mt-1">{d.role}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="bg-gray-100">
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8 md:py-10">

          <h2 className="text-2xl lg:text-4xl font-bold text-green-700 mb-12">
            Senior Management Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 text-center">

            {sortManagersFirst(getManagementTeam()).map((d, i) => (
              <div key={i} className="cursor-pointer flex flex-col items-center"
                onClick={() => {
                  setSelectedPerson(d);
                  setShowModal(true);
                }}
              >

                <div className="blob-structure w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] overflow-hidden">
                  <img
                    src={imgUrl(d.img)}
                    alt={d.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#899616]">{d.name}</h3>
                <p className="text-gray-600 text-lg mt-1">{d.role}</p>
                <p className="text-gray-600 mt-1">{d.email}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section>
        {/* ---------- CONTENT ---------- */}
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8 md:py-10">
          {/* Board Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-green-700">
            PALI Program
          </h2>
          <p className="mb-4 md:mb-12 mt-2 text-lg">Policies and Legal Influences</p>

          {/* ---------- DIRECTORS LIST ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 text-center">

            {sortByRolePriority(data.pili).map((d, i) => (
              <div key={i} className="cursor-pointer flex flex-col items-center justify-center"
                onClick={() => {
                  setSelectedPerson(d);
                  setShowModal(true);
                }}
              >

                <div className="blob-structure w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] cursor-pointer overflow-hidden">
                  <img
                    src={imgUrl(d.img)}
                    alt={d.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#899616]">{d.name}</h3>
                <p className="text-gray-600 text-lg mt-1">{d.role}</p>
                <p className="text-gray-600 mt-1">{d.email}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="bg-gray-100">
        {/* ---------- CONTENT ---------- */}
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8 md:py-10">
          {/* Board Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-green-700">
            SACHAS Program
          </h2>
          <p className="mb-4 md:mb-12 mt-2 text-lg">Solidarity Actions for Community Harmonization and Sustainability</p>

          {/* ---------- DIRECTORS LIST ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 text-center">

            {sortByRolePriority(data.sachas).map((d, i) => (
              <div key={i} className="cursor-pointer flex flex-col items-center justify-center"
                onClick={() => {
                  setSelectedPerson(d);
                  setShowModal(true);
                }}
              >

                <div className="blob-structure w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] cursor-pointer overflow-hidden">
                  <img
                    src={imgUrl(d.img)}
                    alt={d.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#899616]">{d.name}</h3>
                <p className="text-gray-600 text-lg mt-1">{d.role}</p>
                <p className="text-gray-600 mt-1">{d.email}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section>
        {/* ---------- CONTENT ---------- */}
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8 md:py-10">
          {/* Board Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-green-700">
            RITI Program
          </h2>
          <p className="mb-4 md:mb-12 mt-2 text-lg">Resilient, Innovative, and Transformative Institution</p>

          {/* ---------- DIRECTORS LIST ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 text-center">

            {sortByRolePriority(data.riti).map((d, i) => (
              <div key={i} className="cursor-pointer flex flex-col items-center justify-center"
                onClick={() => {
                  setSelectedPerson(d);
                  setShowModal(true);
                }}
              >

                <div className="blob-structure w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] cursor-pointer overflow-hidden">
                  <img
                    src={imgUrl(d.img)}
                    alt={d.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#899616]">{d.name}</h3>
                <p className="text-gray-600 text-lg mt-1">{d.role}</p>
                <p className="text-gray-600 mt-1">{d.email}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="bg-gray-100">
        {/* ---------- CONTENT ---------- */}
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8 md:py-10">
          {/* Board Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-green-700">
            MACOR Program
          </h2>
          <p className="mb-4 md:mb-12 mt-2 text-lg">Management of Accounting, Competencies, Operations and Resources</p>

          {/* ---------- DIRECTORS LIST ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 text-center">

            {sortByRolePriority(data.macor).map((d, i) => (

              <div key={i} className="cursor-pointer flex flex-col items-center justify-center"
                onClick={() => {
                  setSelectedPerson(d);
                  setShowModal(true);
                }}
              >

                <div className="blob-structure w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] cursor-pointer overflow-hidden">
                  <img
                    src={imgUrl(d.img)}
                    alt={d.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#899616]">{d.name}</h3>
                <p className="text-gray-600 text-lg mt-1">{d.role}</p>
                <p className="text-gray-600 mt-1">{d.email}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {showModal && selectedPerson && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-6 relative h-[98%] md:h-auto overflow-auto">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* LEFT: Image */}
              <div className="flex justify-center mt-2 mb-4 md:mb-0">
                <img
                  src={imgUrl(selectedPerson.img)}
                  alt={selectedPerson.name}
                  className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-3xl shadow-md"
                />
              </div>

              {/* RIGHT: Details */}
              <div className="md:col-span-2 col-span-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-green-700">
                  {selectedPerson.name}
                </h2>
                <p className="text-gray-600 text-lg lg:text-xl mt-1">
                  {selectedPerson.position}
                </p>

                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                  Add to Contact
                </button>

                <hr className="my-5 border-dashed" />

                <p className="text-gray-700 leading-relaxed text-xs">
                  {selectedPerson.description || "No bio available."}
                </p>

                <h3 className="text-xl text-green-700 font-bold mt-6">
                  Education Background
                </h3>
                <ul className="text-gray-700 list-disc ml-6 mt-2">
                  {(selectedPerson.education || []).map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}


      <div className="bg-white w-full px-6 py-8 lg:py-12 lg:px-12 hidden md:block">
        <h1 className="text-2xl lg:text-4xl font-bold text-green-700 text-left mb-12">
          Organization Chart
        </h1>

        {/* LEVEL 1: MEMBERS */}
        <div className="text-center">
          <p className="text-[#899616] font-bold text-xl">Members</p>
          <div className="h-16 w-px mb-2 mt-2 bg-black mx-auto"></div>

          {/* LEVEL 2: BOARD OF DIRECTORS */}
          <p className="text-[#899616] font-bold text-xl">Board Of Directors</p>

          <div className="relative flex justify-center items-center my-2">
            <div className="h-16 w-px bg-black"></div>
            <p className="absolute right-[25%] lg:right-[36%] text-[#899616] text-xl font-bold">
              <span className="border-2 border-black border-dashed w-20 inline-block mr-4"></span>
              Advisor
            </p>
          </div>

          {/* LEVEL 3: EXECUTIVE DIRECTOR */}
          <div>
            <p className="text-[#899616] font-bold text-xl">
              {executiveDirector.name}
            </p>
            <p className="text-gray-700">{executiveDirector.position}</p>
          </div>

          <div className="h-16 w-px mt-2 bg-black mx-auto"></div>
        </div>

        {/* LEVEL 4: PROGRAM MANAGERS */}
        <div className="relative">
          <div className="overflow-x-auto">
            <div className="hidden md:block h-px bg-black lg:w-[75%] w-[75%] mx-auto"></div>

            <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-0 min-w-[900px] md:min-w-0">
              {buildDepartments().map((dept, i) => (
                <div key={i} className="text-center w-full md:w-1/4 px-2">

                  {/* Vertical line for desktop */}
                  <div className="hidden md:block h-10 w-px mb-2 bg-black mx-auto"></div>

                  {/* Manager */}
                  <p className="font-bold text-[#899616] text-lg">{dept.manager.name}</p>
                  <p className="text-gray-600">{dept.manager.position}</p>


                  {/* Staff */}
                  <div className="mt-2">
                    {sortStaffRole(dept.staff).map((s, idx) => (
                      <div key={idx} className="mt-4">
                        <div className="hidden md:block h-10 w-px bg-black mx-auto mb-2"></div>
                        <p className="font-bold text-[#899616] text-lg">{s.name}</p>
                        <p className="text-gray-600">{s.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>

  );

}
