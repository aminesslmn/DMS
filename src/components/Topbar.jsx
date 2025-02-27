import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';

const Topbar = () => {
  return (
    <header className=" w-full ">
      <div className="flex items-center justify-between px-4 py-3">
        
         

        <div className="flex items-center flex-1 px-4 space-x-4 justify-between">
          <SearchBar />
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <div className="w-px h-6 bg-gray-200"></div>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;