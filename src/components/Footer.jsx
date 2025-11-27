import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, X } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      window.location.href = `/search?q=${encodeURIComponent(searchText)}`;
    }
  };
  return (
    <footer className="bg-green-700 text-white p-8 md:p-4 lg:p-12">
      <div className="max-w-full mx-auto">

        {/* Top Bar */}
        <div className="flex flex-row justify-between items-center mb-8 gap-6 md:gap-0">

          {/* Logo */}
          <NavLink to="/" className="flex md:justify-center justify-start w-full md:w-auto">
            <img
              src="/NGO.png"
              alt="logo"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </NavLink>

          {/* Donate + Search */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">

            {/* Donate Button */}
            <NavLink
              to="/donate" className="bg-white text-green-700 px-6 py-1 rounded-md font-medium hover:bg-gray-100 w-full md:w-auto">
              Donate
            </NavLink>

            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="px-4 py-1 w-full md:w-auto rounded-md border border-white text-black pr-10"
                placeholder="Search"
              />
              <span
                className="absolute right-3 top-1.5 text-white cursor-pointer"
                onClick={handleSearch}
              >
                🔍
              </span>
            </div>

          </div>
        </div>


        <hr className="border-white mb-10" />

        {/* Footer Columns */}
        <div className="flex flex-row lg:justify-between lg:items-start gap-8 md:gap-2 lg:gap-6 flex-wrap md:flex-nowrap w-[100%]">

          {/* Column 1 */}
          <div className="w-[57%] md:w-[25%] lg:w-[13%]">
            <h3 className="font-bold text-sm mb-3">Who We Are</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  History
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/structure"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Organizational Structure
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>

          </div>

          {/* Column 2 */}
          <div className="w-[30%] md:w-[14%] lg:w-[10%]">
            <h3 className="font-bold text-sm mb-3">What We Do</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/pali"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  PALI
                </NavLink>
              </li>

              <li>
                <NavLink to="/sachas"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  SACHAS
                </NavLink>
              </li>

              <li>
                <NavLink to="/riti"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  RITI
                </NavLink>
              </li>

              <li>
                <NavLink to="/macor"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  MACOR
                </NavLink>
              </li>
            </ul>

          </div>

          {/* Column 3 */}
          <div className="w-[57%] md:w-[15%] lg:w-[10%]">
            <h3 className="font-bold text-sm mb-3">Resource Hub</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/latest"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Our Latest
                </NavLink>
              </li>

              <li>
                <NavLink to="/media"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Media Centre
                </NavLink>
              </li>

              <li>
                <NavLink to="/library"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Library
                </NavLink>
              </li>
            </ul>

          </div>

          {/* Column 4 */}
          <div className="w-[30%] md:w-[15%] lg:w-[10%]">
            <h3 className="font-bold text-sm mb-3">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/membership"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Membership
                </NavLink>
              </li>

              <li>
                <NavLink to="/volunteer"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Volunteer
                </NavLink>
              </li>

              <li>
                <NavLink to="/careers"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Careers
                </NavLink>
              </li>
            </ul>

          </div>

          {/* Column 5 */}
          <div className="w-[30%] md:w-[15%] lg:w-[10%]">
            <h3 className="font-bold text-sm mb-3">Our Projects</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/project"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Projects
                </NavLink>
              </li>

              <li>
                <NavLink to="/impacts"
                  className={({ isActive }) =>
                    isActive ? "underline font-semibold text-yellow-300" : "hover:underline"
                  }
                >
                  Impacts
                </NavLink>
              </li>
            </ul>

          </div>

          {/* FIND US Column */}
          <div className="w-full md:w-[26%] lg:w-[45%]">
            <h3 className="font-bold text-sm mb-3">FIND US</h3>
            <ul className="space-y-2 text-sm">
              <li className="leading-relaxed">
                Address:{" "}
                <a
                  className="underline hover:text-gray-200"
                  href="https://www.google.com/maps/place/The+NGO+Forum+on+Cambodia/@11.5358285,104.9152802,19z/data=!3m1!4b1!4m6!3m5!1s0x310950dd842e50a1:0x8bae08232d593311!8m2!3d11.5358285!4d104.9159253!16s%2Fg%2F1ptwq44rq?entry=tts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  #9-11, St.476, Toul Tompoung1, Phnom Penh, Cambodia.
                  P.O. Box 2295 Phnom Penh
                </a>
              </li>
              <li>Email: <a className="underline" href="mailto:info@ngoforum.org.kh">info@ngoforum.org.kh</a></li>
              <li>Tel: <a className="underline" href="#">(+855)23-214-429</a></li>
              <li>Fax: <a className="underline" href="#">(+855)23-994-063</a></li>
            </ul>

            {/* Social */}
            <p className="mt-6 mb-3 font-medium">
              Keep yourself informed, connect with us
            </p>

            <div className="flex justify-center md:justify-start lg:space-x-6 space-x-4  text-xl">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/ngoforumoncambodia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center 
               hover:scale-110 hover:shadow-xl border border-white/20 transition-all duration-300"
              >
                <Facebook className="text-white" size={16} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ngof_cambodia?igsh=aGMxaXFxeGV0Z3F2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 
               flex items-center justify-center hover:scale-110 hover:shadow-xl 
               border border-white/20 transition-all duration-300"
              >
                <Instagram className="text-white" size={16} />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@TheNGOForumonCambodia1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center 
               hover:scale-110 hover:shadow-xl border border-white/20 transition-all duration-300"
              >
                <Youtube className="text-white" size={16} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/the-ngof-on-cambodia/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-[#0A66C2] flex items-center justify-center 
               hover:scale-110 hover:shadow-xl border border-white/20 transition-all duration-300"
              >
                <Linkedin className="text-white" size={16} />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/thengoforum"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-black flex items-center justify-center 
               hover:scale-110 hover:shadow-xl border border-white/20 transition-all duration-300"
              >
                <X className="text-white" size={16} />
              </a>

            </div>

          </div>
        </div>

        <hr className="border-white mt-10 mb-6" />

        {/* Copyright */}
        <p className="text-center text-sm text-gray-200">
          © 2024 by The NGO Forum on Cambodia. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
