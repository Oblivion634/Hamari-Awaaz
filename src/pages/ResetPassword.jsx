import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        if (password.length < 6) {
            return toast.error(
                "Password must be at least 6 characters"
            );
        }

        try {
            setLoading(true);

            const res = await api.post(
                `/auth/reset-password/${token}`,
                { password }
            );

            toast.success(res.data.message);

            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center bg-gray-100 px-4 p-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-br from-[#f19328] to-[#e27a25] text-white text-center py-8">
                    <div className="bg-white w-fit mx-auto p-3 rounded-full mb-3">
                        <Lock className="w-6 h-6 text-[#f19328]" />
                    </div>

                    <h1 className="text-3xl font-bold">
                        Reset Password
                    </h1>

                    <p className="text-sm opacity-90 mt-2">
                        Create a new secure password
                    </p>
                </div>

                <div className="p-6">
                    {success ? (
                        <div className="text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                Password Updated!
                            </h2>

                            <p className="text-gray-600">
                                Your password has been reset successfully.
                            </p>

                            <p className="text-sm text-gray-500 mt-2">
                                Redirecting to login...
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    New Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter new password"
                                        required
                                        className="w-full border border-gray-300 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} className="cursor-pointer" />
                                        ) : (
                                            <Eye size={20} className="cursor-pointer" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirm password"
                                        required
                                        className="w-full border border-gray-300 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} className="cursor-pointer" />
                                        ) : (
                                            <Eye size={20} className="cursor-pointer" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#FF9933] text-white py-3 rounded-xl font-medium hover:bg-[#e6852c] transition disabled:opacity-70"
                            >
                                {loading
                                    ? "Updating Password..."
                                    : "Update Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}