import { FileText, Eye, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
    // Feature list
    const features = [
        {
            icon: FileText,
            title: "Easy Issue Reporting",
            description:
                "Report civic issues in just a few clicks with photos and location details.",
        },
        {
            icon: Eye,
            title: "Real-time Tracking",
            description:
                "Track your complaint status from submission to resolution in real-time.",
        },
        {
            icon: Users,
            title: "Community Transparency",
            description:
                "See what issues your neighbors are facing and support their causes.",
        },
        {
            icon: Shield,
            title: "Government Accountability",
            description:
                "Hold authorities accountable with public tracking and transparency.",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center px-6 md:px-20 py-20 overflow-hidden sticky top-0 z-20 bg-white"
        >
            {/* Section heading */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center flex items-center justify-center flex-col"
            >
                <h1 className="text-3xl md:text-5xl font-bold">
                    Why Choose Hamari Awaaz?
                </h1>

                <p className="w-full md:w-[75%] mt-6 text-base md:text-xl text-gray-600">
                    A citizen-centric platform designed to make reporting and resolving
                    civic issue simple, transparent, and effective.
                </p>
            </motion.div>

            {/* Feature cards */}
            <div className="flex flex-col md:flex-row gap-6 mt-16">
                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.03 }}
                            className="p-8 shadow-lg hover:shadow-2xl rounded-xl flex flex-col gap-3 bg-white transition-all"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-[#FF9933] to-[#e88a2e] rounded-lg flex items-center justify-center mb-4">
                                <Icon className="w-7 h-7 text-white" />
                            </div>

                            <h4 className="font-semibold text-xl md:text-2xl">
                                {feature.title}
                            </h4>

                            <p className="text-gray-600 text-sm md:text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default Features;