

// components/layout/NotificationBell.jsx
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  return (
    <button className="relative p-2 text-gray-600 hover:text-gray-900">
      <Bell className="w-6 h-6" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  );
};

export default NotificationBell;
