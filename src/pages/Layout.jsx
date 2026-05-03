import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../services/authService";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Loading from "../components/Loading";

const Layout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check user on load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data.user);
            } catch (error) {
                console.log(error.response?.data || error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            <ScrollToTop />
            <Navbar user={user} setUser={setUser} />

            {/* Page content */}
            <Outlet context={{ user, setUser, loading }} />

            <Footer />
        </>
    );
};

export default Layout;