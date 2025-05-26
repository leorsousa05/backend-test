import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="w-64 h-screen bg-[#16161a] text-[#fffffe] p-4 border-r border-[#24242a] flex flex-col justify-between">
            <ul>
                <li className="mb-2">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-[#24242a] transition"
                    >
                        <Icon
                            icon="mdi:view-dashboard"
                            width="24"
                            height="24"
                        />
                        <span>Dashboard</span>
                    </Link>
                </li>
            </ul>
            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-[#24242a] transition"
            >
                <Icon icon="mdi:logout" width="24" height="24" />
                <span>Logoff</span>
            </button>
        </div>
    );
};
