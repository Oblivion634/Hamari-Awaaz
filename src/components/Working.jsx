import { useState, useEffect, Fragment } from "react";
import {
  FileText,
  ArrowRight,
  FileSearch,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Steps data
  const working = [
    {
      icon: FileText,
      title: "Submit Issue",
      description: "Report your civic problem with details and photos",
    },
    {
      icon: FileSearch,
      title: "Admin Reviews",
      description: "Our team verifies and categorizes your complaint",
    },
    {
      icon: UserCheck,
      title: "Assigned to Authority",
      description: "Forwarded to the relevant department for action",
    },
    {
      icon: CheckCircle,
      title: "Issue Resolved",
      description: "Problem solved and marked as complete",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center items-center px-6 md:px-20 py-22 overflow-hidden bg-gradient-to-br from-[#F0F9FF] to-white"
    >
      {/* Heading */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center flex flex-col items-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold">How It Works</h1>
        <p className="w-full mt-6 text-base md:text-xl text-gray-600">
          From reporting to resolution in four simple steps
        </p>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-col md:flex-row gap-6 mt-20 w-full items-stretch">
        {working.map((steps, index) => {
          const Icon = steps.icon;

          return (
            <Fragment key={index}>
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.5, duration: 0.5 }}
                viewport={{ once: true, margin: isMobile ? "-50px" : "0px" }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="flex-1 min-h-[260px] p-8 shadow-lg hover:shadow-2xl rounded-xl flex flex-col gap-3 bg-white text-center items-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#478aef] to-[#423fe2] rounded-4xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h4 className="font-semibold text-xl md:text-2xl">
                  {steps.title}
                </h4>

                <p className="text-gray-600 text-sm md:text-base">
                  {steps.description}
                </p>
              </motion.div>

              {/* Arrow */}
              {index !== working.length - 1 && (
                <>
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="text-gray-400 w-8 h-8" />
                  </div>

                  <div className="flex md:hidden items-center justify-center">
                    <ArrowRight className="rotate-90 text-gray-400 w-8 h-8" />
                  </div>
                </>
              )}
            </Fragment>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Features;