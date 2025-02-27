

// components/layout/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center flex-1 max-w-xs">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search..."
        />
        <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
      </div>
    </div>
  );
};

export default SearchBar;