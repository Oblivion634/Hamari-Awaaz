import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  UserCog,
  BarChart3,
  Users,
  Filter,
  Search,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==================== ADMIN DASHBOARD ====================
// Provides administrative complaint management UI and placeholder panels.
// =========================================================

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("all-complaints");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ---------- SIDEBAR CONFIG ----------
  // Defines admin management tabs and icons.
  const menuItems = [
    { id: "all-complaints", label: "All Complaints", icon: FileText },
    { id: "assign", label: "Assign Issues", icon: UserCog },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
  ];

  // ---------- SUMMARY DATA ----------
  // Static metrics used until live admin analytics are connected.
  const stats = [
    { label: "Total Complaints", value: "1,456", change: "+12%", color: "bg-blue-500" },
    { label: "Pending", value: "234", change: "-5%", color: "bg-yellow-500" },
    { label: "In Progress", value: "156", change: "+8%", color: "bg-orange-500" },
    { label: "Resolved", value: "1,066", change: "+15%", color: "bg-green-500" },
  ];

  // ---------- COMPLAINT TABLE DATA ----------
  // Static rows used by the admin table before backend integration.
  const complaints = [
    {
      id: "CMP-1456",
      title: "Broken water pipeline",
      citizen: "Priya Sharma",
      location: "Connaught Place, Delhi",
      category: "Water",
      status: "Pending",
      priority: "High",
      date: "April 10, 2026",
      department: "",
    },
    {
      id: "CMP-1455",
      title: "Street light not working",
      citizen: "Amit Patel",
      location: "Koramangala, Bangalore",
      category: "Electricity",
      status: "In Progress",
      priority: "Medium",
      date: "April 10, 2026",
      department: "Electricity Board",
    },
    {
      id: "CMP-1454",
      title: "Pothole on highway",
      citizen: "Rajesh Kumar",
      location: "Andheri West, Mumbai",
      category: "Road",
      status: "Pending",
      priority: "High",
      date: "April 9, 2026",
      department: "",
    },
    {
      id: "CMP-1453",
      title: "Garbage overflow",
      citizen: "Sneha Reddy",
      location: "T Nagar, Chennai",
      category: "Sanitation",
      status: "Resolved",
      priority: "Low",
      date: "April 9, 2026",
      department: "Municipal Corporation",
    },
    {
      id: "CMP-1452",
      title: "Illegal parking issue",
      citizen: "Vikram Singh",
      location: "Salt Lake, Kolkata",
      category: "Traffic",
      status: "In Progress",
      priority: "Medium",
      date: "April 8, 2026",
      department: "Traffic Police",
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

  // ---------- PRIORITY BADGE STYLE ----------
  // Resolves the visual treatment for complaint priority values.
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ---------- MOBILE SIDEBAR OVERLAY ---------- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---------- ADMIN SIDEBAR ---------- */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static`}
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF9933] rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Admin Panel</h2>
                    <p className="text-xs text-gray-400">Hamari Awaaz</p>
                  </div>
                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                        ? "bg-[#FF9933] text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ---------- ADMIN CONTENT ---------- */}
      <div className="flex-1">

        {/* ---------- ADMIN TOP BAR ---------- */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>

              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-900">Admin User</p>
                <p className="text-sm text-gray-600">System Administrator</p>
              </div>

              <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] to-[#138808] rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- ADMIN PANEL BODY ---------- */}
        <div className="p-6">
          {/* ---------- SUMMARY METRICS ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ---------- COMPLAINT TABLE TAB ---------- */}
          {activeTab === "all-complaints" && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* ---------- TABLE FILTERS ---------- */}
              <div className="p-6 border-b bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search complaints..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterStatus("all")}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === "all"
                        ? "bg-[#FF9933] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus("pending")}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === "pending"
                        ? "bg-[#FF9933] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setFilterStatus("in-progress")}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === "in-progress"
                        ? "bg-[#FF9933] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      In Progress
                    </button>
                  </div>
                </div>
              </div>

              {/* ---------- TABLE CONTENT ---------- */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Citizen</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {complaints.map((complaint) => (
                      <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{complaint.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{complaint.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{complaint.citizen}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{complaint.location}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {complaint.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-[#1E88E5] text-white rounded-lg text-sm hover:bg-[#1565C0] transition-colors">
                              View
                            </button>
                            <button className="px-3 py-1 bg-[#FF9933] text-white rounded-lg text-sm hover:bg-[#e88a2e] transition-colors">
                              Assign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {["assign", "analytics", "users"].includes(activeTab) && (
            // ---------- PLACEHOLDER ADMIN PANEL ----------
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">This section is under development</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
