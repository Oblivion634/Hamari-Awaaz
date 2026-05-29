import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Smartphone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../api/axios";
import { ENDPOINTS } from "../utils/constants";

export default function VerifySignupOtp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailOtp: "",
        phoneOtp: "",
    });

    const email =
        localStorage.getItem("signupEmail");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post(
                ENDPOINTS.VERIFY_SIGNUP_OTP,
                {
                    email,
                    emailOtp: formData.emailOtp,
                    phoneOtp: formData.phoneOtp,
                }
            );

            toast.success(
                res.data.message || "Account verified"
            );

            // CLEAR STORAGE
            localStorage.removeItem("signupUserId");

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "OTP verification failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-white to-[#E8F5E9] flex items-center justify-center px-4">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >

                {/* HEADER */}

                <div className="bg-gradient-to-r from-[#138808] to-[#0f6b06] p-8 text-center">

                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">

                        <ShieldCheck className="w-8 h-8 text-[#138808]" />

                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Verify OTP
                    </h1>

                    <p className="text-white/90 mt-2">
                        Enter Email & Phone OTP
                    </p>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-5"
                >

                    {/* EMAIL OTP */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email OTP
                        </label>

                        <div className="relative">

                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                            <input
                                type="text"
                                name="emailOtp"
                                value={formData.emailOtp}
                                onChange={handleChange}
                                placeholder="Enter Email OTP"
                                required
                                maxLength={6}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#138808]"
                            />

                        </div>

                    </div>

                    {/* PHONE OTP */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone OTP
                        </label>

                        <div className="relative">

                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                            <input
                                type="text"
                                name="phoneOtp"
                                value={formData.phoneOtp}
                                onChange={handleChange}
                                placeholder="Enter Phone OTP"
                                required
                                maxLength={6}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#138808]"
                            />

                        </div>

                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#138808] hover:bg-[#0f6b06] text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
                    >

                        {
                            loading
                                ? "Verifying..."
                                : "Verify Account"
                        }

                    </button>

                </form>

            </motion.div>

        </div>
    );
}