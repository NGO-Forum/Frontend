import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function About() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const items = [
    {
      title: "What is our core value?",
      text: `Our core values are Trust, Empowerment, Accountable Management for Results, and Sustainability (TEAMS). These are supported by our   institutional governance policies and practice, our program delivery, and operations, and through the commitment to integrity and best practice by NGOF staff and Board. Our values are applied across our places of work. We seek to ensure alignment with the NGOF values among our members and partners.`
    },
    {
      title: "What is our strategic goal?",
      text: `Our strategic goal aims to champion genuine multi-stakeholder engagement for transformative society, inclusive and green growth, a resilient and sustainable planet which benefits all, especially youth, women, indigenous, and marginalized people in Cambodia.`
    }
  ];
  return (
    <div className="min-h-screen bg-white">
      <section>

        {/* HERO IMAGE + TITLE */}
        <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
          <img
            src="/images/about/DSC07233.jpg"
            alt="About Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <h1 className="absolute inset-0 flex justify-center items-center 
                   text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
            About Us
          </h1>
        </div>

        {/* CONTENT SECTION */}
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-50 px-4 py-8">

          {/* LEFT TEXT */}
          <div className="space-y-6 text-gray-900 leading-relaxed text-sm md:text-lg ml-0 md:ml-4 mt-2 md:mt-10 order-2 lg:order-1">

            <p>
              <span className="font-bold">Our Vision</span> is “A peaceful, inclusive,
              prosperous, and sustainable society and planet”.
            </p>

            <p>
              <span className="font-bold">Our Mission</span> is to be “a professional
              membership-based organization influencing and supporting policies, laws
              development and practices that champion and foster people harmonization,
              inclusive prosperity, and a sustainable planet for the benefit of all
              diverse Cambodians.”
            </p>

            <p>
              <span className="font-bold">Our core values</span> are Trust,
              Empowerment, Accountable Management for Results, and Sustainability
              (TEAMS). These are supported by our institutional governance policies
              and practice, program delivery, and our commitment to integrity and
              best practices by NGOF staff and Board. Our values are applied across
              all places of work and promoted with partners and members.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <img
              src="/images/about/image.png"
              alt="About Team"
              className="w-full rounded-3xl shadow-lg object-cover"
            />
          </div>
        </div>

      </section>

      {/* FAQ SECTION */}
      <section className="bg-white m-4 md:m-14">
        <div className="max-w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

          {/* LEFT SIDE TITLE */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900">
              Get to Know More About NGOF
            </h2>
          </div>

          {/* RIGHT SIDE ACCORDION */}
          <div className="col-span-2 space-y-6">
            {items.map((item, index) => (
              <div key={index} className="border-b border-gray-400 pb-4 ">
                <button
                  className="w-full flex justify-between items-center text-left hover:text-green-500"
                  onClick={() => toggle(index)}
                >
                  <span className="text-lg md:text-xl font-semibold text-gray-900 hover:text-green-500">
                    {item.title}
                  </span>

                  {open === index ? (
                    <ChevronUp size={22} className="text-gray-700 hover:text-green-500" />
                  ) : (
                    <ChevronDown size={22} className="text-gray-700 hover:text-green-500" />
                  )}
                </button>

                {/* CONTENT */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${open === index ? "max-h-[300px] opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
