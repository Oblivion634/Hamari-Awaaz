import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  MapPin,
  CheckCircle,
  AlertCircle,
  Droplet,
  Zap,
  Construction,
  Trash2,
  Camera,
} from "lucide-react";
import api from "../api/axios.js";
import { ENDPOINTS, BASE_URL } from "../utils/constants.js";

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
  const [detectingLocation, setDetectingLocation] = useState(false)

  const categories = [
    { id: "Road and Infrastructure", name: "Road and Infrastructure", icon: Construction, color: "bg-orange-500" },
    { id: "Water Supply", name: "Water Supply", icon: Droplet, color: "bg-blue-500" },
    { id: "Electricity", name: "Electricity", icon: Zap, color: "bg-yellow-500" },
    { id: "Sanitation and Waste", name: "Sanitation & Waste", icon: Trash2, color: "bg-green-500" },
  ];

  const detectLocation = () => {
    // Browser geolocation is used only when the user grants permission.
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Reverse geocoding converts coordinates into a readable address.
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );

          const data = await res.json();

          const address = data.display_name;

          setFormData((prev) => ({
            ...prev,
            location: address
          }));
        } catch (error) {
          console.log(error);
          alert("Unable to fetch address. Please enter location manually.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        console.log(error);
        alert("Please allow location permission or enter location manually.");
        setDetectingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // FormData is required because the issue may include an image file.
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await api.post(ENDPOINTS.CREATEISSUE, data);

      // Save the generated complaint ID for the success screen.
      setComplaintId(res.data.data.complaintId);
      setSubmitted(true);
      alert("Issue Reported Successfully");
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 3000);

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Issue Reporting Failed");
    }
  };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    // Store the selected file so it can be added to FormData on submit.
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Issue Reported Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your complaint has been submitted and will be reviewed shortly.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Complaint ID:</p>
            <p className="text-2xl font-bold text-[#FF9933]">{complaintId}</p>
          </div>
          <p className="text-sm text-gray-500">
            Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF9933] to-[#e88a2e] rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Report an Issue</h1>
            <p className="text-xl text-gray-600">
              Help us improve your community by reporting civic issues
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Issue Title */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief description of the issue"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Issue Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, category: category.id })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${formData.category === category.id
                      ? "border-[#FF9933] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                  >
                    <div
                      className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 text-center">
                      {category.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about the issue..."
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent resize-none"
              />
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter address or detect current location"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={detectingLocation}
                  className="px-5 py-3 bg-[#138808] text-white rounded-lg font-semibold hover:bg-[#0f6b06] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {detectingLocation ? "Detecting..." : "Detect"}
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Location will be auto-filled after permission. You can edit it manually.
              </p>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF9933] transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {formData.image ? (
                    <div className="space-y-2">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <p className="text-gray-900 font-medium">{formData.image.name}</p>
                      <p className="text-sm text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Click to upload an image</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#FF9933] text-white py-4  cursor-pointer rounded-lg font-semibold hover:bg-[#e88a2e] transition-all shadow-lg hover:shadow-xl"
              >
                Submit Issue
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Important Information</p>
                <p>
                  Your complaint will be reviewed within 24 hours and forwarded to the
                  relevant authority. You'll receive updates via email and SMS.
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
