
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, X, Menu } from "lucide-react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const menuRef = useRef(null);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setOpenDropdown(null);
      setActiveItem(null);
    }, 300);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    }
    if (mobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenu]);

  const whoWeAre = [
    {
      name: "About Us",
      path: "/about",
      title: "About Us",
      text: "The NGOF is a membership organization that builds NGO cooperation and capacity, supporting NGO networks and other civil society organizations to engage in policy dialogue, debate and advocacy.",
      image: "/images/whoWeAre/about.png",
    },
    {
      name: "History",
      path: "/history",
      title: "History",
      text: "The NGOF was established in the 1980s with an international Steering Committee which in the beginning focused on international advocacy for ending aid embargoes and land-mine clearance.",
      image: "/images/whoWeAre/history.png",
    },
    {
      name: "Organizational Structure",
      path: "/structure",
      title: "Organizational Structure",
      text: "Get to know our people. Meet the faces behind our success – a diverse and talented team of professionals who bring passion, expertise, and dedication to everything they do.",
      image: "/images/whoWeAre/organization.png",
    },
    {
      name: "Contact Us",
      path: "/contact",
      title: "Contact Us",
      text: `Email: info@ngoforum.org.kh  
        Tel: (855)23-214-429  

        Location: #9-11, St.476, Toul Tompoung1, Phnom Penh, Cambodia.  
        P.O. Box 2295 Phnom Penh  

        We would love to hear from you!  
        Feel free to reach out to our team.
        `,
      image: "/images/whoWeAre/contact.png",
    },
  ];

  const whatWeDo = [
    {
      name: "",
      path: "/program",
      text: `
        The NGO Forum on Cambodia is pleased to introduce its new strategic plan 2024 - 2030 (Vision 2030) called Multi-Stakeholder Engagement for Transformative, Resilient, and Inclusive Society - METRI. METRI is divided into 4 Main Programs:

        • PALI
        • SACHAS
        • RITI
        • MACOR
          `,
      image: "/images/WhatWeDo/program.png",
    },
    {
      name: "PALI",
      path: "/pali",
      title: "Policies and Legal Influences (PALI)",
      text: "PALI aims to engage and influence global, regional, and national laws and policies affecting the poor, indigenous, marginalized, and vulnerable groups and people.",
      image: "/images/WhatWeDo/pili.png",
    },
    {
      name: "SACHAS",
      path: "/sachas",
      title:
        "Solidarity Actions for Community Harmonization and Sustainability (SACHAS)",
      text: "SACHAS aims at supporting NGOF’s members, partners, and communities to operationalize key laws and policies mentioned above into practices, and to support their local-led initiatives to transform their communities toward harmonious, prosperous, resilient and sustainable ones.",
      image: "/images/WhatWeDo/sachas.png",
    },
    {
      name: "RITI",
      path: "/riti",
      title: "Resilient, Innovative, and Transformative Institution (RITI)",
      text: "RITI aims to transform the NGOF, NGOF’s members and their partners/communities (incl. ACs, CPA, CFi, and CF) so that they will become resilient, innovative, and transformative institutions that can sustainably support Cambodia’s development.",
      image: "/images/WhatWeDo/riti.png",
    },
    {
      name: "MACOR",
      path: "/macor",
      title:
        "Management of Accounting, Competencies, Operations and Resources (MACOR)",
      text: "MACOR aims at supporting the NGOF to become a transparent, accountable, responsible and sustainable membership-based organization.",
      image: "/images/WhatWeDo/macor.png",
    },
  ];

  const ResourceHub = [
    {
      name: "Our Latest",
      path: "/latest",
      title: "Our Latest",
      text: "Where you can find the latest updates about our work.",
      image: "/images/ResourceHub/latest.png",
    },
    {
      name: "Media Centre",
      path: "/media",
      title: "Media Centre",
      text: "At this section, you can find our Press Release, Media Coverage, about our works and our members.",
      image: "/images/ResourceHub/media.png",
    },
    {
      name: "Library",
      path: "/library",
      title: "Library",
      text: "You can access NGOF’s policy brief, Publications, Research Report and more.",
      image: "/images/ResourceHub/library.png",
    },
  ];

  const GetInvolved = [
    {
      name: "Membership",
      path: "/membership",
      title: "Membership",
      text: "International and local NGOs operating in Cambodia that are committed to NGO Forum’s mission and to participating in NGO Forum activities may apply for membership of the NGO Forum.",
      image: "/images/GetInvolved/membership.png",
    },
    {
      name: "Volunteer / Intern",
      path: "/volunteer",
      title: "Volunteer",
      text: "At the NGO Forum on Cambodia, we welcome everyone who is interested in working with us voluntarily.",
      image: "/images/GetInvolved/voluteer.png",
    },
    {
      name: "Careers",
      path: "/careers",
      title: "Careers",
      text: "Explore more job opportunities at the NGO Forum on Cambodia or contact our team for more information.",
      image: "/images/GetInvolved/carrer.png",
    },
  ];

  const OurProjects = [
    {
      name: "PROJECTS",
      path: "/project",
      title: "OUR PROJECTS",
      text: "Organized across the METRI pillars—PALI, SACHAS, RITI, and MACOR—each project tackles a specific programmatic challenge, from climate governance and land management to financial transparency, civic space, and institutional resilience. Supported by diverse development partners and CSO networks, these efforts ensure that NGOF’s collective mission is translated into concrete actions and measurable results.",
      image: "/images/project/IMG_8390.JPG",
    },
    {
      name: "OUR IMPACTS",
      path: "/impacts",
      title: "OUR IMPACTS",
      text: "By 2030, NGOF aims to strengthen citizen and civil society influence in Cambodia’s policy and legal processes, helping ensure development decisions are fair, inclusive, and environmentally sustainable. At the same time, NGOF will build a resilient network of communities and partners capable of advocating for resource rights and monitoring key laws, supported by stronger internal systems and organizational capacities.",
      image: "/images/project/impact.jpg",
    },
  ]
  return (
    <nav className="w-full p-4 bg-white shadow-md sticky top-0 z-50 flex justify-center">
      <div className="flex items-center justify-between w-[95%] max-w-[1400px] flex-wrap">
        {/* ✅ Responsive Logo */}
        <NavLink to="/" className="text-xl font-bold text-green-700 whitespace-nowrap flex items-center">
          <img
            src="/logo.png"
            alt="logo"
            className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
          />
        </NavLink>

        {/* ✅ Responsive Menu */}
        <ul className="hidden lg:flex flex-wrap space-x-6 lg:space-x-10 text-gray-800 font-medium justify-center items-center">
          {/* Who We Are */}
          <li className="relative" onMouseEnter={() => setOpenDropdown("who")}>
            <button className="hover:text-green-700">Who We Are</button>
            {openDropdown === "who" && (
              <div
                className="absolute left-1/2 lg:left-[19.65rem] -translate-x-1/2 top-full mt-4 bg-green-700 text-white rounded-md shadow-xl w-[95vw] md:w-[900px] lg:w-[1000px] flex flex-col md:flex-row justify-between"
                onMouseEnter={() => setOpenDropdown("who")}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="w-full md:w-1/4 p-4 flex flex-col justify-center">
                  {whoWeAre.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onMouseEnter={() => setActiveItem(item)}
                        className={({ isActive }) =>
                          "block px-3 py-2 rounded-md mb-3 text-sm sm:text-base " +
                          (isActive ? "bg-yellow-500 text-white font-semibold" : "hover:bg-green-800")
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="w-full md:w-3/4 p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg md:text-xl font-bold mb-3">
                      {activeItem?.title || whoWeAre[0].title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                      {activeItem?.text || whoWeAre[0].text}
                    </p>
                  </div>
                  <div className="w-full md:w-72 h-40 md:h-64 lg:h-72 mt-4 md:mt-0">
                    <img
                      src={activeItem?.image || whoWeAre[0].image}
                      alt="who we are"
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* What We Do */}
          <li className="relative" onMouseEnter={() => setOpenDropdown("what")}>
            <button className="hover:text-green-700">What We Do</button>
            {openDropdown === "what" && (
              <div
                className="absolute left-1/2 lg:left-[11.4rem] -translate-x-1/2 top-full mt-4 bg-green-700 text-white rounded-md shadow-xl w-[95vw] md:w-[900px] lg:w-[1000px] flex flex-col md:flex-row justify-between"
                onMouseEnter={() => setOpenDropdown("what")}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="w-full md:w-1/4 p-4 flex flex-col justify-center">
                  {whatWeDo.slice(1).map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onMouseEnter={() => setActiveItem(item)}
                        className={({ isActive }) =>
                          "block px-3 py-2 rounded-md mb-3 text-sm sm:text-base " +
                          (isActive ? "bg-yellow-500 text-white font-semibold" : "hover:bg-green-800")
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="w-full md:w-3/4 p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg md:text-xl font-bold mb-3">
                      {activeItem?.title || whatWeDo[0].title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                      {activeItem?.text || whatWeDo[0].text}
                    </p>
                  </div>
                  <div className="w-full md:w-72 h-40 md:h-64 lg:h-72 mt-4 md:mt-0">
                    <img
                      src={activeItem?.image || whatWeDo[0].image}
                      alt="What We Do"
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Resource Hub */}
          <li className="relative" onMouseEnter={() => setOpenDropdown("resource")}>
            <button className="hover:text-green-700">Resource Hub</button>
            {openDropdown === "resource" && (
              <div
                className="absolute left-1/2 lg:-right-[1rem] -translate-x-1/2 top-full mt-4 bg-green-700 text-white rounded-md shadow-xl w-[95vw] md:w-[900px] lg:w-[1000px] flex flex-col md:flex-row justify-between"
                onMouseEnter={() => setOpenDropdown("resource")}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="w-full md:w-1/4 p-4 flex flex-col justify-center">
                  {ResourceHub.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onMouseEnter={() => setActiveItem(item)}
                        className={({ isActive }) =>
                          "block px-3 py-2 rounded-md mb-3 text-sm sm:text-base " +
                          (isActive ? "bg-yellow-500 text-white font-semibold" : "hover:bg-green-800")
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="w-full md:w-3/4 p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg md:text-xl font-bold mb-3">
                      {activeItem?.title || ResourceHub[0].title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                      {activeItem?.text || ResourceHub[0].text}
                    </p>
                  </div>
                  <div className="w-full md:w-72 h-40 md:h-64 lg:h-72 mt-4 md:mt-0">
                    <img
                      src={activeItem?.image || ResourceHub[0].image}
                      alt="Resource Hub"
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Get Involved */}
          <li className="relative" onMouseEnter={() => setOpenDropdown("involved")}>
            <button className="hover:text-green-700">Get Involved</button>
            {openDropdown === "involved" && (
              <div
                className="absolute left-1/2 lg:-left-[5.65rem] -translate-x-1/2 top-full mt-4 bg-green-700 text-white rounded-md shadow-xl w-[95vw] md:w-[900px] lg:w-[1000px] flex flex-col md:flex-row justify-between"
                onMouseEnter={() => setOpenDropdown("involved")}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="w-full md:w-1/4 p-4 flex flex-col justify-center">
                  {GetInvolved.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onMouseEnter={() => setActiveItem(item)}
                        className={({ isActive }) =>
                          "block px-3 py-2 rounded-md mb-3 text-sm sm:text-base " +
                          (isActive ? "bg-yellow-500 text-white font-semibold" : "hover:bg-green-800")
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="w-full md:w-3/4 p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg md:text-xl font-bold mb-3">
                      {activeItem?.title || GetInvolved[0].title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                      {activeItem?.text || GetInvolved[0].text}
                    </p>
                  </div>
                  <div className="w-full md:w-72 h-40 md:h-64 lg:h-72 mt-4 md:mt-0">
                    <img
                      src={activeItem?.image || GetInvolved[0].image}
                      alt="Get Involved"
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Our Project */}
          <li className="relative" onMouseEnter={() => setOpenDropdown("project")}>
            <button className="hover:text-green-700">Our Project</button>
            {openDropdown === "project" && (
              <div
                className="absolute left-1/2 lg:-left-[13.9rem] -translate-x-1/2 top-full mt-4 bg-green-700 text-white rounded-md shadow-xl w-[95vw] md:w-[900px] lg:w-[1000px] flex flex-col md:flex-row justify-between"
                onMouseEnter={() => setOpenDropdown("project")}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="w-full md:w-1/4 p-4 flex flex-col justify-center">
                  {OurProjects.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onMouseEnter={() => setActiveItem(item)}
                        className={({ isActive }) =>
                          "block px-3 py-2 rounded-md mb-3 text-sm sm:text-base " +
                          (isActive ? "bg-yellow-500 text-white font-semibold" : "hover:bg-green-800")
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="w-full md:w-3/4 p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg md:text-xl font-bold mb-3">
                      {activeItem?.title || OurProjects[0].title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                      {activeItem?.text || OurProjects[0].text}
                    </p>
                  </div>
                  <div className="w-full md:w-72 h-40 md:h-64 lg:h-72 mt-4 md:mt-0">
                    <img
                      src={activeItem?.image || OurProjects[0].image}
                      alt="Get Involved"
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* ✅ Donate Button responsive */}
        <NavLink to="/donate" className="hidden lg:block bg-green-600 hover:bg-orange-600 text-white px-4 sm:px-6 py-1 rounded-md text-sm sm:text-base">
          Donate
        </NavLink>

        {/* ✅ Mobile Toggle (tablet & phone only) */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="block lg:hidden text-green-700 text-2xl ml-2"
        >
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Dropdown */}
        {mobileMenu && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl py-4 px-6 border border-gray-100 
    w-[90%] sm:w-[95%] md:w-[95%] lg:hidden transition-all duration-300">

            {/* Collapsible sections */}
            <MobileDropdown
              title="Who We Are"
              items={whoWeAre}
              isOpen={mobileSubmenu === "who"}
              toggle={() =>
                setMobileSubmenu(mobileSubmenu === "who" ? null : "who")
              }
              closeMenu={() => setMobileMenu(false)}
            />
            <MobileDropdown
              title="What We Do"
              items={whatWeDo}
              isOpen={mobileSubmenu === "what"}
              toggle={() =>
                setMobileSubmenu(mobileSubmenu === "what" ? null : "what")
              }
              closeMenu={() => setMobileMenu(false)}
            />
            <MobileDropdown
              title="Resource Hub"
              items={ResourceHub}
              isOpen={mobileSubmenu === "resource"}
              toggle={() =>
                setMobileSubmenu(mobileSubmenu === "resource" ? null : "resource")
              }
              closeMenu={() => setMobileMenu(false)}
            />
            <MobileDropdown
              title="Get Involved"
              items={GetInvolved}
              isOpen={mobileSubmenu === "involved"}
              toggle={() =>
                setMobileSubmenu(mobileSubmenu === "involved" ? null : "involved")
              }
              closeMenu={() => setMobileMenu(false)}
            />
            <MobileDropdown
              title="Our Projects"
              items={OurProjects}
              isOpen={mobileSubmenu === "project"}
              toggle={() =>
                setMobileSubmenu(mobileSubmenu === "project" ? null : "project")
              }
              closeMenu={() => setMobileMenu(false)}
            />

            {/* Language & Donate */}
            <div className="flex items-center justify-between mt-6">
              <span className="font-medium text-gray-700">Language:</span>
              <NavLink
                to="/donate" 
                onClick={() => setMobileMenu(false)} 
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium">
                Donate
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ✅ Reusable mobile dropdown component */
function MobileDropdown({ title, items, isOpen, toggle, closeMenu }) {
  return (
    <div className="border-b border-gray-200 py-2">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center py-2 text-gray-800 font-medium text-base"
      >
        {title}
        <span
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        >
          {isOpen ? (
            <ChevronUp size={18} className="text-green-600" />
          ) : (
            <ChevronDown size={18} className="text-green-600" />
          )}
        </span>
      </button>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="pl-4 mt-2 space-y-2">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={closeMenu} // ✅ Close the menu when clicked
                className="block text-gray-600 hover:text-green-700"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
