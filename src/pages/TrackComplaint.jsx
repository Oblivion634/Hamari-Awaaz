import { motion } from "framer-motion";
import {
  Search,
  FileSearch,
  Calendar,
  User,
  UserCheck,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { ENDPOINTS } from "../utils/constants";
import api from "../api/axios";

// ==================== TRACK COMPLAINT PAGE ====================
// Looks up a complaint by public ID and displays its progress details.
// ==============================================================

const TrackComplaint = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [issue, setIssue] = useState({});
  const [cId, setCId] = useState("");

  // ---------- TRACKING LOOKUP ----------
  // Requests one complaint by public complaint ID.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.get(`${ENDPOINTS.GETISSUE}/${cId}`);
      setIssue(res.data.issue);
      setShowProgress(true);
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  };

  // ---------- TIMELINE DATA ----------
  // Static lifecycle stages shown after a complaint lookup succeeds.
  const timeline = [
    {
      status: "Submitted",
      description: "Complaint registered in the system",
      date: "April 5, 2026, 10:30 AM",
      completed: true,
      icon: FileSearch,
    },
    {
      status: "Verified",
      description: "Complaint verified and categorized by admin",
      date: "April 5, 2026, 2:15 PM",
      completed: true,
      icon: CheckCircle,
    },
    {
      status: "Under Review",
      description: "Assigned to Public Works Department for resolution",
      date: "April 6, 2026, 9:00 AM",
      completed: true,
      icon: UserCheck,
    },
    {
      status: "Resolved",
      description: "Issue fixed and marked as complete",
      date: "Expected: April 12, 2026",
      completed: false,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="m-auto flex flex-col justify-center items-center px-4 sm:px-6 md:px-48 py-9 md:py-10 bg-amber-50 gap-10">
      <section className="flex flex-col gap-3 justify-center items-center text-center">
        <div className="bg-gradient-to-br from-blue-500 to-blue-800 text-white rounded-4xl p-3">
          <Search className="w-8 h-8" />
        </div>

        <h1 className="font-bold text-3xl md:text-4xl">
          Track Your Complaint
        </h1>

        <p className="font-light text-lg md:text-2xl">
          Enter your complaint ID to see the current status and progress
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="p-6 w-full flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-2xl"
      >
        <div className="relative w-full md:w-[80%]">
          <label htmlFor="complaint-id" className="sr-only">
            Complaint ID
          </label>

          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            id="complaint-id"
            type="text"
            placeholder="Enter Complaint ID (e.g., CMP-1234)"
            required
            value={cId}
            onChange={(e) => setCId(e.target.value)}
            className="border rounded-xl pl-10 pr-3 py-4 w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto text-white bg-blue-500 px-5 py-4 font-semibold text-lg rounded-xl cursor-pointer"
        >
          Track Status
        </button>
      </form>

      {/* ---------- EMPTY TRACKING STATE ---------- */}
      {!showProgress && (
        <section className="px-6 md:px-12 py-10 bg-white shadow-lg rounded-xl flex flex-col justify-center items-center gap-2 w-full text-center">
          <FileSearch className="w-20 h-20 text-gray-400" />

          <h3 className="font-semibold text-xl md:text-2xl">
            Enter your complaint ID to track progress
          </h3>

          <p className="text-gray-500">
            You can find your complaint ID in the confirmation email or SMS you
            received after submitting your issue.
          </p>
        </section>
      )}

      {showProgress && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 w-full"
        >
          {/* ---------- COMPLAINT SUMMARY ---------- */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {issue.title}
                </h2>

                <p className="text-gray-600">{issue.description}</p>
              </div>

              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold whitespace-nowrap">
                {issue.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">
                    {issue.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted On</p>
                  <p className="font-semibold text-gray-900">
                    {issue.createdAt
                      ? new Date(issue.createdAt).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted By</p>
                  <p className="font-semibold text-gray-900">
                    {issue.createdBy?.name || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- PROGRESS INDICATOR ---------- */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">
                  Overall Progress
                </p>

                <p className="text-sm font-bold text-[#1E88E5]">60%</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] h-3 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* ---------- STATUS TIMELINE ---------- */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Status Timeline
            </h3>

            <div className="space-y-8">
              {timeline.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${step.completed ? "bg-green-500" : "bg-gray-300"
                        }`}
                    >
                      <step.icon className="w-7 h-7 text-white" />
                    </div>

                    {index < timeline.length - 1 && (
                      <div
                        className={`w-0.5 h-16 mx-auto mt-2 ${step.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                      />
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className={`text-xl font-bold ${step.completed ? "text-gray-900" : "text-gray-500"
                          }`}
                      >
                        {step.status}
                      </h4>

                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>

                    <p
                      className={`mb-2 ${step.completed ? "text-gray-700" : "text-gray-500"
                        }`}
                    >
                      {step.description}
                    </p>

                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {step.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ---------- RESOLUTION ESTIMATE ---------- */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex gap-3">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />

              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Estimated Resolution Time
                </p>

                <p className="text-blue-800">
                  Your issue is expected to be resolved by May 20, 2026. We'll
                  notify you via email and SMS once it's complete.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TrackComplaint;
