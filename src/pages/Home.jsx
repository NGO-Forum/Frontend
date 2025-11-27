import { useEffect, useState } from "react";
import SmartCounter from "../components/Counter";
import { Link } from "react-router-dom";
import DonorSlider from "../components/DonorSlider";
import PostCard from "../components/PostCard";
import { api } from "../API/api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await api.get("/posts?limit=8");
      setPosts(res.data.data || res.data);   // supports pagination
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  };

  return (
    <div className="w-full m-0 p-0">

      {/* ===================== TOP SECTION ===================== */}
      <section className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-6 bg-gray-50">

        {/* RIGHT IMAGE — mobile first */}
        <div className="order-1 lg:order-2">
          <img
            src="/images/home/NGOF_Staff.png"
            alt="NGO Forum Team"
            className="shadow-md w-full object-cover h-full"
          />
        </div>

        {/* LEFT TEXT CONTENT */}
        <div className="delay-show order-2 lg:order-1 text-gray-800 text-lg md:text-xl space-y-4 leading-relaxed p-6 lg:p-10">

          <p>
            <span className="font-bold">Our Vision</span> is a peaceful, inclusive, prosperous, and sustainable society and planet.
          </p>

          <p>
            <span className="font-bold">Our Mission</span> is a professional membership-based organization influencing and supporting
            policies, laws development and practices that champion and foster people harmonization,
            inclusive prosperity, and a sustainable planet for the benefit of all diverse Cambodians.
          </p>

          <p>
            <span className="font-bold">Our core values</span> are TEAMS. TEAMS stands for Trust, Empowerment, Accountable, Management
            for Results, and Sustainability. TEAMS is applied across our places of work. We seek to ensure and
            promote our values with our members and partners.
          </p>

        </div>
      </section>

      {/* ===================== IMPACT SECTION ===================== */}
      <section className="bg-green-700 text-white py-10">
        <div className="max-w-8xl mx-auto text-center px-4">

          {/* Title */}
          <div className="flex items-center justify-center mb-10">
            <div className="hidden sm:block w-1/4 border-t-2 border-white opacity-60"></div>

            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mx-4">
              Impacts of our 40 years existence
            </h2>

            <div className="hidden sm:block w-1/4 border-t-2 border-white opacity-60"></div>
          </div>

          {/* Counters Grid */}
          <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2      /* Tablet = 2 columns */
              lg:grid-cols-3      /* Desktop = 3 columns */
              gap-10 md:gap-6 
              text-center
            ">

            {/* Item 1 */}
            <div>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 font-bold">
                Reached and Benefited
              </p>
              <p className="text-3xl md:text-4xl font-bold mt-4">
                <SmartCounter value="7M+" />
              </p>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mt-4">
                people, especially youth, women and IP
              </p>
            </div>

            {/* Item 2 */}
            <div>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 font-bold">
                Provided inputs and influenced
              </p>
              <p className="text-3xl md:text-4xl font-bold mt-4">
                <SmartCounter value="350+" />
              </p>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mt-4">
                policies and laws
              </p>
            </div>

            {/* Item 3 */}
            <div>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 font-bold">
                Capacitated & Empowered
              </p>
              <p className="text-3xl md:text-4xl font-bold mt-4">
                <SmartCounter value="3.5K+" />
              </p>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mt-4">
                CSOs/CBOs to become resilient
              </p>
            </div>

            {/* Item 4 */}
            <div>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 font-bold">
                Protected and Conserved
              </p>
              <p className="text-3xl md:text-4xl font-bold mt-4">
                <SmartCounter value="7.5K km2+" />
              </p>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mt-4">
                forests & lands
              </p>
            </div>

            {/* Item 5 */}
            <div>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 font-bold">
                With Members Mobilized
              </p>
              <p className="text-3xl md:text-4xl font-bold mt-4">
                <SmartCounter value="10B USD+" />
              </p>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mt-4">
                for development of Cambodia
              </p>
            </div>

            {/* Item 6 */}
            <div>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 font-bold">
                Employment Opportunities Provided
              </p>
              <p className="text-3xl md:text-4xl font-bold mt-4">
                <SmartCounter value="1.5M+" />
              </p>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mt-4">
                jobs across the country
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== VISION 2030 SECTION ===================== */}
      <section className=" bg-gray-50 p-8">
        <div className="max-w-8xl mx-auto px-4 text-center">

          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">
            Our Vision 2030 (METRI 2024 - 2030)
          </h2>

          <p className="max-w-4xl mx-auto mt-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            NGOF is implementing its new strategic plan 2024–2030 (Vision 2030) called
            METRI - Multistakeholder for Transformative, Resilient, and Inclusive Society.
            METRI focuses on the following strategic priorities, outcomes, and programs:
          </p>

          {/* Responsive Grid */}
          <div className="
              grid grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              gap-10 sm:gap-12 lg:gap-16 
              mt-10
            ">

            {/* Card 1 */}
            <div className="flex flex-col items-center text-center px-4 sm:px-6">
              <img src="/images/home/icon.png" alt="growth"
                className="h-16 sm:h-24 mb-6" />

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-0 md:mb-7">
                Inclusive and Green Growth
              </h3>

              <p className="text-gray-700 mt-4 leading-relaxed text-sm sm:text-base">
                Enhanced people and resources rights, inclusive growth, and sustainable planet through supporting and influencing the climate smart and diverse policies and laws development and practices.
              </p>

              <Link to="/pali">
                <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-5 py-2 sm:px-6 rounded-full transition">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center px-4 sm:px-6">
              <img src="/images/home/icon2.png" alt="nature"
                className="h-16 sm:h-24 mb-6" />

              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Climate Change Resilience and Nature Resource Governance
              </h3>

              <p className="text-gray-700 mt-4 leading-relaxed text-sm sm:text-base">
                Fostered ecosystems for transformative, resilient, and prosperous communities through capacity development, mobilizing support for implementation and monitoring of the enacted pro-poor policies and laws, and community led initiatives.
              </p>

              <Link to="/sachas">
                <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-5 py-2 sm:px-6 rounded-full transition">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center px-4 sm:px-6">
              <img src="/images/home/icon3.png" alt="civil"
                className="h-16 sm:h-24 mb-6" />

              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Vibrant, Proactive, Resilient, and Sustainable Civil Society
              </h3>

              <p className="text-gray-700 mt-4 leading-relaxed text-sm sm:text-base">
                Strengthened a vibrant, resilient, and resourceful organization of the NGO Forum and its members through capacity development, and joint impactful initiatives.
              </p>

              <Link to="/riti">
                <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-5 py-2 sm:px-6 rounded-full transition">
                  Learn More
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== PROGRAMS SECTION ===================== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* CARD 1 */}
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-8 
                      flex flex-col items-center text-center">
              <h3 className="text-lg md:text-2xl font-bold text-green-700 leading-relaxed">
                Policies and Legal<br />Influences (PALI)
              </h3>
              <a href="/pali" className="mt-4 inline-block text-black underline hover:text-green-700">
                Read More
              </a>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-8 
                      flex flex-col items-center text-center">
              <h3 className="text-lg md:text-2xl font-bold text-green-700 leading-relaxed">
                Solidarity Actions for Community<br />
                Harmonization and Sustainability (SACHAS)
              </h3>
              <a href="/sachas" className="mt-4 inline-block text-black underline hover:text-green-700">
                Read More
              </a>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-8 
                      flex flex-col items-center text-center">
              <h3 className="text-lg md:text-2xl font-bold text-green-700 leading-relaxed">
                Resilient, Innovative, and<br />
                Transformative Institution (RITI)
              </h3>
              <a href="/riti" className="mt-4 inline-block text-black underline hover:text-green-700">
                Read More
              </a>
            </div>

            {/* CARD 4 */}
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-8 
                      flex flex-col items-center text-center">
              <h3 className="text-lg md:text-2xl font-bold text-green-700 leading-relaxed">
                Management of Accounting,<br />
                Competencies, Operations and<br />
                Resources (MACOR)
              </h3>
              <a href="/macor" className="mt-4 inline-block text-black underline hover:text-green-700">
                Read More
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== DONOR SLIDER SECTION ===================== */}
      <section className=" bg-white">
        <DonorSlider />
      </section>

      {/* ===================== RECENT NEWS SECTION ===================== */}
      <section className="py-6 bg-white">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">

          <h2 className="text-lg lg:text-3xl font-bold text-gray-800 lg:mb-10 mb-4">
            Recent News
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
