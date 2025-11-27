import React from "react";
import { useEffect, useState } from "react";
import { api } from "../API/api";
import PostCard from "../components/PostCard";
export default function PaliPage() {

  const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      loadPosts();
    }, []);
  
    const loadPosts = async () => {
      try {
        const res = await api.get("/posts?department=PALI");
        setPosts(res.data.data || res.data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="w-full bg-white text-gray-800">

      {/* RIGHT IMAGE */}
      <div className="w-full h-full p-4 lg:p-10">
        <img
          src="/images/WhatWeDo/pili/image.png" // change to your real image
          alt="PILI Photo"
          className="rounded-3xl object-cover w-full lg:h-full h-[300px]"
        />
      </div>

      {/* TOP IMAGE + TITLE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 items-start px-4 lg:px-10 py-2">

        {/* LEFT TITLE SECTION */}
        <div>
          <h1 className="text-2xl lg:text-5xl font-bold mb-4">PILI</h1>
          <h2 className="text-xl lg:text-2xl font-semibold">
            (Policies and Legal Influence)
          </h2>
        </div>


        {/* DESCRIPTION SECTION */}
        <div className="md:col-span-2 lg:col-span-4 pb-2 leading-relaxed text-sm lg:text-lg">

          <p className="mb-6">
            PALI aims to engage and influence global, regional and national policies and laws effecting the poor, indigenous, marginalized, and vulnerable groups and people, and planet. The roles of PALI are policies research, capacity development, consultations, and advocacy.
          </p>

          <p className="mb-4">
            NGOF is one of the regional and global gateways for CSOs in Cambodia which will engage and influence key policies such as Paris Agreement on Climate Change and Conference of Parties (COP), Sustainable Development Goals, and Transboundary Free Trade Agreements and other following key policies and laws, but not limited to:
          </p>

          <ul className="list-disc ml-8 mb-6 space-y-1">
            <li>Natural Resources and Environmental Code, and other laws related.</li>
            <li>Pentagonal Strategies</li>
            <li>Cambodian Sustainable Development Goals (CSDGs)</li>
            <li>
              National Strategic Development Plan (NSDP) and National Program Phase 2 for Sub-national Democratic Development
            </li>
            <li>
              Public Financial Management including national budgeting, green finance, tax justice, and digital economy
            </li>
            <li>Climate Change Strategic Plan 2024- 2028, including loss and damage policies.</li>
            <li>Agriculture policies, and other related sectoral policies and strategic plans, and other related policies</li>
            <li>Sustainable and green growth policies</li>
            <li>ESG and Business and Human Rights</li>
          </ul>

          <p className="mb-8">
            PALI is led by one manager and other team members. In addition to its core roles, the team plays as a secretariate of two important networks: Budget Working Group (BWG), and River Coalition Cambodia (RCC) with around 50 local and international NGOs working together to address issues related to their mandates and collective ones in a more coordinated and reached more common goals, effective use of resources and greater success.
          </p>

          {/* ---- BWG ---- */}
          <h3 className="text-lg lg:text-xl font-bold text-green-700 mb-2">
            Budget Working Group (BWG)
          </h3>
          <p className="mb-8">
            BWG is a coalition of 20 local and international NGOs working on budget-related policies coordinated by the NGO Forum on Cambodia (NGO Forum). The Group has been engaged in public budget advocacy for several years since 2016. The group advocacy aims to produce credible evidence through budget analysis, research and mainly open budget survey to influence the Royal Government of Cambodia (RGC) to increase budget allocation toward poor and vulnerable population and to improve budget transparency.
          </p>

          {/* ---- RCC ---- */}
          <h3 className="text-lg lg:text-xl font-bold text-green-700 mb-2">
            Rivers Coalition in Cambodia (RCC)
          </h3>
          <p className="mb-6">
            RCC envisions that existing and future hydropower dam projects respect the rights of the affected people and ensures the sustainability of the environment and livelihoods.  In order to achieve this, RCC believes that public participation in the planning and decision making process is essential in order to guarantee that the interests, needs, and benefits of affected people are included as well as addressed.
          </p>
        </div>
      </div>

      {/* ===================== RECENT NEWS SECTION ===================== */}
      <section className="py-8 bg-white">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">

          <h2 className="text-lg lg:text-3xl font-bold text-gray-800 lg:mb-10 mb-4">
            Program Achievements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}
