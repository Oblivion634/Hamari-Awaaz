import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getCurrentUser } from "../services/authService.js";

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const { setUser } = useOutletContext();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data.user);

                if (data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/user-dashboard");
                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                alert("Nhi aa rha")
                navigate("/login");
            }
        };

        handleGoogleAuth();
    }, [navigate, setUser]);

    return <div className="min-h-screen flex items-center justify-center">Logging you in...</div>;
};

export default OAuthSuccess;