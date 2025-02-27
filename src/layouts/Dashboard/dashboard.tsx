import React from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-[9%] md:w-[5%] lg:w-[16%] xl:w-[14%] h-screen flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-[91%] md:w-[95%] lg:w-[84%] xl:w-[86%]">
        {/* Fixed Topbar */}
        <div className="flex-shrink-0 shadow-md mb-2">
          <Topbar />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto  ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;