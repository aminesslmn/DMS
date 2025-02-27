import React from "react";
import { User, Settings, LogOut, FileText } from "lucide-react";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { title: "Dashboard", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>, path: "/dashboard" },
    { title: "Users", icon: <User className="w-5 h-5" />, path: "/users" },
    { title: "Documents", icon: <FileText className="w-5 h-5" />, path: "/docs" },
    { title: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  const SidebarItem = ({ icon, title, path, onClick }) => {
    const isActive = location.pathname === path;
    return (
      <button
        onClick={onClick}
        className={`
          w-full flex items-center px-3 py-2.5 mb-1 rounded-lg
          transition-all duration-200 ease-in-out
          ${isActive ? "bg-customBlue text-white" : "hover:bg-customFairouzi hover:text-white text-muted-foreground"}
                 
          `}
        title={title}
      >
        {icon}
        <span className="ml-3 text-sm font-medium hidden md:inline">{title}</span>
      </button>
    );
  };

  return (
    <div
      className="
         inset-y-0 left-0 z-50 bg-transparent border-r
        flex flex-col items-center md:items-stretch h-screen
        w-full transition-all duration-300
      "
    >
      <div className="flex items-center justify-center md:justify-between p-4 hidden lg:inline-block ">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <nav className="flex-1 px-3 py-4">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              {...item}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>
        <div className="p-3">
          <SidebarItem
            title="Logout"
            icon={<LogOut className="w-5 h-5" />}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
