import {
  Home,
  Wallet,
  Target,
  BarChart3,
  Settings,
  LogOut,
  PiggyBank,
  Sparkles,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Transactions",
      icon: Wallet,
      path: "/transactions",
    },
    {
      name: "Budgets",
      icon: PiggyBank,
      path: "/budgets",
    },
    {
      name: "Goals",
      icon: Target,
      path: "/goals",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      name: "Insights",
      icon: Sparkles,
      path: "/insights",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col sticky top-0">

      {/* Logo */}

      <div className="mb-10">

        <h1 className="text-2xl font-bold text-teal-400">
          PennyPilot
        </h1>

        <p className="text-xs text-slate-500 mt-1">
          Personal Finance Manager
        </p>

      </div>


      {/* Navigation */}

      <nav className="space-y-2 flex-1">

        <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-3 mb-3">
          Menu
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>
          );

        })}

      </nav>


      {/* Bottom Section */}

      <div className="border-t border-slate-800 pt-5">

        <p className="text-xs text-slate-600 px-3 mb-3">
          Account
        </p>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-600 hover:text-white transition"
        >

          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;