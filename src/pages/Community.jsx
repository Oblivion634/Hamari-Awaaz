import { useState } from "react";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  MessageCircle,
  MapPin,
  Calendar,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react";

// ==================== COMMUNITY PAGE ====================
// Displays a public-style complaint feed with local filtering controls.
// ========================================================

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Road", "Water", "Electricity", "Sanitation", "Traffic"];
  const statuses = ["All", "Pending", "In Progress", "Resolved"];

  // ---------- COMMUNITY FEED DATA ----------
  // Static complaint records used to render the feed cards.
  const complaints = [
    {
      id: "CMP-1456",
      title: "Broken water pipeline causing flooding",
      description:
        "A major water pipeline has burst on the main road, causing severe flooding and traffic disruption.",
      category: "Water",
      status: "Pending",
      location: "Connaught Place, Delhi",
      date: "April 10, 2026",
      author: "Priya Sharma",
      upvotes: 45,
      comments: 12,
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&h=400&fit=crop",
    },
    {
      id: "CMP-1455",
      title: "Street lights not working for 2 weeks",
      description:
        "Multiple street lights in the area have been non-functional, creating safety concerns during night time.",
      category: "Electricity",
      status: "In Progress",
      location: "Koramangala, Bangalore",
      date: "April 9, 2026",
      author: "Amit Patel",
      upvotes: 32,
      comments: 8,
      image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&h=400&fit=crop",
    },
    {
      id: "CMP-1454",
      title: "Large pothole on highway causing accidents",
      description:
        "A dangerous pothole on the highway has caused multiple vehicle damages and minor accidents.",
      category: "Road",
      status: "In Progress",
      location: "Andheri West, Mumbai",
      date: "April 8, 2026",
      author: "Rajesh Kumar",
      upvotes: 67,
      comments: 23,
      image: "https://images.unsplash.com/photo-1625979427846-08edf2f4a0e6?w=600&h=400&fit=crop",
    },
    {
      id: "CMP-1453",
      title: "Garbage overflow in residential area",
      description:
        "Garbage bins overflowing for days, creating unhygienic conditions and attracting pests.",
      category: "Sanitation",
      status: "Resolved",
      location: "T Nagar, Chennai",
      date: "April 7, 2026",
      author: "Sneha Reddy",
      upvotes: 28,
      comments: 6,
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&h=400&fit=crop",
    },
    {
      id: "CMP-1452",
      title: "Illegal parking blocking main road",
      description:
        "Vehicles are regularly parked illegally, blocking the main road and causing severe traffic congestion.",
      category: "Traffic",
      status: "Pending",
      location: "Salt Lake, Kolkata",
      date: "April 6, 2026",
      author: "Vikram Singh",
      upvotes: 41,
      comments: 15,
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&h=400&fit=crop",
    },
    {
      id: "CMP-1451",
      title: "Park maintenance required urgently",
      description:
        "The community park has broken swings, damaged benches, and overgrown weeds affecting children's safety.",
      category: "Other",
      status: "Resolved",
      location: "Jubilee Hills, Hyderabad",
      date: "April 5, 2026",
      author: "Kavita Nair",
      upvotes: 19,
      comments: 4,
      image: "https://images.unsplash.com/photo-1585321050855-832d52a9c1f6?w=600&h=400&fit=crop",
    },
  ];

  // ---------- STATUS BADGE STYLE ----------
  // Resolves the visual treatment for complaint status values.
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-orange-100 text-orange-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ---------- CATEGORY BADGE STYLE ----------
  // Resolves the visual treatment for complaint category labels.
  const getCategoryColor = (category) => {
    switch (category) {
      case "Road":
        return "bg-orange-500";
      case "Water":
        return "bg-blue-500";
      case "Electricity":
        return "bg-yellow-500";
      case "Sanitation":
        return "bg-green-500";
      case "Traffic":
        return "bg-red-500";
      default:
        return "bg-purple-500";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ---------- COMMUNITY HEADER ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-[#138808] to-[#0f6b06] rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Community Feed</h1>
          <p className="text-xl text-gray-600">
            See what issues are being reported in your area and support them
          </p>
        </motion.div>

        {/* ---------- FEED FILTERS ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          {/* ---------- SEARCH CONTROL ---------- */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              />
            </div>
          </div>

          {/* ---------- CATEGORY FILTER ---------- */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.toLowerCase()
                    ? "bg-[#138808] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ---------- STATUS FILTER ---------- */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status.toLowerCase())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedStatus === status.toLowerCase()
                    ? "bg-[#1E88E5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------- COMPLAINT FEED CARDS ---------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              {/* ---------- CARD MEDIA ---------- */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={complaint.image}
                  alt={complaint.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 ${getCategoryColor(
                      complaint.category
                    )} text-white rounded-full text-xs font-semibold`}
                  >
                    {complaint.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>
              </div>

              {/* ---------- CARD CONTENT ---------- */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {complaint.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {complaint.description}
                </p>

                {/* ---------- COMPLAINT METADATA ---------- */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{complaint.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{complaint.date}</span>
                  </div>
                </div>

                {/* ---------- REPORTER ATTRIBUTION ---------- */}
                <div className="border-t pt-4 mb-4">
                  <p className="text-sm text-gray-600">
                    Reported by <span className="font-semibold">{complaint.author}</span>
                  </p>
                </div>

                {/* ---------- INTERACTION ACTIONS ---------- */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-semibold">{complaint.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-semibold">{complaint.comments}</span>
                  </button>
                  <button className="px-4 py-2 bg-[#FF9933] text-white rounded-lg hover:bg-[#e88a2e] transition-colors font-semibold text-sm">
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---------- PAGINATION PLACEHOLDER ---------- */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
            Load More Complaints
          </button>
        </div>
      </div>
    </div>
  );
}
