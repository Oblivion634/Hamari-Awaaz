import { User, Shield, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import api from "../api/axios.js";
import { ENDPOINTS } from "../utils/constants.js";

// ==================== LOGIN PAGE ====================
// Handles email/password authentication and redirects by backend role.
// ====================================================

const Login = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  // ---------- LOGIN SUBMISSION ----------
  // Creates the backend session, hydrates user data, and routes by role.
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await api.post(ENDPOINTS.LOGIN, { email, password });

      const res = await api.get(ENDPOINTS.GETUSER);
      const loggedInUser = res.data.user;
      setUser(loggedInUser);

      if (loggedInUser.role === "user") {
        navigate("/user-dashboard");
      } else {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  const baseBtn =
    "py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300";

  const getBtnClass = (type) =>
    `${baseBtn} ${role === type
      ? "bg-blue-500 text-white shadow-md scale-105"
      : "bg-white text-black hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md rounded-2xl shadow-lg bg-white overflow-hidden animate-fadeIn my-7">
        {/* ---------- AUTH HEADER ---------- */}
        <div className="bg-gradient-to-br from-[#f19328] to-[#e27a25] text-white flex flex-col items-center justify-center py-8 gap-3">
          <div className="bg-white p-3 rounded-full shadow-md">
            <User className="w-6 h-6 text-[#f79b40]" />
          </div>
          <h1 className="font-bold text-3xl">Welcome Back</h1>
          <p className="text-sm opacity-90">Login to your account</p>
        </div>

        {/* ---------- ROLE SELECTOR ---------- */}
        <div className="p-4 bg-gray-100 flex items-center justify-center gap-3">
          <button
            onClick={() => setRole("user")}
            className={getBtnClass("user")}
          >
            <User className="w-5 h-5" />
            User
          </button>

          <button
            onClick={() => setRole("admin")}
            className={getBtnClass("admin")}
          >
            <Shield className="w-5 h-5" />
            Admin
          </button>
        </div>

        {/* ---------- LOGIN FORM ---------- */}
        <form className="p-6 space-y-5" onSubmit={handleLogin}>
          {/* ---------- GOOGLE OAUTH ACTION ---------- */}
          <div>
            <button
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:9000/api/auth/google";
              }}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition mb-6 mt-4"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login with Google
            </button>
            <label htmlFor="email" className="block font-medium text-sm">
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
                className="border rounded-xl pl-10 pr-3 py-3 w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* ---------- PASSWORD FIELD ---------- */}
          <div>
            <label htmlFor="password" className="block font-medium text-sm">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="border rounded-xl pl-10 pr-3 py-3 w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* ---------- ACCOUNT OPTIONS ---------- */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-black" />
              Remember Me
            </label>

            <span className="text-blue-500 hover:underline cursor-pointer transition">
              Forgot Password?
            </span>
          </div>



          {/* ---------- SUBMIT ACTION ---------- */}
          <button
            type="submit"
            className="w-full text-white bg-[#FF9933] font-medium rounded-xl py-3 mt-2 hover:bg-[#e6852c] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Login
          </button>

          {/* ---------- SIGNUP PROMPT ---------- */}
          {role === "user" && (
            <div className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
