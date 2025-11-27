import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DonateStep1() {
  const navigate = useNavigate();
  const presetAmounts = [1, 5, 10, 20, 30, 50, 100, 250];

  const [amount, setAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  // Auto-add $ when user types
  const handleCustomAmount = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // only numbers

    if (raw === "") {
      setCustomAmount(""); // empty → no $
    } else {
      setCustomAmount(`$${raw}`);
    }

    setAmount(null);
  };

  const handleNext = () => {
    const finalAmount = amount || Number(customAmount);

    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    navigate("/donate/info", { state: { amount: finalAmount } });
  };

  return (
    <div className="bg-gray-100">

      {/* HERO IMAGE + TITLE */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/project/bg-donate.jpg"
          alt="About Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="absolute inset-0 flex justify-center items-center 
                   text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          About Us
        </h1>
      </div>
      <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6 p-2 lg:p-6">

        {/* LEFT — Impact Story */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-extrabold text-green-700 text-center leading-normal mb-4">
            Together, We Build a Peaceful and Sustainable Future
          </h1>

          <p className="text-gray-700 text-sm lg:text-base leading-relaxed lg:mb-6 mb-4">
            Your donation directly supports NGO Forum on Cambodia in advancing METRI — our Multi-stakeholder Engagement for a Transformative, Resilient, and Inclusive Society. Through this platform, we work toward a peaceful, inclusive, and sustainable Cambodia by fostering harmonization, prosperity, and a greener future for all.
          </p>

          {/* IMPACT LIST */}
          <div className="space-y-3 lg:space-y-5 lg:mb-6 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-green-700 text-xl lg:text-xl">✔</span>
              <p className="text-gray-700 text-sm lg:text-base">
                Engage diverse stakeholders to promote peace, social harmony, and inclusive development.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-700 text-xl lg:text-xl">✔</span>
              <p className="text-gray-700 text-sm lg:text-base">
                Strengthen resilience and sustainability in environmental and climate-related decision-making.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-700 text-xl lg:text-xl">✔</span>
              <p className="text-gray-700 text-sm lg:text-base">
                Empower civil society, communities, and professional members to drive positive change.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-700 text-xl lg:text-xl">✔</span>
              <p className="text-gray-700 text-sm lg:text-base">
                Advance transparency, accountability, and long-term prosperity for all Cambodians.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Donation Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">

          <h2 className="text-2xl lg:text-3xl font-bold text-center text-green-700 mb-4">
            Select Your Donation Amount
          </h2>

          <p className="text-gray-600 text-center mb-4 text-sm lg:text-base">
            Every contribution strengthens our mission.
          </p>

          {/* Preset Amount Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mb-4">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount("");
                }}
                className={`p-2 md:p-3 rounded-xl font-semibold border transition-all
                text-lg ${amount === amt
                    ? "bg-green-700 text-white border-green-800 shadow-md scale-105"
                    : "bg-gray-50 border-gray-300 hover:bg-white hover:shadow"
                  }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <label className="block font-semibold text-gray-700 text-center mb-2 lg:mb-4 text-sm md:text-base">
            Or enter a custom amount
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600 mb-4 lg:mb-6 text-sm md:text-base"
            placeholder="Enter a custom amount"
            value={customAmount}
            onChange={handleCustomAmount}
          />

          {/* Donate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="px-3 py-2 bg-green-700 text-white font-bold text-sm lg:text-lg rounded-lg shadow-md hover:bg-green-800 transition-all"
            >
              Donate Now →
            </button>
          </div>

          <p className="text-center mt-3 lg:mt-6 text-gray-600 text-xs md:text-sm">
            🔒 Secure & encrypted donation
          </p>
        </div>
      </div>
    </div>
  );
}
