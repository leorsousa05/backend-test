import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="w-64 h-screen bg-white text-gray-800 p-4 border-r border-gray-200 flex flex-col justify-between">
      <ul>
        {[
          { to: "/dashboard", icon: "mdi:view-dashboard", label: "Dashboard" },
          { to: "/products", icon: "mdi:package-variant-closed", label: "Produtos" },
          { to: "/products/create", icon: "mdi:plus-box", label: "Novo Produto" },
          { to: "/users", icon: "mdi:account-multiple", label: "Usuários" },
        ].map(({ to, icon, label }) => (
          <li key={to} className="mb-2">
            <Link
              to={to}
              className={`flex items-center gap-3 p-3 rounded-md transition ${
                pathname === to
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-blue-50"
              }`}
            >
              <Icon icon={icon} width="24" height="24" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => { logout(); navigate("/"); }}
        className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-red-50 transition text-red-600"
      >
        <Icon icon="mdi:logout" width="24" height="24" />
        <span>Logoff</span>
      </button>
    </div>
);
};

