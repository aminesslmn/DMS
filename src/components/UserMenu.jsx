
// components/layout/UserMenu.jsx
import React from 'react';

const UserMenu = () => {
  return (
    <button className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      <span className="text-sm font-medium text-gray-700">John Doe</span>
    </button>
  );
};

export default UserMenu;