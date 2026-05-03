import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
} from "react-icons/hi";
import myImage from "../assets/logo.png";

export default function Footer() {
    // Current year for footer
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src={myImage} className="h-10 w-10" />
                            <div>
                                <div className="font-bold text-white">Hamari Awaaz</div>
                                <div className="text-xs">Our Voice, Our Responsibility</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            Empowering citizens to report civic issues and work together for a better India.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() =>
                                        window.scrollTo({ top: 0, behavior: "smooth" })
                                    }
                                    className="text-sm hover:text-[#FF9933] transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm hover:text-[#FF9933] transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/community" className="text-sm hover:text-[#FF9933] transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link to="/track-progress" className="text-sm hover:text-[#FF9933] transition-colors">
                                    Track Complaint
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/contact" className="text-sm hover:text-[#FF9933] transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-[#FF9933] transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-[#FF9933] transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-[#FF9933] transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <HiOutlineMail className="w-4 h-4 mt-1 text-[#FF9933]" />
                                <span className="text-sm">support@hamariawaaz.in</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <HiOutlinePhone className="w-4 h-4 mt-1 text-[#FF9933]" />
                                <span className="text-sm">1800-123-4567 (Toll Free)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <HiOutlineLocationMarker className="w-4 h-4 mt-1 text-[#FF9933]" />
                                <span className="text-sm">New Delhi, India</span>
                            </li>
                        </ul>

                        {/* Social icons */}
                        <div className="mt-4">
                            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
                            <div className="flex gap-3">
                                <a className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9933] hover:scale-110 transition-all duration-300">
                                    <FaFacebookF className="w-4 h-4" />
                                </a>
                                <a className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9933] hover:scale-110 transition-all duration-300">
                                    <FaTwitter className="w-4 h-4" />
                                </a>
                                <a className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9933] hover:scale-110 transition-all duration-300">
                                    <FaInstagram className="w-4 h-4" />
                                </a>
                                <a className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9933] hover:scale-110 transition-all duration-300">
                                    <FaLinkedinIn className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        © {currentYear} Hamari Awaaz. All rights reserved. | Built with ❤️ for India
                    </p>
                </div>
            </div>
        </footer>
    );
}