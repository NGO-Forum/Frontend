import { useState } from "react";
import { api } from "../../API/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-100 px-4">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.12),transparent_40%)]" />

      {/* Card */}
      <form
        onSubmit={submitLogin}
        className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-lg">
            🔐
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-slate-800">
          Admin Login
        </h2>
        <p className="text-center text-sm text-slate-500 mb-6">
          Access the admin dashboard securely
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-600">
            Password
          </label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 pr-10 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-emerald-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg"
        >
          Login
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © NGO Website • Secure Access
        </p>
      </form>
    </div>
  );
}