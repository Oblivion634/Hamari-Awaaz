import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  ThumbsUp,
  MessageCircle,
  MapPin,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  X,
  Send,
} from "lucide-react";

import api from "../api/axios";

export default function CommunityPage() {

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [selectedStatus, setSelectedStatus] =
    useState("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [visibleCount, setVisibleCount] =
    useState(6);

  // ================= MODALS =================

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [showCommentsModal, setShowCommentsModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  // ================= COMMENT INPUT =================

  const [commentText, setCommentText] =
    useState("");

  // ================= USER =================

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  // ================= FETCH =================

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const res = await api.get("/issue/all");

        setComplaints(res.data.issues);

      } catch (error) {

        console.log(
          error.response?.data || error.message
        );

      } finally {

        setLoading(false);

      }
    };

    fetchComplaints();

  }, []);

  // ================= FILTERS =================

  const categories = [
    "All",
    "Road and Infrastructure",
    "Water Supply",
    "Electricity",
    "Sanitation and Waste",
  ];

  const statuses = [
    "All",
    "Pending",
    "Under Review",
    "Resolved",
  ];

  // ================= FILTER LOGIC =================

  const filteredComplaints =
    complaints.filter((complaint) => {

      const matchesCategory =
        selectedCategory === "all" ||

        complaint.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" ||

        complaint.status.toLowerCase() ===
          selectedStatus.toLowerCase();

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||

        complaint.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesStatus &&
        matchesSearch
      );
    });

  const visibleComplaints =
    filteredComplaints.slice(
      0,
      visibleCount
    );

  // ================= COLORS =================

  const getStatusColor = (status) => {

    switch (status.toLowerCase()) {

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "under review":
        return "bg-orange-100 text-orange-700";

      case "resolved":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category) => {

    switch (category) {

      case "Road and Infrastructure":
        return "bg-orange-500";

      case "Water Supply":
        return "bg-blue-500";

      case "Electricity":
        return "bg-yellow-500";

      case "Sanitation and Waste":
        return "bg-green-500";

      default:
        return "bg-purple-500";
    }
  };

  // ================= LOAD MORE =================

  const handleLoadMore = () => {

    setVisibleCount((prev) => prev + 6);

  };

  // ================= MODALS =================

  const openCommentsModal = (complaint) => {

    setSelectedComplaint(complaint);

    setShowCommentsModal(true);

  };

  const openViewModal = (complaint) => {

    setSelectedComplaint(complaint);

    setShowViewModal(true);

  };

  const closeModal = () => {

    setSelectedComplaint(null);

    setShowCommentsModal(false);

    setShowViewModal(false);

    setCommentText("");

  };

  // ================= LIKE =================

  const handleLike = async (id) => {

    try {

      const res = await api.put(
        `/issue/upvote/${id}`
      );

      const updatedUpvotes =
        res.data.upvotes;

      // UPDATE COMPLAINTS LIST
      setComplaints((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                upvotes: updatedUpvotes,
              }
            : item
        )
      );

      // UPDATE SELECTED MODAL DATA
      if (
        selectedComplaint &&
        selectedComplaint._id === id
      ) {

        setSelectedComplaint((prev) => ({
          ...prev,
          upvotes: updatedUpvotes,
        }));
      }

    } catch (error) {

      console.log(error);

    }
  };

  // ================= ADD COMMENT =================

  const handleAddComment = async () => {

    if (!commentText.trim()) return;

    try {

      const res = await api.post(
        `/issue/comment/${selectedComplaint._id}`,
        {
          text: commentText,
        }
      );

      const updatedComments =
        res.data.comments;

      // UPDATE MAIN LIST
      setComplaints((prev) =>
        prev.map((item) =>
          item._id ===
          selectedComplaint._id
            ? {
                ...item,
                comments:
                  updatedComments,
              }
            : item
        )
      );

      // UPDATE MODAL
      setSelectedComplaint((prev) => ({
        ...prev,
        comments: updatedComments,
      }));

      setCommentText("");

    } catch (error) {

      console.log(error);

    }
  };

  // ================= CHECK USER LIKED =================

  const hasUserLiked = (complaint) => {

    return complaint.upvotes?.includes(
      currentUser?._id
    );
  };

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-gray-700">
          Loading Complaints...
        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >

          <div className="w-16 h-16 bg-gradient-to-r from-[#138808] to-[#0f6b06] rounded-full flex items-center justify-center mx-auto mb-4">

            <TrendingUp className="w-8 h-8 text-white" />

          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Community Feed
          </h1>

          <p className="text-xl text-gray-600">
            See what issues are being reported in your area and support them
          </p>

        </motion.div>

        {/* ================= FILTERS ================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          {/* SEARCH */}

          <div className="mb-6">

            <div className="relative">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search complaints..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
              />

            </div>

          </div>

          {/* CATEGORY */}

          <div className="mb-4">

            <div className="flex items-center gap-2 mb-3">

              <Filter className="w-5 h-5 text-gray-600" />

              <span className="font-semibold text-gray-700">
                Category:
              </span>

            </div>

            <div className="flex flex-wrap gap-2">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(
                      category.toLowerCase()
                    );

                    setVisibleCount(6);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory ===
                    category.toLowerCase()
                      ? "bg-[#138808] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >

                  {category}

                </button>
              ))}

            </div>

          </div>

          {/* STATUS */}

          <div>

            <div className="flex items-center gap-2 mb-3">

              <Filter className="w-5 h-5 text-gray-600" />

              <span className="font-semibold text-gray-700">
                Status:
              </span>

            </div>

            <div className="flex flex-wrap gap-2">

              {statuses.map((status) => (

                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(
                      status.toLowerCase()
                    );

                    setVisibleCount(6);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedStatus ===
                    status.toLowerCase()
                      ? "bg-[#1E88E5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >

                  {status}

                </button>
              ))}

            </div>

          </div>

        </div>

        {/* ================= CARDS ================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {visibleComplaints.length > 0 ? (

            visibleComplaints.map((complaint, index) => (

              <motion.div
                key={complaint._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >

                {/* IMAGE */}

                <div className="relative h-48 overflow-hidden">

                  <img
                    src={
                      complaint.image?.imageURL ||
                      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"
                    }
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

                {/* CONTENT */}

                <div className="p-6">

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {complaint.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {complaint.description}
                  </p>

                  <div className="space-y-2 mb-4">

                    <div className="flex items-center gap-2 text-sm text-gray-600">

                      <MapPin className="w-4 h-4" />

                      <span>
                        {complaint.location}
                      </span>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">

                      <Calendar className="w-4 h-4" />

                      <span>
                        {new Date(
                          complaint.createdAt
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>

                  <div className="border-t pt-4 mb-4">

                    <p className="text-sm text-gray-600">

                      Reported by{" "}

                      <span className="font-semibold">

                        {
                          complaint.createdBy?.name ||
                          "Anonymous"
                        }

                      </span>

                    </p>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center justify-between">

                    {/* LIKE */}

                    <button
                      onClick={() =>
                        handleLike(
                          complaint._id
                        )
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                        hasUserLiked(complaint)
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                    >

                      <ThumbsUp className="w-4 h-4" />

                      <span className="font-semibold">
                        {
                          complaint.upvotes
                            ?.length || 0
                        }
                      </span>

                    </button>

                    {/* COMMENTS */}

                    <button
                      onClick={() =>
                        openCommentsModal(
                          complaint
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                    >

                      <MessageCircle className="w-4 h-4" />

                      <span className="font-semibold">
                        {
                          complaint.comments
                            ?.length || 0
                        }
                      </span>

                    </button>

                    {/* VIEW */}

                    <button
                      onClick={() =>
                        openViewModal(
                          complaint
                        )
                      }
                      className="px-4 py-2 bg-[#FF9933] text-white rounded-lg hover:bg-[#e88a2e] transition-colors font-semibold text-sm cursor-pointer"
                    >

                      View

                    </button>

                  </div>

                </div>

              </motion.div>
            ))

          ) : (

            <div className="col-span-full text-center py-20">

              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                No Complaints Found
              </h2>

              <p className="text-gray-500">
                Try changing filters
              </p>

            </div>
          )}

        </div>

        {/* LOAD MORE */}

        {
          visibleCount <
            filteredComplaints.length && (

            <div className="text-center mt-12">

              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >

                Load More Complaints

              </button>

            </div>
          )
        }

      </div>

      {/* ================= COMMENTS MODAL ================= */}

      {
        showCommentsModal &&
        selectedComplaint && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
            >

              <button
                onClick={closeModal}
                className="absolute top-4 right-4"
              >

                <X />

              </button>

              <h2 className="text-2xl font-bold mb-6">
                Comments
              </h2>

              {/* COMMENT INPUT */}

              <div className="flex gap-3 mb-6">

                <input
                  type="text"
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(
                      e.target.value
                    )
                  }
                  placeholder="Write a comment..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#138808]"
                />

                <button
                  onClick={handleAddComment}
                  className="bg-[#138808] hover:bg-[#0f6b06] text-white px-5 rounded-xl flex items-center justify-center"
                >

                  <Send className="w-5 h-5" />

                </button>

              </div>

              {/* COMMENTS */}

              {
                selectedComplaint.comments
                  ?.length > 0 ? (

                  <div className="space-y-4">

                    {
                      selectedComplaint.comments.map(
                        (
                          comment,
                          index
                        ) => (

                          <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-xl"
                          >

                            <p className="font-semibold text-gray-800">

                              {
                                comment.user
                                  ?.name ||
                                "Anonymous"
                              }

                            </p>

                            <p className="text-gray-700 mt-1">

                              {comment.text}

                            </p>

                          </div>
                        )
                      )
                    }

                  </div>

                ) : (

                  <p className="text-gray-500 text-center py-10">
                    No comments yet
                  </p>

                )
              }

            </motion.div>

          </div>
        )
      }

      {/* ================= VIEW MODAL ================= */}

      {
        showViewModal &&
        selectedComplaint && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
              >

                <X />

              </button>

              <img
                src={
                  selectedComplaint.image
                    ?.imageURL ||
                  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"
                }
                alt={
                  selectedComplaint.title
                }
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <h2 className="text-3xl font-bold mb-4">
                  {
                    selectedComplaint.title
                  }
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {
                    selectedComplaint.description
                  }
                </p>

                <div className="space-y-3 text-gray-600">

                  <p>
                    📍 {
                      selectedComplaint.location
                    }
                  </p>

                  <p>
                    📂 {
                      selectedComplaint.category
                    }
                  </p>

                  <p>
                    📌 {
                      selectedComplaint.status
                    }
                  </p>

                  <p>
                    👤 {
                      selectedComplaint
                        .createdBy?.name
                    }
                  </p>

                  <p>
                    👍 {
                      selectedComplaint
                        .upvotes?.length || 0
                    }{" "}
                    Likes
                  </p>

                  <p>
                    💬 {
                      selectedComplaint
                        .comments?.length || 0
                    }{" "}
                    Comments
                  </p>

                </div>

              </div>

            </motion.div>

          </div>
        )
      }

    </div>
  );
}