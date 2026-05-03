import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

// ==================== CONTACT PAGE ====================
// Displays contact information and a frontend-only inquiry form.
// ======================================================

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ---------- CONTACT FORM SUBMISSION ----------
  // Handles the temporary frontend response until an API endpoint is added.
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------- CONTACT INFO DATA ----------
  // Defines the cards shown beside the contact form.
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@hamariawaaz.in",
      subdetails: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "1800-123-4567 (Toll Free)",
      subdetails: "Mon-Sat, 9:00 AM - 6:00 PM",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Civic Center, New Delhi",
      subdetails: "Delhi 110001, India",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday - Saturday",
      subdetails: "9:00 AM - 6:00 PM IST",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ---------- PAGE INTRO ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is here to help!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ---------- CONTACT METHODS ---------- */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] to-[#e88a2e] rounded-lg flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-700 font-medium mb-1">{info.details}</p>
                  <p className="text-sm text-gray-600">{info.subdetails}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------- MESSAGE FORM ---------- */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF9933] to-[#e88a2e] text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* ---------- MAP PLACEHOLDER ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Map would be displayed here</p>
              <p className="text-sm text-gray-500">123 Civic Center, New Delhi, India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
