import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MapPin,
  CheckCircle,
  AlertCircle,
  Droplet,
  Zap,
  Construction,
  Trash2,
  Camera,
  MessageCircleMore,
} from "lucide-react";
import api from "../api/axios.js";
import { ENDPOINTS } from "../utils/constants.js";
import BotImage from "../assets/help-bot.png"

export default function ReportIssue() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [detectingLocation, setDetectingLocation] = useState(false);

  // ================= MASCOT GUIDE =================
  const [mascotMessage, setMascotMessage] = useState(
    "👋 Hello! I’ll help you report your civic issue step-by-step."
  );

  const updateMascot = (field) => {
    switch (field) {
      case "title":
        setMascotMessage(
          "📝 Enter a short and clear title for the issue."
        );
        break;

      case "category":
        setMascotMessage(
          "📂 Choose the category that best matches your complaint."
        );
        break;

      case "description":
        setMascotMessage(
          "📖 Explain the issue properly so authorities understand it."
        );
        break;

      case "location":
        setMascotMessage(
          "📍 Add the exact location or use auto-detect."
        );
        break;

      case "image":
        setMascotMessage(
          "📸 Upload a photo for better verification of the issue."
        );
        break;

      case "submit":
        setMascotMessage(
          "🚀 Everything looks good! Submit your complaint now."
        );
        break;

      default:
        setMascotMessage(
          "😊 Fill all details carefully for faster resolution."
        );
    }
  };

  // ================= CATEGORIES =================
  const categories = [
    {
      id: "Road and Infrastructure",
      name: "Road and Infrastructure",
      icon: Construction,
      color: "bg-orange-500",
    },
    {
      id: "Water Supply",
      name: "Water Supply",
      icon: Droplet,
      color: "bg-blue-500",
    },
    {
      id: "Electricity",
      name: "Electricity",
      icon: Zap,
      color: "bg-yellow-500",
    },
    {
      id: "Sanitation and Waste",
      name: "Sanitation & Waste",
      icon: Trash2,
      color: "bg-green-500",
    },
  ];

  // ================= LOCATION DETECTION =================
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    setDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          setFormData((prev) => ({
            ...prev,
            location: data.display_name,
          }));

          setMascotMessage(
            "✅ Location detected successfully!"
          );
        } catch (error) {
          console.log(error);
          alert("Unable to fetch location");
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        alert("Please allow location access");
        setDetectingLocation(false);
      }
    );
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await api.post(
        ENDPOINTS.CREATEISSUE,
        data
      );

      setComplaintId(res.data.data.complaintId);
      setSubmitted(true);

      setTimeout(() => {
        navigate("/user-dashboard");
      }, 3000);
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        "Issue Reporting Failed"
      );
    }
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });

      setMascotMessage(
        "📸 Nice! Your image has been selected."
      );
    }
  };

  // ================= SUCCESS PAGE =================
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-md text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complaint Submitted!
          </h2>

          <p className="text-gray-600 mb-6">
            Authorities will review your complaint shortly.
          </p>

          <div className="bg-orange-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">
              Complaint ID
            </p>

            <h3 className="text-2xl font-bold text-[#FF9933]">
              {complaintId}
            </h3>
          </div>

          <p className="text-sm text-gray-500">
            Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] py-12 px-4">

      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* ================= FORM ================= */}
        <div className="lg:col-span-2">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#FF9933] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Report an Issue
              </h1>

              <p className="text-gray-600">
                Help improve your city by reporting civic issues.
              </p>
            </div>

            {/* TITLE */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Issue Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onFocus={() => updateMascot("title")}
                onChange={handleChange}
                required
                placeholder="Enter issue title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9933] outline-none"
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">
                Category
              </label>

              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onMouseEnter={() =>
                      updateMascot("category")
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: category.id,
                      })
                    }
                    className={`border-2 rounded-2xl p-4 transition-all ${formData.category === category.id
                        ? "border-[#FF9933] bg-orange-50"
                        : "border-gray-200"
                      }`}
                  >
                    <div
                      className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>

                    <p className="font-medium text-sm">
                      {category.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onFocus={() =>
                  updateMascot("description")
                }
                onChange={handleChange}
                rows={5}
                required
                placeholder="Describe the issue..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9933] outline-none resize-none"
              />
            </div>

            {/* LOCATION */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Location
              </label>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onFocus={() =>
                      updateMascot("location")
                    }
                    onChange={handleChange}
                    required
                    placeholder="Enter location"
                    className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-[#FF9933] outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={detectLocation}
                  className="bg-[#138808] text-white px-5 rounded-xl font-semibold"
                >
                  {detectingLocation
                    ? "Detecting..."
                    : "Detect"}
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="mb-8">
              <label className="block font-semibold mb-2">
                Upload Image
              </label>

              <div
                onMouseEnter={() =>
                  updateMascot("image")
                }
                className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="upload"
                  className="cursor-pointer"
                >
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />

                  {formData.image ? (
                    <p className="font-semibold text-green-600">
                      {formData.image.name}
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      Click to upload image
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              onMouseEnter={() =>
                updateMascot("submit")
              }
              className="w-full bg-[#FF9933] hover:bg-[#e88a2e] text-white py-4 rounded-xl  cursor-pointer font-bold text-lg transition-all"
            >
              Submit Issue
            </button>
          </motion.form>
        </div>

        {/* ================= MASCOT PANEL ================= */}
        <div className="sticky top-40 h-fit ">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6"
          >
            {/* Mascot */}
            <div className="flex justify-center mb-5 mt-5">
              <motion.img
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                src={BotImage}
                alt="Mascot"
                className="w-40 h-40 object-contain"
              />
            </div>

            {/* Chat Bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mascotMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-orange-50 border border-orange-200 rounded-2xl p-4"
              >
                <div className="flex gap-3">
                  <MessageCircleMore className="w-5 h-5 text-[#FF9933] mt-1" />

                  <p className="text-gray-700 leading-relaxed">
                    {mascotMessage}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tips */}
            <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">
                Quick Tips
              </h3>

              <ul className="text-sm text-blue-800 space-y-2 list-disc ml-4">
                <li>Add clear issue details</li>
                <li>Upload a proper image</li>
                <li>Use accurate location</li>
                <li>Select correct category</li>
              </ul>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}