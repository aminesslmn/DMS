// components/layout/SidebarItem.jsx
import React from "react";

const SidebarItem = ({ title, icon, isActive, onClick, path }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 w-full text-gray-700 rounded-md transition-colors duration-200 ${
        isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-blue-50"
      }`}
    >
      <div className={isActive ? "text-blue-600 mr-3" : "text-gray-700 mr-3"}>{icon}</div>
      <span className={isActive ? "text-blue-600" : "text-gray-700"}>{title}</span>
    </button>
  );
};

export default SidebarItem;