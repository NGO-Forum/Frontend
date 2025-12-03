import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../API/api";
import Swal from "sweetalert2";

export default function DonateStep2() {
  const location = useLocation();
  const navigate = useNavigate();

  const amount = location.state?.amount;

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  if (!amount) navigate("/donate");

  // ----------------------------
  // 1️⃣ Generate QR Code
  // ----------------------------
  const generateQR = async () => {
    if (!form.full_name || !form.email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Name and Email are required.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/khqr/generate", {
        amount,
        full_name: form.full_name,
      });

      const qrBase64 = res.data.qr;
      const tx = res.data.transaction;
      setTransaction(tx);

      const imgSrc = `data:image/svg+xml;base64,${qrBase64}`;

      Swal.fire({
        icon: "info",
        title: "Scan to Pay",
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <img src="${imgSrc}" style="width:240px;height:240px;border:1px solid #ccc;padding:8px;border-radius:10px;" />
            <p style="font-size:14px;color:#4b5563;">
              After payment, please wait while we verify it.
              This window can remain open during payment.
            </p>
          </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 350,
      });

      // AUTO CHECK payment every 3 seconds
      const interval = setInterval(() => checkPaymentStatus(tx), 3000);

      // STOP after 5 minutes
      setTimeout(() => {
        clearInterval(interval);

        if (!isPaid) {
          Swal.fire({
            icon: "warning",
            title: "Payment Not Detected",
            html: `
            <p style="font-size:14px;color:#444;">
              We did not detect your payment within <b>5 minutes</b>.
            </p>
            <p style="margin-top:10px">
              If you already paid, please tap 
              <b>"I Have Paid — Save Donation"</b>.
            </p>
          `,
            confirmButtonText: "OK",
          });
        }
      }, 5 * 60 * 1000);


    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "QR Generation Failed",
        text: "Please try again.",
      });
    }

    setLoading(false);
  };

  // ----------------------------
  // 2️⃣ Auto-check payment status
  // ----------------------------
  const checkPaymentStatus = async (tx) => {
    try {
      const res = await api.get(`/khqr/status/${tx}`);

      if (res.data.paid) {
        clearInterval(pollingInterval);
        setIsPaid(true);

        Swal.fire({
          icon: "success",
          title: "Payment Confirmed 🎉",
          text: "Thank you for your donation!",
          timer: 2000,
          showConfirmButton: false,
        });

        saveDonation(); // auto save donation
      }
    } catch (err) {
      console.warn("Status check failed:", err.message);
    }
  };

  // ----------------------------
  // 3️⃣ Manual Save (Fallback)
  // ----------------------------
  const saveDonation = async () => {
    try {
      await api.post("/donations", {
        ...form,
        amount,
        transaction,
      });

      navigate("/donate");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Saving Failed",
        text: "Could not save donation.",
      });
    }
  };

  // Manual button:
  const manualSave = async () => {
    Swal.fire({
      icon: "info",
      title: "Saving Donation...",
      text: "Please wait...",
      timer: 1000,
      showConfirmButton: false,
    });

    await saveDonation();
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
      <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

        {/* LEFT — Impact Story */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-extrabold text-green-700 text-center leading-snug mb-4">
            Together, We Build a Peaceful and Sustainable Future
          </h1>

          <p className="text-gray-700 text-base lg:text-base leading-relaxed lg:mb-6 mb-4">
            Your donation directly supports NGO Forum on Cambodia in advancing METRI — our Multi-stakeholder Engagement for a Transformative, Resilient, and Inclusive Society. Through this platform, we work toward a peaceful, inclusive, and sustainable Cambodia by fostering harmonization, prosperity, and a greener future for all.
          </p>

          {/* IMPACT LIST */}
          <div className="space-y-3 lg:space-y-5">
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
        <div>
          <div className="bg-white p-6 shadow rounded-xl">

            <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 text-center text-green-700">
              Donor Information
            </h2>

            <p className="text-center text-lg lg:text-xl font-semibold mb-4">
              Donation Amount:{" "}
              <span className="text-green-700 font-bold">${Number(amount).toFixed(2)}</span>
            </p>

            {/* Form */}
            <div className="space-y-4">

              <div>
                <label className="font-semibold">Full Name *</label>
                <input
                  className="w-full border p-2 rounded-lg mt-1"
                  placeholder="Enter Your Name"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </div>

              <div>
                <label className="font-semibold">Email *</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded-lg mt-1"
                  placeholder="Enter Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="font-semibold">Phone</label>
                <input
                  className="w-full border p-2 rounded-lg mt-1"
                  placeholder="Enter Your Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="font-semibold">Message (Optional)</label>
                <textarea
                  className="w-full border p-2 rounded-lg mt-1"
                  placeholder="Enter Message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

            </div>

            <div className="flex flex-col gap-3 items-center mt-6">
              <button
                onClick={generateQR}
                disabled={loading}
                className="px-4 bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 disabled:opacity-60"
              >
                {loading ? "Generating..." : "Submit"}
              </button>

              {/* Optional manual "I've paid" button (if you still want it) */}
              {transaction && (
                <button
                  onClick={manualSave}
                  className="border border-green-600 text-green-700 py-2 rounded-lg font-semibold hover:bg-green-50"
                >
                  ✔ I Have Paid — Save My Donation
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}