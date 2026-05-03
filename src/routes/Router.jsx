import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ReportIssue from "../pages/ReportIssue";
import TrackComplaint from "../pages/TrackComplaint";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Community from "../pages/Community";
import PrivateRoute from "./PrivateRoute";
import Layout from "../pages/Layout";
import NotFound from "../pages/NotFound";
import UserProfile from "../pages/UserProfile";
import OAuthSuccess from "../pages/OAuthSuccess";

// ==================== APPLICATION ROUTER ====================
// Defines public pages, protected pages, and role-restricted dashboards.
// ============================================================

// ---------- ROUTE TREE ----------
// Wraps authenticated pages with PrivateRoute while sharing the Layout shell.
export const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            { path: "/oauth-success", element: <OAuthSuccess /> },
            {
                path: "/user-dashboard",
                element: (
                    <PrivateRoute allowedRole="user" >
                        <UserDashboard />
                    </PrivateRoute >
                ),
            },
            {
                path: "/admin-dashboard",
                element: (
                    <PrivateRoute allowedRole="admin">
                        <AdminDashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/report-issue",
                element: (
                    <PrivateRoute>
                        <ReportIssue />
                    </PrivateRoute>
                ),
            },
            {
                path: "/track-progress",
                element: (
                    <PrivateRoute>
                        <TrackComplaint />
                    </PrivateRoute>
                ),
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/user-profile",
                element: <PrivateRoute><UserProfile /></PrivateRoute>
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/community",
                element: (
                    <PrivateRoute>
                        <Community />
                    </PrivateRoute>
                ),
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);
