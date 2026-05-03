import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, User, Menu, X, LogOut } from "lucide-react";
import myImage from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { ENDPOINTS } from "../utils/constants";

// ==================== NAVBAR COMPONENT ====================
// Renders global navigation, auth-aware actions, and responsive menus.
// ===========================================================

const Navbar = ({ user, setUser }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!user;



  // ---------- ACTIVE LINK STATE ----------
  // Resolves visual state for the current route.
  const isActive = (path) => location.pathname === path;

  // ---------- LOGOUT FLOW ----------
  // Clears the backend session and resets frontend auth state.
  const handleLogout = async () => {
    try {
      await api.post(ENDPOINTS.LOGOUT);
      setUser(null);
      setProfile(false);
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  // ---------- NAVIGATION LINKS ----------
  // Shared route configuration for desktop and mobile navigation.
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Report Issue", path: "/report-issue", highlight: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center gap-2">
            <img src={myImage} alt="Logo" className="w-20 h-20" />
            <div className="sm:block">
              <div className="font-extrabold text-3xl text-gray-900">
                Hamari Awaaz
              </div>
              <div className="text-s text-gray-600">
                Our Voice, Our Responsibility
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${link.highlight
                  ? "bg-[#FF9933] text-white px-4 py-2 rounded-lg hover:bg-[#e88a2e] transition-colors"
                  : isActive(link.path)
                    ? "text-[#FF9933] font-semibold"
                    : "text-gray-700 hover:text-[#FF9933] transition-colors"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <button type="button">
              <Bell />
            </button>

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-800 hover:text-[#FF9933] transition-colors"
                >
                  <User />
                  <span className="text-l">Login</span></Link>
                <Link to="/signup" className="flex items-center gap-2 text-gray-800 hover:text-[#FF9933] transition-colors"
                > / <User />SignUp</Link></>
            )}

            {isAuthenticated && (
              <div className="flex gap-2 ml-10">
                <div

                  className="flex items-center gap-1 p-2 text-gray-800 rounded transition-colors"
                >
                  <button onClick={() => setProfile((prev) => !prev)} className="text-l font-bold cursor-pointer rounded-full bg-[#FF9933] h-10 w-10  flex justify-center items-center">{user?.avatar?.imageURL ? (
                    <img
                      src={user.avatar.imageURL}
                      alt={user?.name || "User avatar"}
                      className="h-10 w-10 rounded-full object-cover border"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-[#FF9933] flex items-center justify-center text-white font-bold">
                      {user?.name?.[0] || "U"}
                    </div>
                  )}</button>
                </div>

                {/* ---------- DESKTOP PROFILE MENU ---------- */}
                {profile && (
                  <div className="absolute right-6 mt-15 w-50 bg-white shadow-lg rounded-lg  z-50 px-8 py-8 flex flex-col gap-3">

                    <Link
                      to="/user-profile"
                      className="block px-3 py-2 hover:bg-gray-100 rounded border"
                      onClick={() => setProfile(false)}
                    >
                      <User className="inline-block mr-3" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-800 hover:text-[#e6d9d8] bg-red-400 px-3 py-2 rounded transition-colors"
                    >
                      <LogOut />
                      <span className="text-l cursor-pointer">Logout</span>
                    </button>
                  </div>)}


              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 cursor-pointer text-gray-700"
            type="button"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : isAuthenticated ? (
              user?.avatar?.imageURL ? (
                <img
                  src={user.avatar.imageURL}
                  alt={user?.name || "User avatar"}
                  className="h-10 w-10 rounded-full object-cover border"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-[#FF9933] flex items-center justify-center text-white font-bold">
                  {user?.name?.[0] || "U"}
                </div>
              )) : (<div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#FF9933] font-bold text-white" ><User /></div>)
            }
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {/* ---------- MOBILE NAVIGATION LINKS ---------- */}
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-center ${link.highlight
                      ? "bg-[#FF9933] text-white"
                      : isActive(link.path)
                        ? "bg-gray-100 text-[#FF9933] font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {!isAuthenticated && (
                  <div className="flex gap-2 justify-center">
                    <Link
                      to="/login" onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2  text-gray-800 hover:text-[#FF9933] transition-colors"
                    >
                      <User />
                      <span className="text-l">Login</span></Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-800 hover:text-[#FF9933] transition-colors"
                    > / <User />SignUp</Link></div>
                )}

                {isAuthenticated && (
                  <>
                    <Link
                      to="/user-profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-1 justify-center p-2 text-gray-800  hover:bg-gray-100 rounded transition-colors"
                    >
                      <User className="rounded-xl" />
                      <span className="text-l cursor-pointer">Profile</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        await handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex justify-center items-center gap-2 text-gray-800 hover:text-[#e6d9d8] bg-red-400 px-3 py-2 rounded transition-colors"
                    >
                      <LogOut />
                      <span className="text-l cursor-pointer">Logout</span>
                    </button>

                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div >
    </nav >
  );
};

export default Navbar;
