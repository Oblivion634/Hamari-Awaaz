import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await api.post(
                "/auth/forgot-password",
                { email }
            );

            setEmailSent(true);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to send reset link"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-br from-[#f19328] to-[#e27a25] text-white text-center py-8">
                    <div className="bg-white w-fit mx-auto p-3 rounded-full mb-3">
                        <Mail className="w-6 h-6 text-[#f19328]" />
                    </div>

                    <h1 className="text-3xl font-bold">
                        Forgot Password
                    </h1>

                    <p className="text-sm opacity-90 mt-2">
                        We'll send you a password reset link
                    </p>
                </div>

                <div className="p-6">

                    {!emailSent ? (
                        <>
                            <p className="text-gray-600 text-sm mb-5">
                                Enter the email associated with your account
                                and we'll send you instructions to reset your
                                password.
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            placeholder="your.email@example.com"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#FF9933] text-white py-3 rounded-xl font-medium hover:bg-[#e6852c] transition disabled:opacity-70"
                                >
                                    {loading
                                        ? "Sending..."
                                        : "Send Reset Link"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                Email Sent!
                            </h2>

                            <p className="text-gray-600 mb-2">
                                A password reset link has been sent to:
                            </p>

                            <p className="font-semibold text-gray-800 mb-5">
                                {email}
                            </p>

                            <p className="text-sm text-gray-500 mb-6">
                                Please check your inbox and spam folder.
                                The link will expire in 15 minutes.
                            </p>


                        </div>
                    )}

                    <div className="text-center mt-6">
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            ← Back to Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}