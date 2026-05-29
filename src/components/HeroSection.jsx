import { FileSearch, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MascotImage from "../assets/girl mascot.png";

const HeroSection = () => {
  return (
    <div className="bg-[url('/src/assets/background.jpg')] bg-cover bg-center relative overflow-hidden flex items-center px-6 md:px-20 pt-16 top-0 z-10 sticky">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between h-full">

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-center lg:text-left lg:w-1/2 pb-12 lg:pb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase">
            Welcome to{" "}
            <span className="text-[#FF9933]">
              Digital Civic Engagement
            </span>{" "}
            Platform!
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
            Report civic issues, track progress, and stay informed — all in one
            transparent digital platform.
          </p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10"
          >
            <Link
              to="/report-issue"
              className="flex gap-3 justify-center items-center rounded-xl bg-[#FF9933] px-8 py-4 font-semibold hover:bg-[#d87d22] transition-colors"
            >
              Report An Issue <ArrowRight size={20} />
            </Link>

            <Link
              to="/track-progress"
              className="flex gap-3 justify-center items-center border-2 border-[#FF9933] px-8 py-4 rounded-xl text-[#FF9933] font-semibold hover:bg-[#FF9933] hover:text-white transition-all"
            >
              Track Complaint <FileSearch size={20} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Mascot image */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative lg:justify-end h-[350px] md:h-[500px] lg:h-[570px] flex justify-center overflow-hidden"
        >
          <motion.img
            src={MascotImage}
            alt="Mascot"
            className="absolute w-auto drop-shadow-2xl h-[120%] z-20"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;