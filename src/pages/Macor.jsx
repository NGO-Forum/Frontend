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
          src="/images/WhatWeDo/macor/NGOF_Staff.png" // change to your real image
          alt="PILI Photo"
          className="rounded-3xl object-cover w-full lg:h-full h-[300px]"
        />
      </div>

      {/* TOP IMAGE + TITLE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10 items-start px-4 lg:px-10 py-2 mb-4 lg:mb-10">

        {/* LEFT TITLE SECTION */}
        <div>
          <h1 className="text-2xl lg:text-5xl font-bold mb-4">MACOR</h1>
          <h2 className="text-xl lg:text-2xl font-semibold">
            (Management of Accounting, Competencies, Operations and Resources)
          </h2>
        </div>


        {/* DESCRIPTION SECTION */}
        <div className="md:col-span-2 lg:col-span-3 pb-2 leading-relaxed text-sm lg:text-lg">

          <p>MACOR aims at supporting the NGOF to become a transparent, accountable, responsible and sustainable membership-based organization. This team will be composed of one manager, one specialist, one officer, one assistant, and one office helper for 2024-2025. From 2026, this team will be increased with recruitment of one more specialist and one intern. The team will be supported by Executive Director, at least one volunteer advisor and members of management committee.</p>
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
