import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import NotFoundImage from "../assets/404image.png"

// ==================== NOT FOUND PAGE ====================
// Handles unmatched routes with recovery navigation.
// ========================================================

export default function NotFound() {
  return (
    < div className="min-h-[calc(95vh-4rem)] bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] flex flex-col items-center justify-center px-4">
      {/* ---------- ERROR ILLUSTRATION ---------- */}
      <img
        src={NotFoundImage}
        alt="Not Found"
        className=" mx-auto w-96 h-96"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e88a2e] transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          {/* ---------- HISTORY BACK ACTION ---------- */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
