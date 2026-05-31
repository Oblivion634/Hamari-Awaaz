import { User, Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import api from "../api/axios.js";
import { ENDPOINTS } from "../utils/constants.js";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const Login = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Logging you in...");

    try {
      // LOGIN REQUEST
      await api.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });

      // FETCH USER
      const res = await api.get(ENDPOINTS.GETUSER);
      const loggedInUser = res.data.user;

      setUser(loggedInUser);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // ROLE CHECK
      if (loggedInUser.role !== role) {
        toast.dismiss(loadingToast);
        toast.error(
          `This account is registered as ${loggedInUser.role}, not ${role}`
        );
        return;
      }

      toast.success("Login successful 🎉");

      // NAVIGATION
      if (loggedInUser.role === "user") {
        navigate("/user-dashboard");
      } else if (loggedInUser.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Login Failed. Try again."
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const baseBtn =
    "py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95";

  const getBtnClass = (type) =>
    `${baseBtn} ${role === type
      ? "bg-blue-500 text-white shadow-md scale-105"
      : "bg-white text-black hover:bg-gray-100"
    }`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full  m-auto max-w-md rounded-2xl shadow-lg bg-white overflow-hidden my-7"
    >

      {/* HEADER */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-[#f19328] to-[#e27a25] text-white flex flex-col items-center justify-center py-8 gap-3"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-white p-3 rounded-full shadow-md"
        >
          <User className="w-6 h-6 text-[#f79b40]" />
        </motion.div>

        <h1 className="font-bold text-3xl">Welcome Back</h1>
        <p className="text-sm opacity-90">Login to your account</p>
      </motion.div>

      {/* ROLE SELECTOR */}
      <motion.div variants={itemVariants} className="flex w-full justify-center items-center pt-5 gap-2.5">
        <button
          onClick={() => setRole("user")}
          className={getBtnClass("user")}
        >
          <User className="w-5 h-5" />
          User
        </button>

        <button
          onClick={() => setRole("admin")}
          className={getBtnClass("admin")}
        >
          <Shield className="w-5 h-5" />
          Admin
        </button>
      </motion.div>

      {/* FORM */}
      <motion.form
        variants={itemVariants}
        className="p-6 space-y-5"
        onSubmit={handleLogin}
      >

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={() => {
            toast("Redirecting to Google login...");
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
          }}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 mb-6 mt-4"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Login with Google
        </button>

        {/* EMAIL */}
        <div>
          <label className="block font-medium text-sm">Email Address</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              placeholder="your.email@example.com"
              required
              className="border rounded-xl pl-10 pr-3 py-3 w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:-translate-y-0.5 transition-all duration-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block font-medium text-sm">Password</label>

          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              required
              className="border rounded-xl pl-10 pr-12 py-3 w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:-translate-y-0.5 transition-all duration-300"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 cursor-pointer" />
              ) : (
                <Eye className="w-5 h-5 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        {/* OPTIONS */}
        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-black"
            />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full text-white bg-[#FF9933] font-medium rounded-xl py-3 hover:bg-[#e6852c] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Login
        </button>

        {/* SIGNUP */}
        {role === "user" && (
          <div className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-medium">
              Sign Up
            </Link>
          </div>
        )}
      </motion.form>

    </motion.div >
  );
};

export default Login;
