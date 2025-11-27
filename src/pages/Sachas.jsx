import React from "react";
import { useEffect, useState } from "react";
import { api } from "../API/api";
import PostCard from "../components/PostCard";

export default function SachasPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await api.get("/posts?department=SACHAS");
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
          src="/images/WhatWeDo/sachas/DSC00133_JPG.png" // change to your real image
          alt="PILI Photo"
          className="rounded-3xl object-cover w-full lg:h-full h-[300px]"
        />
      </div>

      {/* TOP IMAGE + TITLE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 items-start px-4 lg:px-10 py-2">

        {/* LEFT TITLE SECTION */}
        <div>
          <h1 className="text-2xl lg:text-5xl font-bold mb-4">SACHAS</h1>
          <h2 className="text-xl lg:text-2xl font-semibold">
            (Solidarity Actions for Community Harmonization and Sustainability)
          </h2>
        </div>


        {/* DESCRIPTION SECTION */}
        <div className="md:col-span-2 lg:col-span-4 pb-2 leading-relaxed text-sm lg:text-lg">

          <p className="mb-6">
            SACHAS aims at supporting NGOF’s members, partners and the communities to operationalize key laws and policies influenced by the PALI team. ​SACHAS supports the members and partners to build synergies and collective efforts/actions in responding key issues (including emerging) and priorities of their organizations and communities.
          </p>

          <p className="mb-4">
            SACHAS provides support to local-led initiatives of the target communities to transform their communities toward harmonious, prosperous, resilient and sustainable one. One of the feasible ideas is to transform communities such as Cis/ACs/CFs/CPAs into the community of Agri-tourism, education, environment, and culture so that they are  able to build trust, solidarity, generate sustainable income, conserve their environment and culture in a more harmonized, prosperous and sustainable manner.
          </p>

          <p>SACHAS deploys the following key strategic activities: </p>

          <ol className="list-decimal ml-8 mb-6 space-y-1">
            <li>Promoting public awareness on the adopted policies and laws through social medias, workshops,</li>
            <li>Establishing and facilitating METRI youth platform.</li>
            <li>Strengthening capacity of CSOs of TWG members and NGOF members on relevant topics.</li>
            <li>
              Facilitating and establishing association of fishery communities, forestry communities, agriculture cooperatives in the target provinces
            </li>
            <li>
              Facilitating for Agricultural Park (at least one) in the target province (s)
            </li>
            <li>Supporting development of eco-tourisms in protect areas.</li>
            <li>Enabling the communities to mobilize resources and implement their plan.</li>
            <li>Tapping financial resources, technical and professional skills required by and for the trained communities.</li>
          </ol>

          <p className="mb-8">
            SACHAS is led by one manager and other team members. The team plays as a secretariate of two important networks: Natural Resources and Land Governance (NRLG), and Network of Environment Climate Change, Agriculture, and Water (NECAW) with more then 100 local and international NGOs working together to address issues related to their mandates and collective ones in a more coordinated and reached more common goals, effective use of resources and greater success.
          </p>

          {/* ---- BWG ---- */}
          <h3 className="text-lg lg:text-xl font-bold text-green-700 mb-2">
            Natural Resource and Land Governance (NRLG)  
          </h3>
          <p className="mb-8">
            NRLG is Coordinate the NGOs that are members of the NGO Forum on Cambodia that are working on projects on land rights, indigenous peoples, forests and REDD+ to work together more effectively and efficiently. To develop policies, laws, norms and practices to promote land governance, natural resources, indigenous rights, housing development, climate change, REDD+ resilience, local community economy and social justice.
          </p>

          {/* ---- RCC ---- */}
          <h3 className="text-lg lg:text-xl font-bold text-green-700 mb-2">
            Network of Environment Climate Change, Agriculture, and Water (NECAW) 
          </h3>
          <p className="mb-6">
            NECAW is Contribute to the preparation and implementation of national strategies, policies, laws and regulations related to the environment, climate change, agriculture and water through the participation of various stakeholders to change resilience and environment and ensure harmonization and sustainability between peoples, prosperity and the planet.
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
