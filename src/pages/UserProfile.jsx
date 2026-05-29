import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { getCurrentUser } from "../services/authService";
import { useOutletContext } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit2,
    Save,
    X,
    Camera,
    Shield,
    Bell,
    Lock,
    Trash2,
    Award,
    FileText,
    CheckCircle,
    Clock,
} from "lucide-react";
import api from "../api/axios";
import { ENDPOINTS } from "../utils/constants";

// ==================== USER PROFILE PAGE ====================
// Manages profile details, user stats, account settings, and deletion.
// ===========================================================

export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const { user, setUser } = useOutletContext();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [statss, setStatss] = useState({});


    const navigate = useNavigate();

    // ---------- PROFILE STATS ----------
    // Loads complaint summary data for the profile overview cards.
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get(ENDPOINTS.GETSTATS);
                setStatss(res.data.stats);
            } catch (error) {
                console.log(error?.response?.data || error.message)
            }
        }
        fetchStats();
    }, [])

    // ---------- USER PROFILE DATA ----------
    // Loads the latest account details for the current session.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUserData(data.user);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    const [tempData, setTempData] = useState({});

    useEffect(() => {
        setTempData(userData);
    }, [userData]);
    // ---------- EDIT MODE ----------
    // Stages profile edits locally so cancel can restore the saved data.
    const handleEdit = () => {
        setTempData(userData);
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const res = await api.put(
                `${ENDPOINTS.UPDATEUSER}/${userData._id}`,
                tempData
            );

            setUserData(res.data.user);
            setUser(res.data.user);
            setTempData(res.data.user);
            setIsEditing(false);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleCancel = () => {
        setTempData(userData);
        setIsEditing(false);
    };

    // ---------- ACCOUNT DELETE ----------
    // Removes the account through the backend and clears frontend auth state.
    const handleDelete = async () => {
        try {
            const res = await api.delete(`${ENDPOINTS.DELETEUSER}/${userData._id}`);

            alert(res.data.message);

            setUser(null);

            navigate("/");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleAvatarChange = async (e) => {

        const file = e.target.files[0]
        if (!file) return;

        const formData = new FormData();

        formData.append("avatar", file);
        const res = await api.put("/auth/update-avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        setUser(res.data.user)
    }

    // ---------- STAT CARD DATA ----------
    // Converts backend stats into profile summary cards.
    const stats = [
        {
            label: "Total Reports",
            value: statss.totalcomplaints,
            icon: FileText,
            color: "bg-blue-500",
        },
        {
            label: "Resolved",
            value: statss.resolved,
            icon: CheckCircle,
            color: "bg-green-500",
        },
        {
            label: "Under Review",
            value: statss.underReview,
            icon: Clock,
            color: "bg-orange-500",
        },
        {
            label: "Pending",
            value: statss.pending,
            icon: Clock,
            color: "bg-orange-500",
        },

    ];

    // ---------- BADGE DATA ----------
    // Static achievements shown until gamification data is persisted.
    const badges = [
        { name: "Active Reporter", icon: "🏆", earned: true },
        { name: "Community Helper", icon: "🤝", earned: true },
        { name: "Early Adopter", icon: "🌟", earned: true },
        { name: "Civic Champion", icon: "🎖️", earned: false },
    ];

    // ---------- NOTIFICATION DEFAULTS ----------
    // Local preference values used by the notification settings UI.
    const notifications = [
        { id: 1, title: "Email notifications", enabled: true },
        { id: 2, title: "SMS notifications", enabled: true },
        { id: 3, title: "Status updates", enabled: true },
        { id: 4, title: "Community updates", enabled: false },
        { id: 5, title: "Weekly digest", enabled: true },
    ];

    const [notificationSettings, setNotificationSettings] =
        useState(notifications);

    const toggleNotification = (id) => {
        setNotificationSettings((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, enabled: !notif.enabled } : notif,
            ),
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* ---------- PROFILE SUMMARY ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-[#FF9933] to-[#e88a2e] rounded-2xl shadow-xl p-8 mb-6"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                                {user?.avatar?.imageURL ? <img src={user.avatar.imageURL} className="rounded-full w-full h-full object-cover" /> : <div className="font-bold text-6xl">{user.name[0]}</div>}
                            </div>
                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#1E88E5] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#1565C0] transition-colors cursor-pointer">

                                <Camera className="w-5 h-5" />

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />

                            </label>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <div className="flex gap-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {userData?.name}
                                </h1>
                                <div className="text-xl font-bold flex justify-center items-center text-white"><Award />Contribution Score: 245</div>
                            </div>
                            <p className="text-white/90 mb-1">{userData?.email}</p>
                            <p className="text-white/80 text-sm flex items-center justify-center md:justify-start gap-2">
                                <Calendar className="w-4 h-4" />
                                Member since {new Date(userData?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link to="/user-dashboard"><button className="px-6 py-3  cursor-pointer bg-white text-[#FF9933] rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2">Go to Dashboard</button></Link>
                            <div className="flex gap-3">
                                {!isEditing ? (

                                    <button
                                        onClick={handleEdit}
                                        className="px-6 py-3 bg-white text-[#FF9933] rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            <Save className="w-5 h-5" />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            <X className="w-5 h-5" />
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ---------- USER METRICS ---------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                                >
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ---------- PROFILE TABS ---------- */}
                <div className="bg-white rounded-xl shadow-lg mb-6">
                    <div className="border-b border-gray-200">
                        <div className="flex flex-wrap gap-2 p-4">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === "profile"
                                    ? "bg-[#FF9933] text-white shadow-lg"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <User className="w-5 h-5 inline-block mr-2" />
                                Profile Info
                            </button>
                            <button
                                onClick={() => setActiveTab("badges")}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === "badges"
                                    ? "bg-[#FF9933] text-white shadow-lg"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <Award className="w-5 h-5 inline-block mr-2" />
                                Badges
                            </button>
                            <button
                                onClick={() => setActiveTab("notifications")}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === "notifications"
                                    ? "bg-[#FF9933] text-white shadow-lg"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <Bell className="w-5 h-5 inline-block mr-2" />
                                Notifications
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === "security"
                                    ? "bg-[#FF9933] text-white shadow-lg"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <Lock className="w-5 h-5 inline-block mr-2" />
                                Security
                            </button>
                        </div>
                    </div>

                    {/* ---------- TAB CONTENT ---------- */}
                    <div className="p-8">
                        {/* ---------- PROFILE INFO TAB ---------- */}
                        {activeTab === "profile" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Personal Information
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={isEditing ? tempData?.name : userData?.name}
                                                onChange={(e) =>
                                                    setTempData({ ...tempData, name: e.target.value })
                                                }
                                                disabled={!isEditing}
                                                required
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={isEditing ? tempData?.email : userData?.email}
                                                onChange={(e) =>
                                                    setTempData({ ...tempData, email: e.target.value })
                                                }
                                                required
                                                disabled={!isEditing}
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                required
                                                value={isEditing ? tempData?.phone : userData?.phone}
                                                onChange={(e) =>
                                                    setTempData({ ...tempData, phone: e.target.value })
                                                }
                                                disabled={!isEditing}
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <textarea
                                                value={
                                                    isEditing
                                                        ? tempData.location?.city
                                                        : userData?.location?.city
                                                }
                                                required
                                                onChange={(e) =>
                                                    setTempData({
                                                        ...tempData,
                                                        location: {
                                                            ...tempData.location,
                                                            city: e.target.value,
                                                        },
                                                    })
                                                }
                                                disabled={!isEditing}
                                                rows={3}
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            State
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <textarea
                                                value={
                                                    isEditing
                                                        ? tempData.location?.state
                                                        : userData?.location?.state
                                                }
                                                onChange={(e) =>
                                                    setTempData({
                                                        ...tempData,
                                                        location: {
                                                            ...tempData.location,
                                                            state: e.target.value,
                                                        },
                                                    })
                                                }
                                                required
                                                disabled={!isEditing}
                                                rows={3}
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Pincode
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={
                                                    isEditing
                                                        ? tempData.location?.pincode || ""
                                                        : userData?.location?.pincode || ""
                                                }
                                                required
                                                onChange={(e) =>
                                                    setTempData({
                                                        ...tempData,
                                                        location: {
                                                            ...tempData.location,
                                                            pincode: e.target.value,
                                                        },
                                                    })
                                                }
                                                disabled={!isEditing}
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-blue-900 mb-1">
                                                Identity Verification
                                            </h3>
                                            <p className="text-sm text-blue-800">
                                                Aadhaar Linked: ****{userData.aadhaarLast4}
                                            </p>
                                            <p className="text-xs text-blue-700 mt-2">
                                                Your identity is verified for enhanced security and
                                                faster complaint resolution.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------- BADGES TAB ---------- */}
                        {activeTab === "badges" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Your Achievements
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Earn badges by actively participating and helping your
                                    community
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {badges.map((badge, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`p-6 rounded-xl border-2 ${badge.earned
                                                ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300"
                                                : "bg-gray-50 border-gray-200"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`text-5xl ${badge.earned ? "scale-110" : "grayscale opacity-50"
                                                        }`}
                                                >
                                                    {badge.icon}
                                                </div>
                                                <div>
                                                    <h3
                                                        className={`font-bold text-lg ${badge.earned ? "text-gray-900" : "text-gray-500"
                                                            }`}
                                                    >
                                                        {badge.name}
                                                    </h3>
                                                    {badge.earned ? (
                                                        <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                                                            <CheckCircle className="w-4 h-4" />
                                                            Earned
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm text-gray-500">
                                                            Not earned yet
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ---------- NOTIFICATIONS TAB ---------- */}
                        {activeTab === "notifications" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Notification Preferences
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Manage how you receive updates about your complaints
                                </p>

                                <div className="space-y-4">
                                    {notificationSettings.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-5 h-5 text-gray-600" />
                                                <span className="font-medium text-gray-900">
                                                    {notif.title}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => toggleNotification(notif.id)}
                                                className={`relative w-14 h-7 rounded-full transition-colors ${notif.enabled ? "bg-green-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${notif.enabled ? "translate-x-7" : "translate-x-0"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        💡 <strong>Tip:</strong> Keep status updates enabled to get
                                        real-time notifications about your complaint progress.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------- SECURITY TAB ---------- */}
                        {activeTab === "security" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Security Settings
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Keep your account safe and secure
                                </p>

                                <div className="space-y-4">
                                    <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#FF9933] transition-all text-left group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Lock className="w-5 h-5 text-gray-600 group-hover:text-[#FF9933]" />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Change Password
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Update your password regularly
                                                    </p>
                                                </div>
                                            </div>
                                            <Edit2 className="w-5 h-5 text-gray-400 group-hover:text-[#FF9933]" />
                                        </div>
                                    </button>

                                    <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#FF9933] transition-all text-left group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-gray-600 group-hover:text-[#FF9933]" />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Two-Factor Authentication
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Add an extra layer of security
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                                                Not enabled
                                            </span>
                                        </div>
                                    </button>

                                    <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#FF9933] transition-all text-left group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-gray-600 group-hover:text-[#FF9933]" />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Linked Phone Number
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {userData?.phone}
                                                    </p>
                                                </div>
                                            </div>
                                            <Edit2 className="w-5 h-5 text-gray-400 group-hover:text-[#FF9933]" />
                                        </div>
                                    </button>

                                    <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#FF9933] transition-all text-left group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-gray-600 group-hover:text-[#FF9933]" />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Email Address
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {userData?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                Verified
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                                        <Trash2 className="w-5 h-5" />
                                        Danger Zone
                                    </h3>
                                    <p className="text-sm text-red-800 mb-3">
                                        Deleting your account will permanently remove all your data
                                        and complaint history.
                                    </p>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm" onClick={handleDelete}>
                                        Delete Account
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
