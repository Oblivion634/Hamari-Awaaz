import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  MapPin,
  Shield,
} from "lucide-react";

import api from "../api/axios.js";
import { ENDPOINTS } from "../utils/constants.js";
import { State, City } from "country-state-city";
import toast from "react-hot-toast";


// ==================== SIGNUP PAGE ====================
// Supports both User + Admin signup with all existing fields.
// =====================================================

export default function SignupPage() {
  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });

  const indianStates = State.getStatesOfCountry("IN");

  const selectedState = indianStates.find(
    (s) => s.name === formData.state
  );

  const cities = selectedState
    ? City.getCitiesOfState("IN", selectedState.isoCode)
    : [];

  const navigate = useNavigate();

  // ==================== SUBMIT ====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const loadingToast = toast.loading("Creating account...");

    try {
      const { confirmPassword, ...dataToSend } = formData;

      // ADD ROLE
      dataToSend.role = role;

      const res = await api.post(
        ENDPOINTS.SIGNUP,
        dataToSend
      );

      toast.success(
        res.data.message || "OTP sent successfully"
      );

      // STORE USER ID
      localStorage.setItem(
        "signupUserId",
        res.data.userId
      );

      // STORE PHONE
      localStorage.setItem(
        "signupPhone",
        formData.phone
      );

      localStorage.setItem(
        "signupEmail",
        formData.email
      );

      // GO TO OTP PAGE
      navigate("/verify-signup-otp");

    } catch (error) {

      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
        "Signup failed. Try again."
      );

    } finally {

      toast.dismiss(loadingToast);

    }
  };

  // ==================== CHANGE HANDLER ====================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const baseBtn =
    "py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300";

  const getBtnClass = (type) =>
    `${baseBtn} ${role === type
      ? "bg-blue-500 text-white shadow-md scale-105"
      : "bg-white text-black hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] py-12 px-4">

      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >

          {/* ==================== HEADER ==================== */}
          <div className="bg-gradient-to-r from-[#138808] to-[#0f6b06] p-8 text-center">

            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-[#138808]" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Join Hamari Awaaz
            </h1>

            <p className="text-white/90">
              Create your account to get started
            </p>

          </div>

          {/* ==================== ROLE SELECTOR ==================== */}
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

          {/* ==================== FORM ==================== */}
          <form onSubmit={handleSubmit} className="p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* GOOGLE */}
              <button
                type="button"
                onClick={() => {
                  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
                }}
                className="md:col-span-2 w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition mb-6 mt-4"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt="Google"
                  className="w-5 h-5"
                />

                Continue with Google
              </button>

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                </div>
              </div>

              {/* STATE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    list="states"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Select or type state"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg"
                  />

                  <datalist id="states">
                    {indianStates.map((state) => (
                      <option
                        key={state.isoCode}
                        value={state.name}
                      />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* CITY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    list="cities"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={
                      formData.state
                        ? "Select or type city"
                        : "Select state first"
                    }
                    disabled={!formData.state}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  />

                  <datalist id="cities">
                    {cities.map((city) => (
                      <option
                        key={city.name}
                        value={city.name}
                      />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* PINCODE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="800008"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                </div>
              </div>

              {/* TERMS */}
              <div className="md:col-span-2 flex items-center justify-center">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-[#138808]"
                />

                <label className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#1E88E5] hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-[#1E88E5] hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className={`md:col-span-2 w-full text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ${role === "admin"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-[#138808] hover:bg-[#0f6b06]"
                  }`}
              >
                Create {role === "admin" ? "Admin" : "User"} Account
              </button>

            </div>

          </form>

          {/* ==================== LOGIN REDIRECT ==================== */}
          <div className="px-8 pb-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}

              <Link
                to="/login"
                className="text-[#1E88E5] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

        </motion.div>

      </div>
    </div>
  );
}