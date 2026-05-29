import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router";
import { getCurrentUser } from "../services/authService.js";
import {
  LayoutDashboard,
  FileText,
  List,
  TrendingUp,
  Users,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { ENDPOINTS } from "../utils/constants.js";
import api from "../api/axios.js";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0,
  });

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Load user, issues, and stats together for the dashboard overview.
    const fetchDashboardData = async () => {
      try {
        const [userRes, issueRes, statsRes] = await Promise.all([
          getCurrentUser(),
          api.get(ENDPOINTS.GETISSUES),
          api.get(ENDPOINTS.GETSTATS),
        ]);

        setUser(userRes.user);
        setStats(statsRes.data.stats);
        setIssues(issueRes.data.issues);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchDashboardData();
  }, []);

  // Sidebar tabs map each dashboard section to an icon and label.
  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "report", label: "Report Issue", icon: FileText },
    { id: "track", label: "Track Progress", icon: TrendingUp },
    { id: "community", label: "Community", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ];

  // Converts backend stats into cards displayed on the overview page.
  const statss = [
    {
      label: "Total Complaints",
      value: stats.totalcomplaints,
      icon: FileText,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    {
      label: "In Progress",
      value: stats.underReview,
      icon: AlertCircle,
      color: "bg-orange-500",
      textColor: "text-orange-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-xl text-gray-900">
                User Dashboard
              </h2>
              <p className="text-sm text-gray-600">
                Welcome back {user?.name}!
              </p>
            </div>

            {/* Close Button (Mobile Only) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
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
                  className={`w-full flex items-center gap-3 px-4  cursor-pointer py-3 rounded-lg transition-all ${activeTab === item.id
                    ? "bg-[#FF9933] text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Menu Button (Mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </h1>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">
                  {user?.location?.city} {user?.location?.state}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] to-[#138808] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statss.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg border"
                >
                  <div className="flex justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className="text-white w-6 h-6" />
                    </div>
                    <span className={`text-3xl font-bold ${stat.textColor}`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Complaints */}
            <div className="bg-white p-6 rounded-xl shadow-lg ">
              <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>

              {issues.length === 0 ? <>No Issues Reported</> : (
                issues.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-center gap-4 p-4 border rounded-lg mb-5"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-xl mb-3">{c.complaintId}</p>
                      <p className="text-xl mb-2">{c.title}</p>
                      <p className="text-s mb-2 text-gray-500">
                        {c.category} • {new Date(c.createdAt).toLocaleString()}
                      </p>
                      <p>{c.description}</p>
                    </div>

                    {/* IMAGE LINK */}
                    <div>
                      <a href={c?.image?.imageURL} className="text-blue-500 underline" target="_blank">View Uploaded Image</a>
                    </div>

                    {/* STATUS */}
                    <div className=" h-[100px] w-[120px]">
                      {c.status === "pending" && (
                        <div
                          className={
                            "text-xs rounded h-full bg-yellow-100 flex justify-center items-center text-yellow-700"
                          }
                        >
                          {c.status}
                        </div>
                      )}
                      {c.status === "resolved" && (
                        <div
                          className={
                            "px-3 py-1 h-full text-xs rounded bg-green-100 flex justify-center items-center text-green-700"
                          }
                        >
                          {c.status}
                        </div>
                      )}
                      {c.status === "under review" && (
                        <div
                          className={
                            "px-3 py-1 text-xs h-full rounded bg-orange-100 flex justify-center items-center text-orange-700"
                          }
                        >
                          {c.status}
                        </div>
                      )}
                    </div>
                  </div>
                )))
              }
            </div>
          </div>
        )}

        {activeTab === "report" && (
          <Navigate to="/report-issue" />
        )}

        {activeTab === "track" && (
          <Navigate to="/track-progress" />
        )}

        {activeTab === "community" && (
          <Navigate to="/community" />
        )}

        {activeTab === "profile" && (
          <Navigate to="/user-profile" />
        )}


      </div>
    </div>
  );
}
