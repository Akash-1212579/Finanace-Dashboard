import { Wallet,Menu, X,
  LayoutDashboard,
  Receipt,
  BarChart3,
  Upload,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Transactions", icon: Receipt, path: "/transactions" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Import/Export", icon: Upload, path: "/vault" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = ({isOpen}) => {
      console.log("sidebar re-rendered");

  return (
    <>
    <aside className={` ${isOpen?"hidden":"block"} md:block
    w-[75vw] md:w-85 h-screen 
  sticky
  top-0
 

    
bg-gradient-to-b
from-[#0B1220]
via-[#141D33]
via-[#2C3752]
to-[#55637A]
backdrop-blur-xl
bg-white/5
border-r border-white/10
shadow-2xl
flex flex-col
justify-between`}>
      {/* 1️⃣ Brand */}
     

      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 font-bold"><Wallet /></span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white/60 leading-tight">FinTrack</h2>
            <p className="text-xs text-white/60">ProCore</p>
          </div>
        </div>
      </div>

      {/* 2️⃣ Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200
              ${
                isActive
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
              `
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* 3️⃣ Monthly summary */}
      <div className="px-4 pb-4">
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-xs text-white/60">This Month</p>
          <p className="text-lg font-semibold text-emerald-400">
            +₹7,926.05
          </p>

          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-1 w-2/3 bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* 4️⃣ User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center font-semibold">
            JD
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-white/60">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
    
    </>

  );
};

export default Sidebar;
