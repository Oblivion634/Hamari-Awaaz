import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
    // Testimonial data
    const testimonials = [
        {
            name: "Rajesh Kumar",
            city: "Mumbai",
            feedback:
                "The pothole near my house was fixed within a week after I reported it here. Great initiative!",
            avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            rating: 5,
        },
        {
            name: "Priya Sharma",
            city: "Delhi",
            feedback:
                "Finally, a platform where citizens' voices are heard. The street light issue in our area was resolved quickly.",
            avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            rating: 5,
        },
        {
            name: "Amit Patel",
            city: "Bangalore",
            feedback:
                "Transparent and efficient. I could track my complaint status every step of the way. Highly recommended!",
            avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
            rating: 5,
        },
    ];

    return (
        <section className="py-25 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Citizens Are Saying
                    </h2>
                    <p className="text-xl text-gray-600">
                        Real feedback from real people making a difference
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-[#FF9933] text-[#FF9933]"
                                    />
                                ))}
                            </div>

                            {/* Feedback */}
                            <p className="text-gray-700 mb-6 italic">
                                "{testimonial.feedback}"
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {testimonial.city}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;