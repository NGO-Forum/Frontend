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
      const res = await api.get("/posts?department=RITI");
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
          src="/images/WhatWeDo/riti/image.png" // change to your real image
          alt="PILI Photo"
          className="rounded-3xl object-cover w-full lg:h-full h-[300px]"
        />
      </div>

      {/* TOP IMAGE + TITLE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 items-start px-4 lg:px-10 py-2">

        {/* LEFT TITLE SECTION */}
        <div>
          <h1 className="text-2xl lg:text-5xl font-bold mb-4">RITI</h1>
          <h2 className="text-xl lg:text-2xl font-semibold">
            (Resilient, Innovative, and Transformative Institution)
          </h2>
        </div>


        {/* DESCRIPTION SECTION */}
        <div className="md:col-span-2 lg:col-span-4 lg:ml-6 pb-2 leading-relaxed text-sm lg:text-lg">

          <p className="mb-6">
            RITI aims to transform the NGOF, the members and their partners/communities (incl. ACs, CPA, CFi, and CF) to become resilient, innovative, and transformative institution. RITI plays critical roles for providing enabling environment for the civil society both their internal capacity, working relationship with government and other stakeholders, and financial viability. RITI will support the members and partners for improving their communication and visibilities, and internal M&E system. RITI is led by a  manager and other team members. RITI is responsible for membership development, internal governance, communication and visibility, fund raising, quality assurance and reporting. RITI  plays role as the secretariat at least one network to be called “GGEDSI- Governance, Gender, Environment, Disability, and Social Inclusion”, where most of the network members are from members of the NGOF.
          </p>

          <p className="mb-4">
            <span className="font-bold text-green-700">Governance, Gender, Environment, Disability, and Social Inclusion (GGEDSI)</span> to ensure the integration and mainstreaming of environmental, social, governance, gender, and inclusion into the network’s strategies and operations. The working group will provide guidance and recommendations to promote sustainable and inclusive practices within the network. The working group would promote voices of civil society groups which core related to land and forest sector in order to make sure that we fully cooperate and consult on implementation process, constructive monitoring, to engage in dialogue and decision-making.
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
