import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import banner from "../assets/banner-image.png";

// ==================== ABOUT PAGE ====================
// Presents the platform mission, impact, story, and call to action.
// ====================================================

export default function AboutPage() {
  // ---------- VALUE CARDS ----------
  // Defines the mission, vision, and values content.
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower every Indian citizen with a platform to voice civic issues and collaborate with authorities to build better, cleaner, and safer communities.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "A transparent and accountable civic system where every complaint is heard, tracked, and resolved efficiently for the betterment of society.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Transparency, accountability, citizen empowerment, and collaborative problem-solving are at the core of everything we do.",
    },
  ];

  // ---------- IMPACT STATS ----------
  // Static presentation metrics for the public impact section.
  const stats = [
    { icon: Users, value: "50,000+", label: "Active Citizens" },
    { icon: Award, value: "15,000+", label: "Issues Resolved" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9]">
      {/* ---------- INTRO SECTION ---------- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#FF9933]">Hamari Awaaz</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We are building a bridge between citizens and civic authorities to
              create a more responsive, transparent, and accountable system for
              addressing community issues across India.
            </p>
          </motion.div>
          <Link to="/report-issue">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={banner}
                alt="Indian community"
                className="w-full h-130 object-cover"
              />
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ---------- VALUES SECTION ---------- */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#e88a2e] rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- IMPACT SECTION ---------- */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#FF9933] to-[#e88a2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-white/90">
              Making a real difference in communities across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-xl"
              >
                <div className="w-16 h-16 bg-[#1E88E5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STORY SECTION ---------- */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                Hamari Awaaz was born from a simple observation: citizens often
                feel powerless when facing civic issues. Potholes go unfixed,
                streetlights remain dark, and garbage piles up—not because
                authorities don't care, but because communication gaps exist.
              </p>
              <p>
                We created this platform to bridge that gap. By providing a
                transparent, accountable system where every complaint is tracked
                from submission to resolution, we're empowering citizens and
                helping authorities respond more effectively.
              </p>
              <p>
                Today, Hamari Awaaz serves thousands of citizens across India,
                helping resolve civic issues faster and building stronger, more
                connected communities. This is just the beginning of our journey
                towards a better India.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- FINAL CALL TO ACTION ---------- */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#1E88E5] to-[#1565C0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Be Part of the Change
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of citizens who are making their voices heard and
              building better communities.
            </p>
            <Link
              to="/"
              className="bg-white text-[#1E88E5] px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-xl text-lg"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
