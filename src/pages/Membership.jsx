import React, { useEffect, useState } from "react";
import { api } from "../API/api";
import MemberSlider from "../components/MembershipSlide";

export default function Membership() {

  const [members, setMembers] = useState([]);
  const [networks, setNetworks] = useState([]);

  // Load Members
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await api.get("/members");
        setMembers(res.data);
      } catch (error) {
        console.error("Failed to load members:", error);
      }
    };
    loadMembers();
  }, []);

  // Load Networks + Files
  useEffect(() => {
    const loadNetworks = async () => {
      try {
        const res = await api.get("/networks");
        setNetworks(res.data);
      } catch (err) {
        console.error("Failed to load networks:", err);
      }
    };
    loadNetworks();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row bg-white shadow">

        {/* Left image */}
        <div className="w-full lg:w-[55%] h-64 md:h-80 lg:h-auto">
          <img
            src="/images/GetInvolved/bg-membership.jpg"
            alt="Group Photo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right text */}
        <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-12 w-full lg:w-[45%]">
          <h2 className="text-xl md:text-4xl lg:text-3xl text-gray-900">
            Want to Become Our Member?
            <span className="text-green-700 font-bold"> Check it out</span>
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-lg">
            As of the first quarter of {new Date().getFullYear()}, there are
            <span className="text-green-700 font-bold"> {members.length} </span>
            organizations that have become our members.
          </p>

          <a
            href="#"
            className="mt-6 inline-block py-2 bg-green-600 text-center text-white font-medium rounded-xl hover:bg-green-700 w-28 lg:w-32"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* ACCORDION SECTION */}
      <section className="max-w-full mx-auto mt-6 mb-6 px-6 md:px-8 bg-white rounded-md shadow">
        <div className="divide-y divide-gray-300">

          {/* Membership Benefits */}
          <details className="py-5">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Membership Benefits
              <svg className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <p className="mt-3 text-gray-600 text-sm md:text-base">
              The main benefit of membership is being able to join in the joint advocacy activities, sharing of information, and educational opportunities provided by the NGO Forum. Through working together in the NGO Forum, NGOs are able to achieve their common advocacy objectives.
            </p>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              While the NGO Forum reserves the right to invite non-members to some of its activities, member organizations have the first priority for all invitations and information dissemination. Members of the NGO Forum are automatically invited to become part of any and all of the NGO Forum’s networks. Members may be invited to Forum-sponsored functions, trainings and workshops. Members will receive information bulletins, newsletters, briefing papers, reports and educational material published by the NGO Forum.
            </p>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              Most importantly, member NGOs have the opportunity to influence decisions being made on Forum policies, priorities, strategies and actions, and to raise issues of concern. This includes voting on statements and positions taken by the NGO Forum, and standing for election to the NGO Forum’s Management Committee.
            </p>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              The NGO Forum provides NGOs the opportunity to meet and work alongside representatives from many international and Cambodian NGOs with common values and interests, and with common advocacy goals.
            </p>
          </details>

          {/* Member Responsibilities */}
          <details className="py-5">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Member Responsibilities
              <svg className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Member organisations should be committed to actively participating in the work of the NGO Forum. They should also be willing to take prompt action to commit their NGO to a public stance on issues of public concern. Member meetings are held quarterly in Phnom Penh. The NGO Forum will cover the travel costs of participants from the provinces, if not covered by any other funding source. All full member organizations need to participate in elections for the NGO Forum Management Committee, which governs the NGO Forum on behalf of the members.
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              It is expected that all member organizations will be involved in at least one of the various NGO working groups or networks facilitated by the NGO Forum.
            </p>
          </details>

          {/* Who can become a member */}
          <details className="py-5">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Who can Become Our Member
              <svg className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <p className="mt-2 text-gray-600 text-sm md:text-base">
              International and local NGOs operating in Cambodia that are committed to NGO Forum’s mission and to participating in NGO Forum activities may apply for membership of the NGO Forum. Applications for membership are considered by the Management Committee of the NGO Forum, a committee elected from among the member organisations. Eligibility criteria are described in the NGO Forum’s By-Laws.
            </p>
          </details>

          {/* Become Full Member */}
          <details className="py-5">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Become a Full Member
              <svg className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Full Member Organizations: Agencies with Full Member status have the right of voice and vote in Member Meetings. Staff of agencies with Full Member status may be elected to serve on the Management Committee.
            </p>

            <p className="mt-4 text-gray-800 font-semibold">Eligibility</p>
            <ol className="list-decimal list-inside mt-2 text-sm md:text-base text-gray-600 space-y-1">
              <li>Applicants for full membership of the NGO FORUM must be non-government organizations (NGOs), which are not-for-profit, not for proselytizing, and not aligned with any political party inside or outside the country;</li>
              <li>Have an office or Representative inside the country;</li>
              <li>Are implementing or supporting on-going programs in Cambodia which are beneficial to the well being of the Cambodian people, normally evidenced by at least two years experience of implementing or supporting projects in Cambodia;</li>
              <li>Have as a primary objective the provision of development and humanitarian assistance, including educational and advocacy activities;</li>
              <li>Have a genuine concern for the impact of social, economic, political and environmental developments on the lives of Cambodian people;</li>
              <li>Are committed to actively participating in working groups and meetings of the Forum;</li>
              <li>Are willing to take prompt action to commit their NGO to a public stance on issues of public concern here in Cambodia;</li>
              <li>Are committed to exercising their vote on all proposals put to the membership for decision;</li>
              <li>Agree to pay annual membership fees. Fees will be applied on a schedule based on in-country program budget. The fees may be waived where agreed by the Management Committee.</li>
            </ol>
          </details>

          {/* Associate Member */}
          <details className="py-5">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Become an Associate Member
              <svg className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Associate Member Organizations: Agencies with Associate Member status have the right of voice only.
            </p>
            <p className="mt-4 text-gray-800 font-semibold">Eligibility</p>

            <ol className="list-decimal list-inside mt-2 text-sm md:text-base text-gray-600 space-y-1">
              <li>Applicants for Associate Membership of the NGO FORUM must be organizations which satisfy eligibility requirements.</li>
              <li>Applicants for full membership of the NGO FORUM must be non-government organizations (NGOs), which are not-for-profit, not for proselytizing, and not aligned with any political party inside or outside the country.</li>
              <li>Have as a primary objective the provision of development and humanitarian assistance, including educational and advocacy activities.</li>
              <li>Have a genuine concern for the impact of social, economic, political and environmental developments on the lives of Cambodian people.</li>
              <li>Are committed to actively participating in working groups and meetings of the Forum.</li>
              <li>Agencies eligible to be a Full Member may not choose Associate Member status instead of Full Member status.</li>
            </ol>
          </details>

          {/* Membership Costs */}
          <details className="py-5">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Membership Costs
              <svg className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <p className="mt-2 text-gray-600 text-sm md:text-base">
              A small membership fee is charged as a sign of member commitment to the NGO Forum. It ranges from $10 to $300, based on the organisation’s overall budget. Local NGOs who commit to being active members may request a waiver of the membership fee. The main commitment required from members is their active participation.
            </p>
          </details>

          {/* Apply to be Member */}
          <details className="py-5">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Apply to be Our Member
              <svg className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Application forms and Membership fee may be obtained from the NGO Forum office at: #9-11, Street 476, Toul Tompoung I, Phnom Penh, Tel: 023 214 429 or can be download the application from from here: Membership Application Form and Membership Fee.
            </p>
          </details>

          {/* Navifation */}
          <details className="py-5 group">
            <summary className="cursor-pointer text-lg md:text-2xl font-medium text-gray-900 flex justify-between items-center hover:text-green-700">
              Our Existing Networks
              <svg
                className="ml-2 h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <ol className="list-decimal list-inside mt-4 text-sm md:text-base text-gray-800 space-y-6">

              {networks.map((network) => (
                <li key={network.id}>
                  <span className="font-semibold">{network.name}</span>

                  <ul className="list-none mt-2 flex flex-col md:flex-row gap-2 md:gap-6">

                    {network.files
                      .slice()
                      .sort(
                        (a, b) =>
                          ["TOR", "Steering Committee", "Action Plan"].indexOf(a.title) -
                          ["TOR", "Steering Committee", "Action Plan"].indexOf(b.title)
                      )
                      .map((file) => (
                        <li key={file.id}>
                          <a
                            href={file.file_url}
                            target="_blank"
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                          >
                            📄 {file.title}
                          </a>
                        </li>
                      ))}

                  </ul>
                </li>
              ))}

            </ol>
          </details>

        </div>
      </section>

      <section className=" bg-white">
        <MemberSlider />
      </section>

    </div>
  );
}
