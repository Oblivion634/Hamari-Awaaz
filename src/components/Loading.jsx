import { motion } from "framer-motion";
import {
  Megaphone,
  MapPin,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

const features = [
  { icon: Megaphone, text: "Report Issues" },
  { icon: MapPin, text: "Track Location" },
  { icon: ShieldCheck, text: "Admin Review" },
  { icon: Users, text: "Community Voice" },
  { icon: Clock, text: "Live Status" },
  { icon: CheckCircle, text: "Issue Resolved" },
];

const testimonials = [
  "Your voice can bring change.",
  "Report civic issues in just a few clicks.",
  "Together, we build cleaner cities.",
];

const Loading = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 blur-[1px]"
        style={{
          backgroundImage: "url('/assets/background.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Floating Testimonials */}
      <div className="absolute top-16 text-center px-4">
        {testimonials.map((item, index) => (
          <motion.p
            key={index}
            className="absolute left-1/2 -translate-x-1/2 text-white/70 text-lg md:text-2xl font-semibold whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 2,
            }}
          >
            {item}
          </motion.p>
        ))}
      </div>

      {/* Main Circular Area */}
      <div className="relative z-10 w-[340px] h-[340px] md:w-[520px] md:h-[520px] flex items-center justify-center">
        {/* Feature Bubbles */}
        {features.map((feature, index) => {
          const angle = (index / features.length) * 2 * Math.PI;
          const radius = window.innerWidth < 768 ? 135 : 220;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const Icon = feature.icon;

          return (
            <motion.div
              key={index}
              className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center text-white shadow-xl"
              style={{
                x,
                y,
              }}
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.92, 1.05, 0.92],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.4,
              }}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-orange-300 mb-2" />
              <p className="text-xs md:text-sm font-medium px-2">
                {feature.text}
              </p>
            </motion.div>
          );
        })}

        {/* Mascot */}
        <motion.div
          className="relative z-20 flex flex-col items-center"
          animate={{ y: [0, -18, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-36 h-36 md:w-52 md:h-52 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 flex items-center justify-center shadow-2xl">
            <img
              src="/assets/man mascot.png"
              alt="Hamari Awaaz Mascot"
              className="w-28 h-28 md:w-44 md:h-44 object-contain"
            />
          </div>

          <h1 className="mt-6 text-2xl md:text-4xl font-bold text-white">
            Hamari Awaaz
          </h1>

          <p className="text-orange-300 mt-2 text-sm md:text-base">
            Our Voice, Our Responsibility
          </p>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        className="absolute bottom-16 z-20 text-center"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-white text-lg md:text-xl font-semibold tracking-wide">
          Loading your civic platform...
        </p>

        <div className="mt-4 w-56 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-400 rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;