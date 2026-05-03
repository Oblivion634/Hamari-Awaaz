import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, UserPlus, MapPin } from "lucide-react";
import api from "../api/axios.js";
import { ENDPOINTS } from "../utils/constants.js";
import { State, City } from "country-state-city";

// ==================== SIGNUP PAGE ====================
// Handles local account creation and basic client-side validation.
// =====================================================

export default function SignupPage() {
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

  // ---------- SIGNUP SUBMISSION ----------
  // Validates password confirmation and sends account data to the backend.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const res = await api.post(ENDPOINTS.SIGNUP, dataToSend);
      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  // ---------- FORM STATE ----------
  // Updates the field matching each input's name attribute.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* ---------- SIGNUP HEADER ---------- */}
          <div className="bg-gradient-to-r from-[#138808] to-[#0f6b06] p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-[#138808]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join Hamari Awaaz
            </h1>
            <p className="text-white/90">Create your account to get started</p>
          </div>

          {/* ---------- ACCOUNT FORM ---------- */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "http://localhost:9000/api/auth/google";
                }}
                className=" md:col-span-2 w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition mb-6 mt-4"
              >
                {/* ---------- GOOGLE SIGNUP PLACEHOLDER ---------- */}
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                  />
                </div>
              </div>

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
                      <option key={state.isoCode} value={state.name} />
                    ))}
                  </datalist>
                </div>
              </div>

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
                      formData.state ? "Select or type city" : "Select state first"
                    }
                    disabled={!formData.state}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  />

                  <datalist id="cities">
                    {cities.map((city) => (
                      <option key={city.name} value={city.name} />
                    ))}
                  </datalist>
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                  />
                </div>
              </div>

              <div className=" md:col-span-2 flex items-center justify-center">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-[#138808] border-gray-300 rounded focus:ring-[#138808] mt-1"
                />
                <label className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-[#1E88E5] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#1E88E5] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className=" md:col-span-2 w-full bg-[#138808] text-white py-3 rounded-lg font-semibold hover:bg-[#0f6b06] transition-all shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
            </div>

          </form>

          {/* ---------- LOGIN REDIRECT ---------- */}
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
